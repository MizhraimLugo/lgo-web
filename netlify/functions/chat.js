// Función de chat del asistente de /contratos.
// Llama a la API de Anthropic (Claude) con el catálogo inyectado en el system
// prompt para recomendar el documento correcto, derivar a WhatsApp si no lo
// tenemos, y conversar de forma natural y profesional.
//
// Seguridad: la ANTHROPIC_API_KEY vive SOLO aquí (variable de entorno del
// servidor), nunca en el frontend. El frontend manda { mensaje, historial }.
//
// No requiere dependencias: usa fetch nativo (Node 18+).
import { contratosCatalogo } from '../../src/data/contratos-catalogo.ts';

const MODEL = 'claude-sonnet-4-6'; // editable; alterna a 'claude-haiku-4-5-20251001' para bajar costo
const WHATSAPP = 'https://wa.me/523332336337';
const MAX_HISTORIAL = 24; // mensajes previos máximos que aceptamos

// Catálogo compacto para el contexto (sin precios — el precio se ve al pagar).
const catalogoTexto = contratosCatalogo
  .map((c) => `- ${c.nombre} [id:${c.id}] (${c.categoria}): ${c.descripcion_corta}`)
  .join('\n');

const SYSTEM = `Eres el asistente de contratos de Grupo LGO (despacho legal y contable en Guadalajara, México). Tu ÚNICA función es ayudar a la persona a identificar qué documento legal del catálogo necesita y, cuando ya lo tenga claro, acompañarla a prepararlo.

TONO: natural, cálido y profesional. Español de México. Frases claras y breves. Trata de usted de forma cercana, sin rigidez.

FLUJO:
1. La persona ya se registró. Si aún no sabes qué necesita, pregúntale si YA SABE qué documento necesita o prefiere contarte su situación.
2. Si SABE cuál quiere y está en el catálogo: confírmalo, pídele un poco de contexto (qué va a hacer con él) y, si por ese contexto otro documento le conviene más, recomiéndaselo explicando por qué.
3. Si NO sabe: pregúntale su situación o qué quiere lograr, y recomiéndale el documento del catálogo que corresponda.
4. Si lo que pide NO está en el catálogo: dile con honestidad que ese documento específico no está en el autoservicio, pero que Grupo LGO puede ayudarle de forma directa, y comparte el WhatsApp: ${WHATSAPP} (pídele que escriba por ahí y que un asesor lo atenderá).

REGLAS DURAS:
- SOLO recomienda documentos que estén en el catálogo de abajo. Nunca inventes documentos, cláusulas, ni texto legal.
- Cuando recomiendes un documento concreto, menciónalo por su nombre exacto del catálogo.
- No prometas resultados legales ni des asesoría jurídica específica; eres una guía para preparar el documento.
- No pidas datos sensibles innecesarios. No menciones precios (eso se ve al momento de generar el documento).
- Si la persona divaga, reencáuzala con amabilidad hacia identificar su documento.

CATÁLOGO DE DOCUMENTOS DISPONIBLES:
${catalogoTexto}`;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Método no permitido' });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return json(500, { error: 'Falta configurar ANTHROPIC_API_KEY en el servidor.' });
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'JSON inválido' }); }

  const mensaje = typeof body.mensaje === 'string' ? body.mensaje.trim() : '';
  if (!mensaje) return json(400, { error: 'Escribe un mensaje.' });
  if (mensaje.length > 2000) return json(400, { error: 'El mensaje es demasiado largo.' });

  // Historial: arreglo de { role: 'user'|'assistant', content: string }
  const historial = Array.isArray(body.historial)
    ? body.historial
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .slice(-MAX_HISTORIAL)
        .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
    : [];

  const messages = [...historial, { role: 'user', content: mensaje }];

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 700, system: SYSTEM, messages })
    });

    if (!resp.ok) {
      const detalle = await resp.text();
      console.error('Anthropic error', resp.status, detalle.slice(0, 500));
      return json(502, { error: 'El asistente no está disponible en este momento. Intenta de nuevo o escríbenos por WhatsApp.' });
    }

    const data = await resp.json();
    // Extrae el texto por TIPO de bloque (no por posición).
    const reply = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    return json(200, { reply: reply || 'Disculpa, no te entendí bien. ¿Me lo cuentas de otra forma?' });
  } catch (err) {
    console.error('chat function error', err);
    return json(502, { error: 'Hubo un problema de conexión. Intenta de nuevo en un momento.' });
  }
};

function json(statusCode, obj) {
  return {
    statusCode,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(obj)
  };
}
