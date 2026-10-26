// ════════════════════════════════════════════════════════════════
//  PRUEBAS — Amparo Modalidad 40 (config + autoevaluación)
// ════════════════════════════════════════════════════════════════
//
// Corre con Node 24 (TypeScript nativo, sin compilar):
//   node --test src/data/amparo-m40.test.ts
//
// Cubre lo que el encargo exige probar:
//   · las cuatro clasificaciones de la autoevaluación y su precedencia,
//   · los precios con IVA tal como se muestran al público,
//   · la desaparición de la tarjeta de lanzamiento al pasar su fecha,
//   · el contador de plazo y su texto una vez pasado el corte.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  M40,
  conIva,
  fmtMXN,
  precioTexto,
  fechaLarga,
  hoyEnMexico,
  diasHasta,
  lanzamientoVigente,
  cortePasado,
  textoContador,
  TEXTO_CONTADOR_VENCIDO
} from './amparo-m40.ts';
import {
  clasificar,
  completas,
  preguntas,
  textoRespuesta,
  TOTAL_PREGUNTAS,
  type Respuestas
} from './amparo-m40-autoevaluacion.ts';

/** Perfil que coincide en las cinco preguntas; los casos parten de él. */
const APTO: Respuestas = { p1: 'si', p2: 'menos-5', p3: 'si', p4: 'no', p5: 'no' };

/** Construye un perfil variando el apto. */
const perfil = (cambios: Partial<Respuestas>): Respuestas => ({ ...APTO, ...cambios });

// ── Dinero ─────────────────────────────────────────────────────────

test('conIva: 16 % redondeado al peso', () => {
  assert.equal(conIva(500), 580);
  assert.equal(conIva(5500), 6380);
  assert.equal(conIva(4500), 5220);
});

test('fmtMXN: separador de miles', () => {
  assert.equal(fmtMXN(500), '$500');
  assert.equal(fmtMXN(5500), '$5,500');
  assert.equal(fmtMXN(1234567), '$1,234,567');
});

test('precioTexto: los tres precios públicos de la sección', () => {
  assert.equal(precioTexto(M40.precios.diagnostico), '$500 + IVA ($580)');
  assert.equal(precioTexto(M40.precios.amparo), '$5,500 + IVA ($6,380)');
  assert.equal(precioTexto(M40.precios.amparoLanzamiento), '$4,500 + IVA ($5,220)');
});

test('descuento familiar: 10 % por persona sobre el precio máximo', () => {
  const conDescuento = M40.precios.amparo * (1 - M40.precios.descuentoFamiliar);
  assert.equal(conDescuento, 4950);
});

// ── Fechas ─────────────────────────────────────────────────────────

test('fechaLarga: formato largo en español', () => {
  assert.equal(fechaLarga('2026-11-26'), '26 de noviembre de 2026');
  assert.equal(fechaLarga('2026-01-01'), '1 de enero de 2026');
});

test('hoyEnMexico: usa la fecha de America/Mexico_City, no la del host', () => {
  // 2026-11-26T03:00Z son las 21:00 del 25 de noviembre en Ciudad de México
  // (UTC-6): la fecha local es el 25, no el 26.
  const hoy = hoyEnMexico(new Date('2026-11-26T03:00:00Z'));
  assert.equal(hoy.toISOString().slice(0, 10), '2026-11-25');

  // Ya entrado el día en México.
  const despues = hoyEnMexico(new Date('2026-11-26T18:00:00Z'));
  assert.equal(despues.toISOString().slice(0, 10), '2026-11-26');
});

test('diasHasta: positivo antes, 0 el día mismo, negativo después', () => {
  const corte = M40.plazos.corteInterno;
  assert.equal(diasHasta(corte, hoyEnMexico(new Date('2026-11-16T18:00:00Z'))), 10);
  assert.equal(diasHasta(corte, hoyEnMexico(new Date('2026-11-26T18:00:00Z'))), 0);
  assert.equal(diasHasta(corte, hoyEnMexico(new Date('2026-11-27T18:00:00Z'))), -1);
});

