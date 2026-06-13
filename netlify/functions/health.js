// Health check de las funciones de /contratos. Sirve para validar que
// `netlify dev` (o el deploy) está sirviendo funciones antes de cablear las reales.
// GET /.netlify/functions/health
export const handler = async () => ({
  statusCode: 200,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    ok: true,
    service: 'contratos',
    funciones: ['health', 'chat (pendiente)', 'registrar-lead (pendiente)'],
    ts: new Date().toISOString()
  })
});
