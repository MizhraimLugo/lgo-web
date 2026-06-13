// Función de chat del asistente de /contratos.
// Llama a la API de Anthropic (Claude) con el catálogo inyectado para:
//   1) identificar/recomendar el documento correcto,
//   2) LLENAR sus campos conversando (form-filling) vía tool use,
//   3) derivar a WhatsApp si no lo tenemos.
//
// El estado del formulario (documento elegido + valores) NO vive aquí: lo
// manda el frontend en cada request y se reenvía actualizado. La función es
// sin estado (encaja con Netlify Functions). La ANTHROPIC_API_KEY vive SOLO
// en el servidor. Sin dependencias: fetch nativo (Node 18+).
import { contratosCatalogo } from '../../src/data/contratos-catalogo.ts';
import {
  getDocumento, aplicarValores, vistaCampos, faltantesObligatorios, estaCompleto
} from '../lib/contratos-fields.js';

const MODEL = 'claude-sonnet-4-6'; // alterna a 'claude-haiku-4-5-20251001' para bajar costo
const WHATSAPP = 'https://wa.me/523332336337';
const MAX_HISTORIAL = 24;   // mensajes de texto previos máximos
const MAX_TOOL_ITERS = 6;   // iteraciones del loop de tool use por turno

const catalogoTexto = contratosCatalogo
  .map((c) => `- ${c.nombre} [id:${c.id}] (${c.categoria}): ${c.descripcion_corta}`)
  .join('\n');

const SYSTEM_BASE = `Eres el asistente de contratos de Grupo LGO (despacho legal y contable en Guadalajara, México). Ayudas a la persona a (1) identificar qué documento del catálogo necesita y (2) prepararlo, llenando sus datos conversando contigo.

TONO: natural, cálido y profesional. Español de México. Frases claras y breves. Trata de usted de forma cercana, sin rigidez.

FLUJO:
1. La persona ya se registró. Si aún no sabes qué necesita, pregúntale si YA SABE qué documento quiere o prefiere contarte su situación.
2. Cuando tengas claro el documento del catálogo, llama a la herramienta seleccionar_documento con su id EXACTO. Si por el contexto otro documento le conviene más, recomiéndaselo y, si acepta, selecciona ese.
3. Una vez fijado el documento, recolecta sus datos CONVERSANDO: pregunta de forma natural y agrupada (no como interrogatorio), respeta las condiciones (campos que solo aplican según respuestas previas), mapea respuestas libres a las opciones válidas de los selects, y da formato a las fechas. Conforme obtengas datos, llama a guardar_campos con las claves exactas. Puedes llamarla varias veces.
4. NO preguntes por campos que no estén en la lista de "campos que faltan". Nunca pidas "asignar un nombre al documento".
5. Cuando estén TODOS los datos obligatorios, dile a la persona que su documento quedó completo y que puede revisar el resumen y confirmarlo para que un abogado de Grupo LGO lo prepare.
6. Si lo que pide NO está en el catálogo: dilo con honestidad y comparte el WhatsApp ${WHATSAPP} para atención directa.

REGLAS DURAS:
- SOLO documentos del catálogo de abajo. Nunca inventes documentos, campos, cláusulas ni texto legal.
- Las herramientas son internas: la persona solo ve tu texto. SIEMPRE acompaña tus acciones con un mensaje natural para ella.
- No prometas resultados legales ni des asesoría jurídica específica; eres una guía para preparar el documento. No menciones precios.

CATÁLOGO DE DOCUMENTOS DISPONIBLES:
${catalogoTexto}`;