test('lanzamientoVigente: el último día cuenta y al siguiente ya no', () => {
  const dia = (iso: string) => hoyEnMexico(new Date(`${iso}T18:00:00Z`));
  assert.equal(lanzamientoVigente(dia('2026-11-14')), true);
  assert.equal(lanzamientoVigente(dia('2026-11-15')), true); // 15 de noviembre: aún vigente
  assert.equal(lanzamientoVigente(dia('2026-11-16')), false); // después: desaparece sola
});

test('cortePasado: cambia al día siguiente del corte', () => {
  const dia = (iso: string) => hoyEnMexico(new Date(`${iso}T18:00:00Z`));
  assert.equal(cortePasado(dia('2026-11-26')), false);
  assert.equal(cortePasado(dia('2026-11-27')), true);
});

test('textoContador: concuerda en singular y plural', () => {
  assert.equal(
    textoContador(31),
    'Faltan 31 días para la fecha límite de recepción de expedientes (26 de noviembre de 2026).'
  );
  assert.match(textoContador(1), /^Falta 1 día /);
});

test('TEXTO_CONTADOR_VENCIDO: deja abierta la vía del acto concreto', () => {
  assert.match(TEXTO_CONTADOR_VENCIDO, /ya pasó/);
  assert.match(TEXTO_CONTADOR_VENCIDO, /aún podemos revisar tu caso/);
});

// ── Autoevaluación: los cuatro casos ───────────────────────────────

test('Caso APTO — el perfil coincide en las cinco preguntas', () => {
  const r = clasificar(APTO);
  assert.equal(r.id, 'apto');
  assert.equal(r.mensaje, 'Tu perfil coincide. El siguiente paso es el diagnóstico.');
  assert.deepEqual(r.motivos, []);
});

test('Caso APTO — también con Modalidad 40 por terminar', () => {
  assert.equal(clasificar(perfil({ p4: 'si-termina-pronto' })).id, 'apto');
});

test('Caso DUDOSO-URGENTE — P5 = Sí gana sobre cualquier otra respuesta', () => {
  const r = clasificar(perfil({ p5: 'si' }));
  assert.equal(r.id, 'dudoso-urgente');
  assert.equal(r.mensaje, 'Tu plazo puede ser más corto. Escríbenos hoy.');
});

test('Caso DUDOSO-URGENTE — la urgencia precede incluso a la no aptitud', () => {
  // Perfil que sería 'no-apto' por P1, P2, P3 y P4, pero con P5 = Sí.
  const r = clasificar({ p1: 'no', p2: 'mas-5', p3: 'no', p4: 'si-falta-mucho', p5: 'si' });
  assert.equal(r.id, 'dudoso-urgente');
});

test('Caso NO APTO — cada condición por separado', () => {
  for (const cambio of [
    { p1: 'no' } as const,
    { p2: 'mas-5' } as const,
    { p3: 'no' } as const,
    { p4: 'si-falta-mucho' } as const
  ]) {
    const r = clasificar(perfil(cambio));
    assert.equal(r.id, 'no-apto', `esperaba no-apto con ${JSON.stringify(cambio)}`);
    assert.equal(r.mensaje, 'Por ahora el amparo no parece ser para ti.');
    assert.equal(r.motivos.length, 1, 'un solo motivo cuando falla una sola condición');
  }
});

test('Caso NO APTO — lista todos los motivos que apliquen', () => {
  const r = clasificar({ p1: 'no', p2: 'mas-5', p3: 'no', p4: 'si-falta-mucho', p5: 'no' });
  assert.equal(r.id, 'no-apto');
  assert.equal(r.motivos.length, 4);
});

test('Caso DUDOSO — "No sé" en P1 o P3', () => {
  assert.equal(clasificar(perfil({ p1: 'no-se' })).id, 'dudoso');
  assert.equal(clasificar(perfil({ p3: 'no-se' })).id, 'dudoso');
  assert.equal(clasificar(perfil({ p3: 'no-se' })).mensaje, 'Necesitamos revisar tus documentos.');
});

