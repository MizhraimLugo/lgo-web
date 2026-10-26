// ════════════════════════════════════════════════════════════════
//  CUÁNTO SALARIO RECORTA EL TOPE — Amparo Modalidad 40
// ════════════════════════════════════════════════════════════════
//
// La página enfrenta los dos topes generales, pero el tope NUEVO no es una
// cifra fija: es el último salario de cada quien más una UMA. Así que las dos
// tarjetas no responden la única pregunta que trae el visitante, que es cuánto
// le quitan a él. Esto lo calcula.
//
// LO QUE ESTO NO HACE, Y NO DEBE HACER NUNCA: estimar una pensión. La pensión
// depende de las semanas cotizadas, del promedio de las últimas 250 semanas,
// de la edad de retiro y del régimen aplicable. Aquí solo se compara el
// SALARIO REGISTRABLE antes y después del acuerdo, que es aritmética cerrada
// sobre dos números que el usuario ya conoce. Cualquier cifra que sugiera un
// monto de pensión sería una cifra no verificada, y la página no las publica.
//
// Todo sale de `M40`: la UMA y el tope en veces UMA. Actualizar la UMA en
// enero recalcula esto y las dos tarjetas de la sección al mismo tiempo.

import { M40, DIAS_MES_COTIZACION } from './amparo-m40.ts';

/** Tope general de cotización, en pesos diarios. */
export function topeGeneralDiario(): number {
  return M40.uma2026 * M40.topeAnteriorVecesUMA;
}

/** El mismo tope, llevado al mes de cotización. */
export function topeGeneralMensual(): number {
  return topeGeneralDiario() * DIAS_MES_COTIZACION;
}

export type ResultadoTope = {
  /** Lo máximo que podías registrar antes del acuerdo, al mes. */
  antes: number;
  /** Lo máximo que puedes registrar ahora, al mes. */
  ahora: number;
  /** Lo que el acuerdo te quita de salario registrable, al mes. Cero si no te toca. */
  recorte: number;
  /** false cuando la meta cabe dentro del tope nuevo. */
  afecta: boolean;
  /** true cuando la meta ya excedía el tope general, que no cambió. */
  metaSobreTopeGeneral: boolean;
};

/** Qué puede estar mal en lo que capturó el visitante. */
export type ErrorTope = 'ultimo-vacio' | 'meta-vacia' | 'meta-menor';

/**
 * Valida el par de salarios mensuales. Devuelve null cuando se puede calcular.
 *
 * No se exige que el último salario quepa en el tope general: si alguien
 * escribe de más, `calcularTope` lo acota. Nadie pudo cotizar por encima del
 * límite del artículo 28, así que acotarlo es más útil que rechazarlo.
 */
export function validarTope(ultimoMensual: number, metaMensual: number): ErrorTope | null {
  if (!Number.isFinite(ultimoMensual) || ultimoMensual <= 0) return 'ultimo-vacio';
  if (!Number.isFinite(metaMensual) || metaMensual <= 0) return 'meta-vacia';
  if (metaMensual < ultimoMensual) return 'meta-menor';
  return null;
}

/**
 * Compara el salario registrable antes y después del acuerdo.
 *
 * @param ultimoMensual Salario base de cotización al momento de la baja, al mes.
 * @param metaMensual   Salario con el que se quiere registrar, al mes.
 */
export function calcularTope(ultimoMensual: number, metaMensual: number): ResultadoTope {
  const topeGeneral = topeGeneralDiario();

  // Nadie pudo cotizar por encima del límite general, así que el último
  // salario se acota ahí aunque se haya escrito de más.
  const ultimoDiario = Math.min(ultimoMensual / DIAS_MES_COTIZACION, topeGeneral);
  const metaDiaria = metaMensual / DIAS_MES_COTIZACION;

  // VERIFICAR: que el límite del artículo 28 LSS siga acotando el tope nuevo,
  // es decir, que "último salario más una UMA" no pueda rebasar las 25 UMA.
  const topeNuevo = Math.min(ultimoDiario + M40.uma2026, topeGeneral);

  const antesDiario = Math.min(metaDiaria, topeGeneral);
  const ahoraDiario = Math.min(metaDiaria, topeNuevo);

  const antes = antesDiario * DIAS_MES_COTIZACION;
  const ahora = ahoraDiario * DIAS_MES_COTIZACION;
  const recorte = Math.max(antes - ahora, 0);

  return {
    antes,
    ahora,
    recorte,
    // Un peso de diferencia es ruido de redondeo, no un recorte.
    afecta: recorte >= 1,
    metaSobreTopeGeneral: metaDiaria > topeGeneral
  };
}
