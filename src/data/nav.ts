// Navegación principal del sitio. Mismo orden en header desktop, mobile y footer.
//
// Un NavItem puede ser:
//  - link directo: tiene `href`
//  - grupo: tiene `childSource` y un dropdown se construye en render
//
// El grupo "Servicios" usa `childSource: 'publishedServiceBrands'` — sus hijas
// se resuelven al renderizar desde brands.ts: las marcas LGO publicadas (incluye
// servicios externos como LGO Facturación; excluye marcas aliadas como Lorenzana).
// Esto significa que cuando se publique LGO Tecnología o LGO Marketing,
// aparecerán automáticamente en el dropdown sin tocar este archivo.

/** Fuente dinámica de items hijos para grupos del nav.
 *  El componente Nav.astro resuelve esto al render. */
export type NavChildSource = 'publishedServiceBrands';

export type NavItem = {
  label: string;
  shortLabel?: string;
  /** URL del link. Ausente si el item es solo agrupador (los grupos puros
   *  abren dropdown pero no navegan al hacer click en el padre). */
  href?: string;
  /** Si presente, este item es un grupo. Sus hijas se resuelven dinámicamente
   *  desde el data layer (ej. publishedSubBrands de brands.ts). */
  childSource?: NavChildSource;
};

export const nav: NavItem[] = [
  // Grupo "Servicios": dropdown con las marcas de servicio LGO publicadas.
  // Hoy son Abogados, Contadores y LGO Facturación (externa); cuando se
  // publiquen Tecnología y Marketing, aparecen aquí automáticamente.
  { label: 'Servicios', childSource: 'publishedServiceBrands' },

  // Nota: /contratos NO va en el nav a propósito. Se accede desde la ficha
  // destacada en Inicio y en LGO Abogados (ContratosFeature.astro).
  { label: 'Cursos', href: '/cursos/' },
  { label: 'Perspectivas', href: '/perspectivas/' },
  { label: 'Contacto', href: '/contacto/' }
];