test('Caso DUDOSO — "Sigo dado de alta" en P2', () => {
  assert.equal(clasificar(perfil({ p2: 'sigo-alta' })).id, 'dudoso');
});

test('Clasificación — toda combinación cae en una de las cuatro', () => {
  const ids = new Set<string>();
  for (const p1 of ['si', 'no', 'no-se'] as const)
    for (const p2 of ['menos-5', 'mas-5', 'sigo-alta'] as const)
      for (const p3 of ['si', 'no', 'no-se'] as const)
        for (const p4 of ['no', 'si-termina-pronto', 'si-falta-mucho'] as const)
          for (const p5 of ['no', 'si'] as const) {
            const r = clasificar({ p1, p2, p3, p4, p5 });
            assert.ok(
              ['apto', 'dudoso', 'dudoso-urgente', 'no-apto'].includes(r.id),
              `clasificación inesperada: ${r.id}`
            );
            assert.ok(r.etiqueta.length > 0);
            assert.ok(r.mensaje.length > 0);
            ids.add(r.id);
          }
  // Las 162 combinaciones producen las cuatro clasificaciones, ninguna muerta.
  assert.deepEqual([...ids].sort(), ['apto', 'dudoso', 'dudoso-urgente', 'no-apto']);
});

// ── Cuestionario ───────────────────────────────────────────────────

test('preguntas: cinco, con clave única y opciones', () => {
  assert.equal(TOTAL_PREGUNTAS, 5);
  assert.equal(preguntas.length, 5);
  assert.deepEqual(preguntas.map((p) => p.clave), ['p1', 'p2', 'p3', 'p4', 'p5']);
  assert.deepEqual(preguntas.map((p) => p.codigo), ['P1', 'P2', 'P3', 'P4', 'P5']);
  for (const p of preguntas) {
    assert.ok(p.opciones.length >= 2, `${p.codigo} necesita al menos dos opciones`);
    const ids = p.opciones.map((o) => o.id);
    assert.equal(new Set(ids).size, ids.length, `${p.codigo} tiene ids repetidos`);
  }
});

test('completas: exige las cinco respuestas', () => {
  assert.equal(completas({}), false);
  assert.equal(completas({ p1: 'si', p2: 'menos-5', p3: 'si', p4: 'no' }), false);
  assert.equal(completas(APTO), true);
});

test('textoRespuesta: traduce el id al texto que vio el visitante', () => {
  assert.equal(textoRespuesta('p2', 'menos-5'), 'Menos de 5 años');
  assert.equal(textoRespuesta('p4', 'si-termina-pronto'), 'Sí, y mi periodo termina pronto');
  // Un id desconocido se devuelve tal cual, sin lanzar.
  assert.equal(textoRespuesta('p1', 'otro'), 'otro');
});

// ── La función de leads no puede desincronizarse de la configuración ──
//
// netlify/functions/m40-lead.js es un bundle aparte del sitio y declara su
// propio espejo de fechas y clasificaciones. Estas pruebas lo atan a la fuente:
// si alguien cambia `corteInterno` en amparo-m40.ts y olvida la función, falla
// aquí y no en producción.

import { handler, M40_FUNCION, fechaMexicoAMs } from '../../netlify/functions/m40-lead.js';

/** Mapa id -> etiqueta tal como lo produce el motor, recorriendo todo el espacio. */
function etiquetasDelMotor(): Record<string, string> {
  const mapa: Record<string, string> = {};
  for (const p1 of ['si', 'no', 'no-se'] as const)
    for (const p2 of ['menos-5', 'mas-5', 'sigo-alta'] as const)
      for (const p3 of ['si', 'no', 'no-se'] as const)
        for (const p4 of ['no', 'si-termina-pronto', 'si-falta-mucho'] as const)
          for (const p5 of ['no', 'si'] as const) {
            const c = clasificar({ p1, p2, p3, p4, p5 });
            mapa[c.id] = c.etiqueta;
          }
  return mapa;
}

