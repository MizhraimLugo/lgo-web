// ════════════════════════════════════════════════════════════════
//  FORMATO — Humanización de plazos largos (calculadora de marca)
// ════════════════════════════════════════════════════════════════
//
// Helpers de PRESENTACIÓN, no de cálculo. Se separan del motor `marcas.ts`
// (que se mantiene puro y no cambia) para poder reutilizarse desde el <script>
// cliente del componente Y desde las pruebas en Node sin duplicar código.
//
// Solo transforman el TEXTO del contador de estado; nunca las fechas exactas
// de la tabla ni la lógica del motor.

/**
 * Convierte un número de días en un equivalente aproximado legible.
 *
 * Fórmula (aprobada): años = floor(días/365); meses = round((días%365)/30).
 * Omite la parte de años si es 0 ("~7 meses") y la de meses si es 0 ("~5 años").
 * El "~" siempre está presente para dejar claro que es aproximado.
 *
 * Carry defensivo: cuando el residuo de meses redondea a 12 (residuo ~345-364
 * días), se convierte en un año más y 0 meses — así nunca se renderiza
 * "~4 años 12 meses", sino "~5 años".
 *
 * @returns el texto aproximado, o null si no hay partes que mostrar (0 días).
 */
export function aproximar(dias: number): string | null {
  let anios = Math.floor(dias / 365);
  let meses = Math.round((dias % 365) / 30);
  if (meses === 12) { anios += 1; meses = 0; } // carry defensivo: evita "... 12 meses"
  const partes: string[] = [];
  if (anios > 0) partes.push(`${anios} ${anios === 1 ? 'año' : 'años'}`);
  if (meses > 0) partes.push(`${meses} ${meses === 1 ? 'mes' : 'meses'}`);
  return partes.length ? `~${partes.join(' ')}` : null;
}

/**
 * Inserta "(~X años Y meses)" justo después del "N días" de un texto de estado,
 * solo cuando N > 90 (para 90 días o menos la precisión importa y se deja tal
 * cual). Los textos sin conteo de días ("Vencido.", "Fuera de plazo…") se
 * devuelven sin cambios.
 */
export function humanizar(texto: string): string {
  return texto.replace(/(\d+)\s+días/, (match, n: string) => {
    const dias = parseInt(n, 10);
    if (dias <= 90) return match;
    const aprox = aproximar(dias);
    return aprox ? `${n} días (${aprox})` : match;
  });
}
