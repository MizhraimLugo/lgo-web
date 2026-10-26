// ════════════════════════════════════════════════════════════════
//  PRUEBAS — Aviso de privacidad (textos y separación de anexos)
// ════════════════════════════════════════════════════════════════
//
// Corre con Node 24 (TypeScript nativo, sin compilar):
//   node --test src/data/aviso-privacidad.test.ts
//
// Lo que protege:
//   · que la versión que viaja con cada consentimiento sea la misma que
//     declara el documento publicado,
//   · que los Anexos A y B NO se cuelen en el cuerpo público,
//   · que el aviso simplificado se pueda renderizar con enlaces sin perder
//     ni una palabra del texto aprobado.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  AVISO_PRIVACIDAD_PATH,
  AVISO_PRIVACIDAD_VERSION,
  AVISO_PRIVACIDAD_CORREO,
  AVISO_PRIVACIDAD_ETIQUETA,
  AVISO_SIMPLIFICADO_TEXTO,
  AVISO_CASILLAS,
  WHATSAPP_LEYENDA_PRIVACIDAD,
  avisoSimplificadoTextoPlano,
  tramosAvisoSimplificado
} from './aviso-privacidad.ts';

const MD = readFileSync(new URL('../content/legal/aviso-de-privacidad.md', import.meta.url), 'utf8');

// ── El documento publicado ────────────────────────────────────────

test('la versión del consentimiento es la del documento publicado', () => {
  const m = MD.match(/^privacyVersion:\s*"([^"]+)"/m);
  assert.ok(m, 'el frontmatter debe declarar privacyVersion');
  assert.equal(m[1], AVISO_PRIVACIDAD_VERSION);
});

test('la fecha visible y la versión coinciden', () => {
  const m = MD.match(/^lastUpdated:\s*"([^"]+)"/m);
  assert.ok(m);
  assert.equal(m[1], AVISO_PRIVACIDAD_VERSION);
});

test('el cuerpo público va del apartado I al XII', () => {
  const apartados = MD.match(/^## ([IVX]+)\./gm) ?? [];
  assert.equal(apartados.length, 12);
  assert.match(MD, /^## I\. Identidad y domicilio/m);
  assert.match(MD, /^## XII\. Cambios al aviso de privacidad/m);
});

test('los anexos NO forman parte del cuerpo público', () => {
  assert.doesNotMatch(MD, /Anexo A/);
  assert.doesNotMatch(MD, /Anexo B/);
});

test('el cuerpo no trae su propio H1 ni repite la fecha', () => {
  // El título y la fecha los compone la página desde el frontmatter: así el
  // documento queda con un solo <h1> y la fecha no puede desincronizarse.
  assert.doesNotMatch(MD.split('---\n')[2] ?? MD, /^# /m);
  assert.doesNotMatch(MD.split('---\n')[2] ?? MD, /^\*\*Última actualización/m);
});

test('el documento apunta a su propia ruta canónica', () => {
  assert.match(MD, new RegExp(AVISO_PRIVACIDAD_ETIQUETA.replace(/\./g, '\\.')));
  assert.equal(AVISO_PRIVACIDAD_PATH, '/aviso-de-privacidad/');
});

// ── Anexo A: el aviso simplificado ────────────────────────────────

test('el texto simplificado trae los dos marcadores de enlace, una vez cada uno', () => {
  assert.equal((AVISO_SIMPLIFICADO_TEXTO.match(/\{correo\}/g) ?? []).length, 1);
  assert.equal((AVISO_SIMPLIFICADO_TEXTO.match(/\{aviso\}/g) ?? []).length, 1);
});

test('los tramos reconstruyen el texto completo, sin perder nada', () => {
  const tramos = tramosAvisoSimplificado();
  const reconstruido = tramos
    .map((t) => (t.tipo === 'texto' ? t.valor : t.tipo === 'correo' ? '{correo}' : '{aviso}'))
    .join('');
  assert.equal(reconstruido, AVISO_SIMPLIFICADO_TEXTO);
  assert.equal(tramos.filter((t) => t.tipo === 'correo').length, 1);
  assert.equal(tramos.filter((t) => t.tipo === 'aviso').length, 1);
});

test('la versión en texto plano no deja marcadores sin sustituir', () => {
  const plano = avisoSimplificadoTextoPlano();
  assert.doesNotMatch(plano, /\{correo\}|\{aviso\}/);
  assert.ok(plano.includes(AVISO_PRIVACIDAD_CORREO));
  assert.ok(plano.includes(AVISO_PRIVACIDAD_ETIQUETA));
});

test('el aviso simplificado dice lo que la Ley exige', () => {
  const plano = avisoSimplificadoTextoPlano();
  assert.match(plano, /Grupo LGO/);
  assert.match(plano, /Lorenzana 781/);
  assert.match(plano, /derechos ARCO/);
  assert.match(plano, /No capture datos personales sensibles/);
});

test('las dos casillas son las del anexo y la de mercadotecnia es la opcional', () => {
  assert.equal(AVISO_CASILLAS.obligatoria.name, 'aviso');
  assert.match(AVISO_CASILLAS.obligatoria.texto, /^He leído el aviso de privacidad/);
  assert.equal(AVISO_CASILLAS.mercadotecnia.name, 'mercadotecnia');
  assert.match(AVISO_CASILLAS.mercadotecnia.texto, /^Acepto recibir información comercial/);
});

// ── Anexo B: la leyenda de WhatsApp ───────────────────────────────

test('la leyenda de WhatsApp pide no mandar datos sensibles y enlaza el aviso', () => {
  assert.match(WHATSAPP_LEYENDA_PRIVACIDAD, /no enviar por este medio datos sensibles/);
  assert.ok(WHATSAPP_LEYENDA_PRIVACIDAD.endsWith(AVISO_PRIVACIDAD_ETIQUETA));
});
