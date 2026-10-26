// ════════════════════════════════════════════════════════════════
//  PRUEBAS — Cuánto salario recorta el tope
// ════════════════════════════════════════════════════════════════
//
// Corre con Node 24 (TypeScript nativo, sin compilar):
//   node --test src/data/amparo-m40-tope.test.ts
//
// Lo que estas pruebas protegen:
//   · que el tope nuevo sea el último salario más una UMA, no una cifra fija,
//   · que el tope general del artículo 28 siga acotando los dos lados,
//   · que a quien ya cotizaba en el tope no se le anuncie un recorte,
//   · que nada de esto devuelva jamás un monto de pensión.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { M40, DIAS_MES_COTIZACION } from './amparo-m40.ts';
import {
  calcularTope,
  validarTope,
  topeGeneralDiario,
  topeGeneralMensual
} from './amparo-m40-tope.ts';

/** Redondeo al peso, que es como la página muestra las cifras. */
const peso = (n: number) => Math.round(n);

test('El tope general sale de la UMA, no de un número escrito a mano', () => {
  assert.equal(topeGeneralDiario(), M40.uma2026 * M40.topeAnteriorVecesUMA);
  assert.equal(topeGeneralMensual(), topeGeneralDiario() * DIAS_MES_COTIZACION);
});

test('Caso corriente: la meta cabía en el tope general y ahora no', () => {
  const r = calcularTope(20000, 50000);

  // Antes podía registrar su meta completa: 50 000 está por debajo del general.
  assert.equal(peso(r.antes), 50000);

  // Ahora solo su último salario más una UMA.
  const esperado = (20000 / DIAS_MES_COTIZACION + M40.uma2026) * DIAS_MES_COTIZACION;
  assert.equal(peso(r.ahora), peso(esperado));

  assert.equal(peso(r.recorte), peso(50000 - esperado));
  assert.equal(r.afecta, true);
  assert.equal(r.metaSobreTopeGeneral, false);
});

test('Una UMA al mes es exactamente lo que el acuerdo deja subir', () => {
  const r = calcularTope(20000, 50000);
  const unaUmaAlMes = M40.uma2026 * DIAS_MES_COTIZACION;
  assert.equal(peso(r.ahora - 20000), peso(unaUmaAlMes));
});

test('No afecta a quien pedía menos que su último salario más una UMA', () => {
  const r = calcularTope(20000, 22000);
  assert.equal(r.afecta, false);
  assert.equal(peso(r.recorte), 0);
  assert.equal(peso(r.antes), peso(r.ahora));
});

test('La meta que excedía el tope general se acota por los dos lados', () => {
  const r = calcularTope(20000, 120000);
  assert.equal(r.metaSobreTopeGeneral, true);
  // "Antes" nunca puede superar el tope general: ese límite no lo cambió el acuerdo.
  assert.equal(peso(r.antes), peso(topeGeneralMensual()));
  assert.ok(r.recorte > 0);
});

test('A quien ya cotizaba en el tope no se le anuncia un recorte', () => {
  // Su último salario ya estaba en el máximo, así que sumarle una UMA no lo
  // sube: el tope del artículo 28 lo detiene y el acuerdo no le quita nada.
  const r = calcularTope(topeGeneralMensual(), 120000);
  assert.equal(r.afecta, false);
  assert.equal(peso(r.recorte), 0);
});

test('Un último salario imposible se acota en vez de romper el cálculo', () => {
  const absurdo = calcularTope(500000, 600000);
  const enElTope = calcularTope(topeGeneralMensual(), 600000);
  assert.equal(peso(absurdo.ahora), peso(enElTope.ahora));
  assert.equal(peso(absurdo.antes), peso(topeGeneralMensual()));
});

test('El recorte nunca es negativo', () => {
  for (const [ultimo, meta] of [[20000, 20000], [80000, 90000], [1000, 1001]]) {
    assert.ok(calcularTope(ultimo, meta).recorte >= 0, `${ultimo} → ${meta}`);
  }
});

test('Validación: lo que falta o no tiene sentido se nombra', () => {
  assert.equal(validarTope(0, 50000), 'ultimo-vacio');
  assert.equal(validarTope(-5, 50000), 'ultimo-vacio');
  assert.equal(validarTope(Number.NaN, 50000), 'ultimo-vacio');
  assert.equal(validarTope(20000, 0), 'meta-vacia');
  assert.equal(validarTope(20000, Number.NaN), 'meta-vacia');
  assert.equal(validarTope(50000, 20000), 'meta-menor');
  assert.equal(validarTope(20000, 50000), null);
  // Pedir exactamente lo mismo es válido: el resultado dirá que no le afecta.
  assert.equal(validarTope(20000, 20000), null);
});

test('El resultado no expone ningún campo que parezca una pensión', () => {
  const campos = Object.keys(calcularTope(20000, 50000)).join(' ').toLowerCase();
  for (const prohibido of ['pension', 'pensión', 'cuantia', 'cuantía', 'mensualidad']) {
    assert.ok(!campos.includes(prohibido), `no debe haber campo "${prohibido}"`);
  }
});
