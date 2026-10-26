// Función m40-lead: da de alta en ClickUp el lead de la autoevaluación de
// /pensiones/amparo-modalidad-40 (lista "Amparo M40").
//
// Mismo criterio que registrar-lead.js: sin dependencias (fetch nativo), los
// secretos solo en variables de entorno del servidor y la respuesta nunca
// bloquea al visitante — la isla ya lo mandó a WhatsApp antes de llamar aquí.
//
// Variables de entorno (Netlify, nunca en el repositorio):
//   CLICKUP_API_TOKEN     token de la integración (el mismo de registrar-lead).
//                         Se acepta CLICKUP_TOKEN como alias.
//   CLICKUP_M40_LIST_ID   id de la lista "Amparo M40". Es una variable PROPIA:
//                         CLICKUP_LIST_ID ya apunta a la lista de /contratos y
//                         los leads de M40 no deben caer ahí.
//
// Datos personales: se envían a ClickUp (destinatario previsto) y NO se
// escriben en los logs. A los logs solo van el resultado de la operación y la
// clasificación, que no identifica a nadie.

const CLICKUP_TOKEN = process.env.CLICKUP_API_TOKEN || process.env.CLICKUP_TOKEN;
const CLICKUP_LIST = process.env.CLICKUP_M40_LIST_ID;

/** Tope del cuerpo de la petición. Un lead legítimo ronda 1 KB. */
const MAX_BODY = 8_000;

/** Estatus inicial de la tarjeta en la lista. Lo configura Edgar en ClickUp. */
const ESTATUS_INICIAL = 'Lead';

/**
 * Espejo mínimo de src/data/amparo-m40.ts y de las clasificaciones de
 * src/data/amparo-m40-autoevaluacion.ts. La función es un bundle aparte del
 * sitio y no comparte su resolución de módulos, así que estos valores se
 * declaran aquí.
 *
 * NO pueden desincronizarse en silencio: src/data/amparo-m40.test.ts importa
 * este archivo y falla si alguno deja de coincidir con la fuente.
 */
export const M40_FUNCION = {
  /** `M40.plazos.corteInterno` — fecha de vencimiento de la tarea. */
  corteInterno: '2026-11-26',
  /** Clasificaciones válidas = etiquetas de ClickUp. */
  clasificaciones: {
    apto: 'Apto',
    dudoso: 'Dudoso',
    'dudoso-urgente': 'Dudoso urgente',
    'no-apto': 'No apto'
  },
  /** Códigos de las preguntas, en el orden en que se muestran. */
  codigos: ['P1', 'P2', 'P3', 'P4', 'P5']
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Método no permitido' });

  const crudo = event.body || '';
  if (crudo.length > MAX_BODY) return json(413, { error: 'Cuerpo demasiado grande' });

  let body;
  try { body = JSON.parse(crudo || '{}'); } catch { return json(400, { error: 'JSON inválido' }); }

  // Honeypot: el campo "empresa" está fuera de la vista y del foco, así que
  // solo un bot lo llena. Se responde 200 para no darle señal de detección.
  if (limpia(body.empresa, 200)) return json(200, { ok: true });

  // ── Validación del lado del servidor ──
  const nombre = limpia(body.nombre, 120);
  const whatsapp = limpia(body.whatsapp, 40);
  const correo = limpia(body.correo, 160);
  const clasificacion = limpia(body.clasificacion, 40);
  const origen = limpia(body.origen, 500);

  const digitos = whatsapp.replace(/\D/g, '');
  if (nombre.length < 2 || digitos.length < 10) {
    return json(400, { error: 'Datos incompletos: nombre y WhatsApp de 10 dígitos.' });
  }
  if (correo && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) {
    return json(400, { error: 'Correo inválido.' });
  }
  const etiquetaClasificacion = M40_FUNCION.clasificaciones[clasificacion];
  if (!etiquetaClasificacion) {
    return json(400, { error: 'Clasificación desconocida.' });
  }

  if (!CLICKUP_TOKEN || !CLICKUP_LIST) {
    console.warn('m40-lead: ClickUp no configurado (CLICKUP_API_TOKEN / CLICKUP_M40_LIST_ID).');
    return json(200, { ok: true, registrado: false });
  }

  // ── Expediente de la tarea ──
  const cuando = new Date().toISOString();
  const respuestas = body.respuestas && typeof body.respuestas === 'object' ? body.respuestas : {};

  const lineasRespuestas = M40_FUNCION.codigos.map((codigo) => {
    const r = respuestas[codigo];
    const pregunta = limpia(r && r.pregunta, 200) || '(sin registrar)';
    const respuesta = limpia(r && r.respuesta, 200) || '(sin respuesta)';
    return `- **${codigo}.** ${pregunta}\n  - ${respuesta}`;
  });

  const descripcion = [
    `**Lead de la autoevaluación de Modalidad 40**`,
    ``,
    `- **Nombre:** ${nombre}`,
    `- **WhatsApp:** ${whatsapp}`,
    `- **Correo:** ${correo || '(no proporcionado)'}`,
    `- **Clasificación:** ${etiquetaClasificacion}`,
    `- **Fecha y hora:** ${cuando}`,
    `- **Página de origen:** ${origen || '(no registrada)'}`,
    ``,
    `**Respuestas**`,
    ...lineasRespuestas
  ].join('\n');

  // Vencimiento: la fecha de corte interno; para los urgentes, el día siguiente
  // al alta, porque su plazo corre aparte y es más corto.
  const vencimiento =
    clasificacion === 'dudoso-urgente'
      ? manana()
      : fechaMexicoAMs(M40_FUNCION.corteInterno);

  const tarea = {
    name: `M40 · ${nombre} · ${etiquetaClasificacion}`,
    markdown_description: descripcion,
    tags: [clasificacion],
    status: ESTATUS_INICIAL,
    due_date: vencimiento,
    due_date_time: false
  };

  const alta = await crearTarea(tarea);
  if (!alta.ok) return json(502, { ok: false, error: 'No se pudo registrar el lead.' });
  return json(200, { ok: true, registrado: true, degradado: alta.degradado });
};

