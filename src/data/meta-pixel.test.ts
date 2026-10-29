// ════════════════════════════════════════════════════════════════
//  PRUEBAS — Pixel de Meta (configuración)
// ════════════════════════════════════════════════════════════════
//
// Corre con Node 24 (TypeScript nativo, sin compilar):
//   node --test src/data/meta-pixel.test.ts
//
// Cubre lo que no debe poder romperse sin que una prueba se queje:
//   · sin variable de entorno, el pixel queda apagado,
//   · los dos `content_name` de la sección de Modalidad 40 son exactamente los
//     acordados y se distinguen entre sí,
//   · la ventana contra repetición vale lo que dice el plan de pruebas.
//
// En Node `import.meta.env` no existe, así que `META_PIXEL_ID` es la cadena
// vacía: eso es justo el caso que más importa probar, el del sitio sin pixel.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  META_PIXEL_ID,
  pixelActivo,
  CONTENT_NAME_M40,
  CONTENT_NAME_M40_AUTOEVALUACION,
  EVENTO_WHATSAPP,
  VENTANA_ANTIRREPETICION_MS
} from './meta-pixel.ts';

// ── El interruptor ─────────────────────────────────────────────────

test('sin PUBLIC_META_PIXEL_ID el pixel queda apagado', () => {
  assert.equal(META_PIXEL_ID, '');
  assert.equal(pixelActivo(), false);
});

test('pixelActivo solo acepta un identificador con contenido', () => {
  assert.equal(pixelActivo(''), false);
  assert.equal(pixelActivo('1737420751722392'), true);
});

// ── Nombres de contenido ───────────────────────────────────────────

test('el content_name de la landing es el acordado', () => {
  assert.equal(CONTENT_NAME_M40, 'Amparo Modalidad 40');
});

test('el envío de la autoevaluación se distingue de los botones de la landing', () => {
  assert.equal(CONTENT_NAME_M40_AUTOEVALUACION, 'Amparo Modalidad 40 - Autoevaluación');
  assert.notEqual(CONTENT_NAME_M40_AUTOEVALUACION, CONTENT_NAME_M40);
});

test('ningún content_name lleva datos de la persona ni parámetros de URL', () => {
  for (const nombre of [CONTENT_NAME_M40, CONTENT_NAME_M40_AUTOEVALUACION]) {
    assert.doesNotMatch(nombre, /[?&=]|https?:|wa\.me/);
  }
});

// ── Contrato con las islas ─────────────────────────────────────────

test('el evento de salida a WhatsApp lleva el prefijo del sitio', () => {
  assert.equal(EVENTO_WHATSAPP, 'lgo:whatsapp');
});

test('la ventana contra repetición es de dos segundos', () => {
  assert.equal(VENTANA_ANTIRREPETICION_MS, 2000);
});
