// Navegación principal del sitio. Mismo orden en header desktop, mobile y footer.
//
// Un NavItem puede ser:
//  - link directo: tiene `href`
//  - grupo: tiene `childSource` y un dropdown se construye en render
//
// El grupo "Servicios" usa `childSource: 'ecosystemBrands'` — sus hijas se
// resuelven al renderizar desde brands.ts: todo el ecosistema visible (sub-marcas
// LGO publicadas + marcas externas como LGO Facturación y Lorenzana, con ↗).
// Esto significa que cuando se publique LGO Tecnología o LGO Marketing,
// aparecerán automáticamente en el dropdown sin tocar este archivo.
//
// El grupo "Herramientas" usa `childSource: 'tools'` y funciona igual: sus hijas
// se resuelven desde herramientas.ts (las herramientas gratuitas publicadas).
// A diferencia de "Servicios", este grupo SÍ tiene `href` propio (/herramientas):
// el label navega al índice y el dropdown lista cada herramienta.

/** Fuente dinámica de items hijos para grupos del nav.
 *  El componente Nav.astro resuelve esto al render. */
export type NavChildSource = 'ecosystemBrands' | 'tools';

export type NavItem = {
  label: string;
  shortLabel?: string;
  /** URL del link. Ausente si el item es solo agrupador (los grupos puros
   *  abren dropdown pero no navegan al hacer click en el padre). Un grupo
   *  PUEDE tener href (ej. Herramientas): el label navega y el dropdown lista. */
  href?: string;
  /** Si presente, este item es un grupo. Sus hijas se resuelven dinámicamente
   *  desde el data layer (ej. publishedSubBrands de brands.ts). */
  childSource?: NavChildSource;
};

export const nav: NavItem[] = [
  // Grupo "Servicios": dropdown con todo el ecosistema visible. Hoy son
  // Abogados, Contadores, LGO Facturación y Lorenzana (las externas con ↗);
  // cuando se publiquen Tecnología y Marketing, aparecen aquí automáticamente.
  { label: 'Servicios', childSource: 'ecosystemBrands' },

  // Grupo "Herramientas": dropdown con las herramientas gratuitas (Diagnóstico,
  // Marcas, Documentos legales). El label lleva al índice /herramientas; las
  // entradas del dropdown salen de herramientas.ts. Nueva herramienta publicada
  // = aparece aquí automáticamente. Nota: /contratos ya NO es solo-descubrible
  // por teaser; vive aquí como "Documentos legales".
  { label: 'Herramientas', href: '/herramientas/', childSource: 'tools' },

  { label: 'Cursos', href: '/cursos/' },
  { label: 'Perspectivas', href: '/perspectivas/' },
  { label: 'Contacto', href: '/contacto/' }
];
