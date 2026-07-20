// ════════════════════════════════════════════════════════════════
//  PRUEBAS DEL MOTOR — Calculadora de Marca (IMPI / LFPPI)
// ════════════════════════════════════════════════════════════════
//
// Corre con Node 24 (TypeScript nativo, sin compilar):
//   node --test src/data/marcas.test.ts
//
// Cubre los tres casos obligatorios del encargo más los bordes de la
// aritmética de fechas del artículo 21 (ajuste de fin de mes y bisiestos)
// y las transiciones de estado respecto a HOY.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  addMonths,
  addYears,
  parseISO,
  calcularMarca,
  type ResultadoDeclaracionUso
} from './marcas.ts';
import { aproximar, humanizar } from './marcas-format.ts';

/** Formatea un Date UTC como 'YYYY-MM-DD' para comparar legiblemente. */
function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

// ── Aritmética de fechas ───────────────────────────────────────────

test('addMonths: suma simple de fecha a fecha', () => {
  assert.equal(iso(addMonths(parseISO('2022-03-15')!, 3)), '2022-06-15');
});

test('addMonths: ajuste de fin de mes (30 nov + 3 meses -> 28 feb no bisiesto)', () => {
  assert.equal(iso(addMonths(parseISO('2024-11-30')!, 3)), '2025-02-28');
});

test('addMonths: ajuste de fin de mes hacia año bisiesto (30 nov 2023 + 3 -> 29 feb 2024)', () => {
  assert.equal(iso(addMonths(parseISO('2023-11-30')!, 3)), '2024-02-29');
});

test('addMonths: resta cruzando año (mar - 6 meses -> sep del año previo)', () => {
  assert.equal(iso(addMonths(parseISO('2032-03-15')!, -6)), '2031-09-15');
});

test('addYears: 10 años de fecha a fecha', () => {
  assert.equal(iso(addYears(parseISO('2022-03-15')!, 10)), '2032-03-15');
});

test('addYears: 29 feb bisiesto + 1 año -> 28 feb', () => {
  assert.equal(iso(addYears(parseISO('2024-02-29')!, 1)), '2025-02-28');
});

test('parseISO: rechaza fechas inexistentes', () => {
  assert.equal(parseISO('2025-02-30'), null);
  assert.equal(parseISO('2025-13-01'), null);
  assert.equal(parseISO('no-fecha'), null);
});

// ── Caso 1: otorgamiento 2022-03-15, toggle apagado ────────────────

test('Caso 1 — DU aplica y renovación desde otorgamiento', () => {
  const r = calcularMarca({ otorgamiento: '2022-03-15', anteriorLFPPI: false }, parseISO('2024-01-01')!);
  assert.deepEqual(r.errores, []);

  assert.equal(r.declaracionUso.aplica, true);
  const du = r.declaracionUso as Extract<ResultadoDeclaracionUso, { aplica: true }>;
  assert.equal(iso(du.apertura), '2025-03-15');
  assert.equal(iso(du.cierre), '2025-06-15');

  assert.equal(r.renovacion.anclaEtiqueta, 'otorgamiento');
  assert.equal(iso(r.renovacion.vencimiento), '2032-03-15');
  assert.equal(iso(r.renovacion.ventanaAbre), '2031-09-15');
  assert.equal(iso(r.renovacion.graciaFin), '2032-09-15');
});

// ── Caso 2: otorgamiento 2016-05-10, toggle encendido, pres. 2015-11-20 ──

test('Caso 2 — DU no aplica (anterior a 2018-08-10) y renovación desde presentación', () => {
  const r = calcularMarca(
    { otorgamiento: '2016-05-10', anteriorLFPPI: true, presentacion: '2015-11-20' },
    parseISO('2024-01-01')!
  );
  assert.deepEqual(r.errores, []);

  assert.equal(r.declaracionUso.aplica, false);
  const du = r.declaracionUso as Extract<ResultadoDeclaracionUso, { aplica: false }>;
  assert.match(du.mensaje, /No aplica declaración de uso de tercer año/);

  assert.equal(r.renovacion.anclaEtiqueta, 'presentación');
  assert.equal(iso(r.renovacion.vencimiento), '2025-11-20');
  assert.equal(iso(r.renovacion.ventanaAbre), '2025-05-20');
  assert.equal(iso(r.renovacion.graciaFin), '2026-05-20');
});

// ── Caso 3: otorgamiento 2021-11-30, toggle apagado (ajuste fin de mes) ──

