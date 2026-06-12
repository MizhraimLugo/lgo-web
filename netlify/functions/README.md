# Netlify Functions — /contratos

Endpoints serverless del autoservicio de contratos. El sitio sigue **estático
(SSG)**; estas funciones corren aparte y se sirven en `/.netlify/functions/<nombre>`.

## Funciones

| Función | Estado | Qué hace | Variables |
|---|---|---|---|
| `health` | ✅ lista | Health check (valida que las funciones se sirven) | — |
| `registrar-lead` | 🟠 pendiente | Crea el lead en ClickUp (espacio "LGO Abogados") + correo a contacto@lgo.mx | `CLICKUP_API_TOKEN`, `CLICKUP_LIST_ID`, `LEAD_EMAIL_TO`, (Resend/SMTP) |
| `chat` | 🟠 pendiente | Asistente con Claude: recomienda el documento, deriva a WhatsApp, llena el formulario conversando | `ANTHROPIC_API_KEY` |
| `paypal-crear-orden` / `paypal-capturar` | ⬜ Paso 4 | Muro de pago | `PAYPAL_*` |
| `generar` | ⬜ Paso 5 | Genera el .docx con docxtemplater | — |

## Probar en local

1. Copia `.env.example` → `.env` y rellena las claves.
2. `netlify dev` (levanta Astro en :4321 y sirve las funciones).
3. `GET http://localhost:8888/.netlify/functions/health` → `{ ok: true }`.

## Notas
- Sin secretos en el código ni en el frontend: todo vía variables de entorno.
- No se requieren dependencias nuevas: las funciones usan `fetch` nativo (Node 18+).
- En producción, las mismas variables se configuran en el panel de Netlify
  (Site settings → Environment variables).