const TOOLS = [
  {
    name: 'seleccionar_documento',
    description: 'Fija el documento del catálogo que la persona va a preparar. Llámala cuando ya tengas claro cuál es. Te devuelve la lista de campos a recolectar.',
    input_schema: {
      type: 'object',
      properties: {
        contrato_id: { type: 'string', description: 'El id EXACTO del catálogo (el valor de [id:...]).' }
      },
      required: ['contrato_id']
    }
  },
  {
    name: 'guardar_campos',
    description: 'Registra uno o más datos del documento que ya obtuviste de la persona. Usa las claves exactas de los campos. Para campos tipo select usa una de sus opciones.',
    input_schema: {
      type: 'object',
      properties: {
        valores: {
          type: 'object',
          description: 'Mapa de clave_de_campo → valor (texto).',
          additionalProperties: { type: 'string' }
        }
      },
      required: ['valores']
    }
  }
];

// Bloque dinámico que se añade al system con el estado actual del llenado.
function bloqueEstado(estado) {
  const doc = getDocumento(estado.documento_id);
  if (!doc) {
    return '\n\nESTADO: aún no hay documento elegido. Cuando identifiques el documento del catálogo, llama a seleccionar_documento con su id.';
  }
  const campos = vistaCampos(estado.documento_id, estado.valores).filter((c) => c.activo);
  const pend = campos.filter((c) => !c.lleno);
  const llenos = campos.filter((c) => c.lleno);
  const fmt = (c) => {
    let s = `  • ${c.clave} — ${c.etiqueta} (${c.tipo}${c.obligatorio ? ', obligatorio' : ', opcional'})`;
    if (c.opciones) s += ` [opciones: ${c.opciones.join(' | ')}]`;
    return s;
  };
  let s = `\n\nDOCUMENTO EN CURSO: ${doc.nombre} [id:${estado.documento_id}]`;
  s += `\n\nCAMPOS QUE FALTAN (pregunta por estos, natural y agrupado):\n${pend.map(fmt).join('\n') || '  (ninguno)'}`;
  if (llenos.length) s += `\n\nYA CAPTURADOS:\n${llenos.map((c) => `  • ${c.clave} = ${c.valor}`).join('\n')}`;
  if (!pend.length) s += `\n\nTODO LISTO: ya tienes todos los datos obligatorios. Avísale a la persona que su documento está completo y que puede revisar el resumen y confirmarlo para enviarlo a un abogado de Grupo LGO.`;
  return s;
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Método no permitido' });
  if (!process.env.ANTHROPIC_API_KEY) return json(500, { error: 'Falta configurar ANTHROPIC_API_KEY en el servidor.' });

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'JSON inválido' }); }

  const mensaje = typeof body.mensaje === 'string' ? body.mensaje.trim() : '';
  if (!mensaje) return json(400, { error: 'Escribe un mensaje.' });
  if (mensaje.length > 2000) return json(400, { error: 'El mensaje es demasiado largo.' });

  const historial = Array.isArray(body.historial)
    ? body.historial
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .slice(-MAX_HISTORIAL)
        .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
    : [];

  // Estado entrante saneado (viene de respuestas previas de esta función).
  const inEstado = body.estado && typeof body.estado === 'object' ? body.estado : {};
  const working = {
    documento_id: getDocumento(inEstado.documento_id) ? inEstado.documento_id : null,
    valores: saneaValores(inEstado.valores)
  };

  const msgs = [...historial, { role: 'user', content: mensaje }];
  let finalText = '';

  try {
    for (let i = 0; i < MAX_TOOL_ITERS; i++) {
      // Última iteración: sin tools, para forzar una respuesta de texto.
      const allowTools = i < MAX_TOOL_ITERS - 1;
      const resp = await llamarClaude(SYSTEM_BASE + bloqueEstado(working), msgs, allowTools);
      if (!resp.ok) {
        console.error('Anthropic error', resp.status, (resp.detalle || '').slice(0, 500));
        return json(502, { error: 'El asistente no está disponible en este momento. Intenta de nuevo o escríbenos por WhatsApp.' });
      }
      const data = resp.data;
      const textOut = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
      const toolUses = (data.content || []).filter((b) => b.type === 'tool_use');

      if (toolUses.length === 0) { finalText = textOut; break; }

      msgs.push({ role: 'assistant', content: data.content });
      const toolResults = toolUses.map((tu) => ({
        type: 'tool_result',
        tool_use_id: tu.id,
        content: ejecutarTool(tu, working)
      }));
      msgs.push({ role: 'user', content: toolResults });
      if (textOut) finalText = textOut; // por si la última iteración ya no produce texto
    }
  } catch (err) {
    console.error('chat function error', err);
    return json(502, { error: 'Hubo un problema de conexión. Intenta de nuevo en un momento.' });
  }

  const doc = getDocumento(working.documento_id);
  return json(200, {
    reply: finalText || 'Disculpe, ¿me lo puede contar de otra forma?',
    estado: {
      documento_id: working.documento_id || null,
      documento_nombre: doc ? doc.nombre : null,
      valores: working.valores,
      campos: working.documento_id ? vistaCampos(working.documento_id, working.valores) : [],
      completo: working.documento_id ? estaCompleto(working.documento_id, working.valores) : false
    }
  });
};

