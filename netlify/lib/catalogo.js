// Acceso al catálogo server-side: el PRECIO vive SIEMPRE aquí (servidor).
// El frontend nunca envía el precio; solo el contrato_id.
import { contratosCatalogo } from '../../src/data/contratos-catalogo.ts';

const porId = new Map(contratosCatalogo.map((c) => [c.id, c]));

/** Entrada del catálogo { id, nombre, precio, moneda, ... } o null. */
export function getCatalogo(id) {
  return (id && porId.get(id)) || null;
}