test('Caso 3 — DU cierra 2025-02-28 (ajuste fin de mes) y renovación 2031-11-30', () => {
  const r = calcularMarca({ otorgamiento: '2021-11-30', anteriorLFPPI: false }, parseISO('2024-01-01')!);
  assert.deepEqual(r.errores, []);

  assert.equal(r.declaracionUso.aplica, true);
  const du = r.declaracionUso as Extract<ResultadoDeclaracionUso, { aplica: true }>;
  assert.equal(iso(du.apertura), '2024-11-30');
  assert.equal(iso(du.cierre), '2025-02-28');

  assert.equal(iso(r.renovacion.vencimiento), '2031-11-30');
});

// ── Corte exacto de la declaración de uso (art. 233) ───────────────

test('DU: el 10/08/2018 exacto SÍ aplica (igual o posterior)', () => {
  const r = calcularMarca({ otorgamiento: '2018-08-10', anteriorLFPPI: false }, parseISO('2020-01-01')!);
  assert.equal(r.declaracionUso.aplica, true);
});

test('DU: el 09/08/2018 NO aplica', () => {
  const r = calcularMarca({ otorgamiento: '2018-08-09', anteriorLFPPI: false }, parseISO('2020-01-01')!);
  assert.equal(r.declaracionUso.aplica, false);
});

// ── Transiciones de estado vs. HOY ─────────────────────────────────

test('Estado DU — antes de abrir la ventana', () => {
  // Otorgada 2022-03-15; ventana DU abre 2025-03-15. Hoy antes.
  const r = calcularMarca({ otorgamiento: '2022-03-15', anteriorLFPPI: false }, parseISO('2025-03-05')!);
  const du = r.declaracionUso as Extract<ResultadoDeclaracionUso, { aplica: true }>;
  assert.equal(du.estado.tono, 'pendiente');
  assert.match(du.estado.texto, /Faltan 10 días/);
});

test('Estado DU — ventana abierta', () => {
  const r = calcularMarca({ otorgamiento: '2022-03-15', anteriorLFPPI: false }, parseISO('2025-04-15')!);
  const du = r.declaracionUso as Extract<ResultadoDeclaracionUso, { aplica: true }>;
  assert.equal(du.estado.tono, 'abierto');
  assert.match(du.estado.texto, /Ventana abierta/);
});

test('Estado DU — fuera de plazo (posible caducidad)', () => {
  const r = calcularMarca({ otorgamiento: '2022-03-15', anteriorLFPPI: false }, parseISO('2025-07-01')!);
  const du = r.declaracionUso as Extract<ResultadoDeclaracionUso, { aplica: true }>;
  assert.equal(du.estado.tono, 'caducidad');
  assert.match(du.estado.texto, /posible caducidad/);
});

test('Estado renovación — periodo de gracia', () => {
  // Vence 2032-03-15; gracia hasta 2032-09-15. Hoy dentro de la gracia.
  const r = calcularMarca({ otorgamiento: '2022-03-15', anteriorLFPPI: false }, parseISO('2032-06-15')!);
  assert.equal(r.renovacion.estado.tono, 'gracia');
  assert.match(r.renovacion.estado.texto, /Periodo de gracia/);
});

test('Estado renovación — vencido tras la gracia', () => {
  const r = calcularMarca({ otorgamiento: '2022-03-15', anteriorLFPPI: false }, parseISO('2033-01-01')!);
  assert.equal(r.renovacion.estado.tono, 'vencido');
  assert.equal(r.renovacion.estado.texto, 'Vencido.');
});

// ── Validación de entrada ──────────────────────────────────────────

test('Validación — presentación faltante con toggle encendido', () => {
  const r = calcularMarca({ otorgamiento: '2022-03-15', anteriorLFPPI: true }, parseISO('2024-01-01')!);
  assert.ok(r.errores.some((e) => /presentación es obligatoria/.test(e)));
});

test('Validación — otorgamiento inválido', () => {
  const r = calcularMarca({ otorgamiento: '', anteriorLFPPI: false }, parseISO('2024-01-01')!);
  assert.ok(r.errores.some((e) => /otorgamiento es obligatoria/.test(e)));
});

// ── Humanización de plazos: carry defensivo del redondeo de meses ──

test('Humanización — carry: residuo que redondea a 12 meses se vuelve un año más', () => {
  // 1810 días → floor(1810/365)=4 años; residuo 350 días; round(350/30)=12.
  // El carry lo convierte en 5 años y 0 meses: nunca "~4 años 12 meses".
  assert.equal(aproximar(1810), '~5 años');
  assert.equal(
    humanizar('Faltan 1810 días para que abra la ventana.'),
    'Faltan 1810 días (~5 años) para que abra la ventana.'
  );
});