test('m40-lead: la fecha de corte del espejo es la de la configuración', () => {
  assert.equal(M40_FUNCION.corteInterno, M40.plazos.corteInterno);
});

test('m40-lead: las clasificaciones del espejo son las del motor', () => {
  assert.deepEqual(M40_FUNCION.clasificaciones, etiquetasDelMotor());
});

test('m40-lead: los códigos del espejo son los del cuestionario', () => {
  assert.deepEqual(M40_FUNCION.codigos, preguntas.map((p) => p.codigo));
});

test('fechaMexicoAMs: mediodía de Ciudad de México, no del host', () => {
  assert.equal(fechaMexicoAMs('2026-11-26'), Date.parse('2026-11-26T18:00:00Z'));
});

// ── Contrato HTTP de la función ──
//
// Sin CLICKUP_API_TOKEN ni CLICKUP_M40_LIST_ID en el entorno, el alta se omite
// y la respuesta es 200 con `registrado: false`: el visitante nunca ve un error
// porque la lista no esté configurada.

const post = (cuerpo: unknown) =>
  handler({ httpMethod: 'POST', body: typeof cuerpo === 'string' ? cuerpo : JSON.stringify(cuerpo) });

const LEAD_OK = {
  nombre: 'Persona de prueba',
  whatsapp: '3312345678',
  clasificacion: 'apto',
  respuestas: {},
  origen: 'https://lgo.mx/pensiones/amparo-modalidad-40/'
};

test('m40-lead: solo acepta POST', async () => {
  const r = await handler({ httpMethod: 'GET', body: '' });
  assert.equal(r.statusCode, 405);
});

test('m40-lead: rechaza un cuerpo desmedido antes de parsearlo', async () => {
  const r = await post('x'.repeat(9000));
  assert.equal(r.statusCode, 413);
});

test('m40-lead: rechaza JSON inválido', async () => {
  const r = await post('{no-json');
  assert.equal(r.statusCode, 400);
});

test('m40-lead: el honeypot se descarta en silencio con 200', async () => {
  const r = await post({ ...LEAD_OK, empresa: 'bot s.a. de c.v.' });
  assert.equal(r.statusCode, 200);
  assert.deepEqual(JSON.parse(r.body), { ok: true });
});

test('m40-lead: exige nombre y WhatsApp de 10 dígitos', async () => {
  assert.equal((await post({ ...LEAD_OK, nombre: 'A' })).statusCode, 400);
  assert.equal((await post({ ...LEAD_OK, whatsapp: '33123' })).statusCode, 400);
  // El formato humano con espacios y guiones sí pasa: se cuentan los dígitos.
  assert.equal((await post({ ...LEAD_OK, whatsapp: '33 1234-5678' })).statusCode, 200);
});

test('m40-lead: valida el correo solo si viene', async () => {
  assert.equal((await post({ ...LEAD_OK, correo: 'no-es-correo' })).statusCode, 400);
  assert.equal((await post({ ...LEAD_OK, correo: '' })).statusCode, 200);
  assert.equal((await post({ ...LEAD_OK, correo: 'persona@ejemplo.mx' })).statusCode, 200);
});

test('m40-lead: rechaza una clasificación que el motor no produce', async () => {
  assert.equal((await post({ ...LEAD_OK, clasificacion: 'vip' })).statusCode, 400);
  for (const id of Object.keys(M40_FUNCION.clasificaciones)) {
    assert.equal((await post({ ...LEAD_OK, clasificacion: id })).statusCode, 200, id);
  }
});

test('m40-lead: sin ClickUp configurado responde 200 sin registrar', async () => {
  const r = await post(LEAD_OK);
  assert.equal(r.statusCode, 200);
  assert.deepEqual(JSON.parse(r.body), { ok: true, registrado: false });
});