// Ejecuta una tool y devuelve el texto del tool_result; muta `working`.
function ejecutarTool(tu, working) {
  if (tu.name === 'seleccionar_documento') {
    const id = tu.input && tu.input.contrato_id;
    const doc = getDocumento(id);
    if (!doc) return `No existe un documento con id "${id}" en el catálogo. Revisa el id exacto entre corchetes [id:...].`;
    working.documento_id = id;
    const campos = vistaCampos(id, working.valores).filter((c) => c.activo);
    return `Documento fijado: ${doc.nombre}. Campos a recolectar:\n` +
      campos.map((c) => `- ${c.clave} (${c.tipo}${c.opciones ? `; opciones: ${c.opciones.join(' | ')}` : ''})${c.obligatorio ? '' : ' [opcional]'}: ${c.etiqueta}`).join('\n') +
      `\nRecolecta estos datos conversando de forma natural; usa guardar_campos cuando los obtengas.`;
  }
  if (tu.name === 'guardar_campos') {
    if (!working.documento_id) return 'Primero llama a seleccionar_documento.';
    const { valores, aceptados, rechazados } = aplicarValores(working.documento_id, working.valores, (tu.input && tu.input.valores) || {});
    working.valores = valores;
    const falt = faltantesObligatorios(working.documento_id, working.valores);
    const parts = [];
    if (Object.keys(aceptados).length) parts.push(`Guardado: ${Object.keys(aceptados).join(', ')}.`);
    if (Object.keys(rechazados).length) parts.push(`Rechazado: ${Object.entries(rechazados).map(([k, v]) => `${k} (${v})`).join('; ')}.`);
    parts.push(falt.length
      ? `Aún faltan: ${falt.map((c) => `${c.clave} (${c.etiqueta})`).join('; ')}.`
      : 'Ya están TODOS los datos obligatorios. Dile a la persona que puede revisar el resumen y confirmarlo para enviarlo al despacho.');
    return parts.join(' ');
  }
  return 'Herramienta desconocida.';
}

async function llamarClaude(system, messages, allowTools) {
  const payload = { model: MODEL, max_tokens: 1024, system, messages };
  if (allowTools) payload.tools = TOOLS;
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) return { ok: false, status: resp.status, detalle: await resp.text() };
  return { ok: true, data: await resp.json() };
}

// Solo strings, claves y valores acotados; descarta basura del cliente.
function saneaValores(v) {
  const out = {};
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    let n = 0;
    for (const [k, val] of Object.entries(v)) {
      if (n++ >= 200) break;
      if (typeof k === 'string' && k.length <= 80 && typeof val === 'string') {
        out[k] = val.slice(0, 1000);
      }
    }
  }
  return out;
}

function json(statusCode, obj) {
  return { statusCode, headers: { 'content-type': 'application/json' }, body: JSON.stringify(obj) };
}
