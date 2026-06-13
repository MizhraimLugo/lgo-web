# Netlify Functions — /contratos

Endpoints serverless del autoservicio de contratos. El sitio sigue **estático
(SSG)**; estas funciones corren aparte y se sirven en `/.netlify/functions/<nombre>`.

## Funciones

| Función | Estado | Qué hace | Variables |
|---|---|---|---|
| `health` | ✅ | Health check | — |
| `registrar-lead` | ✅ | Lead a ClickUp ("LGO Abogados") + correo a contacto@lgo.mx | `CLICKUP_API_TOKEN`, `CLICKUP_LIST_ID`, `LEAD_EMAIL_TO`, `LEAD_EMAIL_FROM`, `RESEND_API_KEY` |
| `chat` | ✅ | Asistente con Claude: recomienda el documento y lo **llena conversando** (tool use) | `ANTHROPIC_API_KEY` |
| `mp-crear-preferencia` | ✅ | Crea la preferencia de Checkout Pro (precio del catálogo server-side) | `MP_ACCESS_TOKEN`, `MP_ENV` |
| `mp-webhook` | ✅ | Notificación de pago: valida firma, verifica el pago y emite el token | `MP_ACCESS_TOKEN`, `MP_WEBHOOK_SECRET` |
| `mp-estado` | ✅ | El frontend consulta si el pago está aprobado y obtiene el token | `MP_ACCESS_TOKEN` |
| `registrar-documento` | ✅ (interino) | Tras pago verificado, envía el documento al despacho (ClickUp + correo) | ClickUp + Resend |
| `generar` | ⬜ Paso 5 | Genera el .docx con docxtemplater (re-verifica el token) | — |

## Flujo de pago (Checkout Pro)

```
chat llena el documento → "Pagar y generar"
  → mp-crear-preferencia (guarda la orden en Blobs, precio del catálogo)
  → Checkout Pro (init_point) — la pantalla de cobro la hospeda Mercado Pago
  → vuelve por back_url a /contratos/?orden=<id>
  → mp-estado verifica el pago (directo contra MP) y devuelve el token
  → registrar-documento (token válido → entrega; marca la orden consumida)
mp-webhook hace lo mismo de forma asíncrona (respaldo idempotente).
```

El **estado de las órdenes** vive en **Netlify Blobs** (`contratos-ordenes`):
`pending → paid` (con token de un solo uso) `→ consumed`.

## Probar en local

1. Copia `.env.example` → `.env` y rellena las claves (Mercado Pago en **TEST**).
2. `netlify dev` (Astro en :4321 + funciones en :8888 + Blobs local).
3. `GET http://localhost:8888/.netlify/functions/health` → `{ ok: true }`.

> ⚠️ **El webhook no llega a `localhost`.** Mercado Pago no puede alcanzar
> `localhost:8888`, así que en local el desbloqueo lo cubre `mp-estado`
> (verifica el pago directo). Para probar el webhook en sí: usa el **simulador
> de webhooks** de MP o un túnel (ngrok). El webhook es el respaldo asíncrono.

## Pasar a PRODUCCIÓN (Mercado Pago)

- Cambia a credenciales **LIVE**: `MP_ACCESS_TOKEN` y `MP_PUBLIC_KEY` de
  producción, y `MP_ENV=production`.
- Genera un `MP_WEBHOOK_SECRET` para la app de producción (Tus integraciones →
  Webhooks) y configúralo.
- Las variables se ponen en Netlify (Site settings → Environment variables).
  Nunca en el repo ni en el frontend.

## Notas

- Secretos solo en variables de entorno (`MP_ACCESS_TOKEN`, `ANTHROPIC_API_KEY`,
  etc.). El frontend nunca recibe precios ni secretos: solo `contrato_id`.
- El pago se verifica **siempre server-side** antes de entregar el documento.
- Dependencias: `mercadopago` (SDK oficial) y `@netlify/blobs`. Las demás
  funciones usan `fetch` nativo.
