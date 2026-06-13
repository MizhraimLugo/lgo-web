// Navegación principal del sitio. Mismo orden en header desktop, mobile y footer.
//
// Un NavItem puede ser:
//  - link directo: tiene `href`
//  - grupo: tiene `childSource` y un dropdown se construye en render
//
// El grupo "Servicios" usa `childSource: 'publishedSubBrands'` — sus hijas
// se resuelven al renderizar desde brands.ts filtrando por `published: true`.
// Esto significa que cuando se publique LGO Tecnología o LGO Marketing,
// aparecerán automáticamente en el dropdown sin tocar este archivo.

/** Fuente dinámica de items hijos para grupos del nav.
 *  El componente Nav.astro resuelve esto al render. */
export type NavChildSource = 'publishedSubBrands';

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
  // Grupo "Servicios": dropdown con todas las sub-marcas publicadas.
  // Hoy son Abogados y Contadores; cuando se publiquen Tecnología y Marketing,
  // aparecen aquí automáticamente.
  { label: 'Servicios', childSource: 'publishedSubBrands' },

  // Nota: /contratos NO va en el nav a propósito. Se accede desde la ficha
  // destacada en Inicio y en LGO Abogados (ContratosFeature.astro).
  { label: 'Cursos', href: '/cursos/' },
  { label: 'Perspectivas', href: '/perspectivas/' },
  { label: 'Contacto', href: '/contacto/' }
];