/**
 * Crea la tarea en ClickUp. Si la lista todavía no tiene la etiqueta o el
 * estatus configurados, ClickUp rechaza el alta: en ese caso se reintenta una
 * vez con el cuerpo mínimo y la clasificación dentro de la descripción, para
 * que el lead no se pierda por una lista a medio configurar.
 */
async function crearTarea(tarea) {
  const url = `https://api.clickup.com/api/v2/list/${CLICKUP_LIST}/task`;
  const headers = { 'content-type': 'application/json', Authorization: CLICKUP_TOKEN };

  try {
    const r = await fetch(url, { method: 'POST', headers, body: JSON.stringify(tarea) });
    if (r.ok) return { ok: true, degradado: false };

    const detalle = (await r.text()).slice(0, 300);
    console.error('m40-lead: ClickUp rechazó el alta', r.status, detalle);

    const minima = {
      name: tarea.name,
      markdown_description:
        `${tarea.markdown_description}\n\n> Alta sin etiqueta ni estatus: la lista de ClickUp` +
        ` aún no tiene configurada la etiqueta "${tarea.tags[0]}" o el estatus "${ESTATUS_INICIAL}".`,
      due_date: tarea.due_date,
      due_date_time: false
    };
    const r2 = await fetch(url, { method: 'POST', headers, body: JSON.stringify(minima) });
    if (r2.ok) {
      console.warn('m40-lead: lead registrado en modo degradado (sin etiqueta ni estatus).');
      return { ok: true, degradado: true };
    }
    console.error('m40-lead: reintento fallido', r2.status, (await r2.text()).slice(0, 300));
    return { ok: false };
  } catch (err) {
    console.error('m40-lead: error de red con ClickUp', err && err.message);
    return { ok: false };
  }
}

/** 'YYYY-MM-DD' a milisegundos del mediodía en Ciudad de México (UTC-6). */
export function fechaMexicoAMs(iso) {
  return Date.parse(`${iso}T12:00:00-06:00`);
}

/** Mediodía de mañana en Ciudad de México, en milisegundos. */
function manana() {
  const ahora = new Date();
  const hoyMx = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(ahora);
  return fechaMexicoAMs(hoyMx) + 86_400_000;
}

function limpia(v, max) { return (typeof v === 'string' ? v : '').trim().slice(0, max); }

function json(statusCode, obj) {
  return { statusCode, headers: { 'content-type': 'application/json' }, body: JSON.stringify(obj) };
}
