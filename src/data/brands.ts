// ════════════════════════════════════════════════════════════════
//  ECOSISTEMA GRUPO LGO — Capa de marcas
// ════════════════════════════════════════════════════════════════
//
// Esta es la fuente única de verdad de QUÉ marcas componen el ecosistema.
// Cualquier referencia visual en el sitio (nav, footer, landing, JSON-LD,
// sitemap) se construye iterando esta lista — no hay nombres hardcodeados
// en plantillas.
//
// ──────────────────────────────────────────────────────────────────
//  PRINCIPIO DE ARQUITECTURA
// ──────────────────────────────────────────────────────────────────
//  "El data layer dicta cuántas sub-marcas hay, no el código."
//
//  Lanzar una nueva división del ecosistema (ej. LGO Tecnología) =
//  cambiar `published: false` por `published: true` aquí y crear su
//  página. Nada más se toca. La narrativa nunca cuenta — describe.
//
// ──────────────────────────────────────────────────────────────────
//  TAXONOMÍA
// ──────────────────────────────────────────────────────────────────
//  - 'grupo'        — entidad paraguas (Grupo LGO)
//  - LgoPracticeId  — sub-marcas internas de LGO (las cuatro firmas, página propia)
//  - 'facturacion'  — servicio LGO con sitio externo propio (lgo-facturacion.com)
//  - 'lorenzana'    — marca aliada externa (otra paleta, otro sitio)

/** Las cuatro firmas internas de LGO. Tipo cerrado deliberadamente:
 *  añadir una quinta requiere decisión estratégica, no solo data entry. */
export type LgoPracticeId = 'abogados' | 'contadores' | 'tecnologia' | 'marketing';

export type BrandId = 'grupo' | LgoPracticeId | 'facturacion' | 'lorenzana';

export type Brand = {
  id: BrandId;
  name: string;
  shortName: string;
  specialty: string;
  description: string;
  url: string;              // absoluta (lorenzana) o relativa (sub-rutas)
  internal: boolean;        // true = sub-ruta en este sitio
  /** Si false, la marca existe en el data layer pero NO aparece en nav,
   *  footer, ecosistema ni sitemap. Útil para reservar slugs antes de lanzar. */
  published: boolean;
};

export const brands: Brand[] = [
  {
    id: 'grupo',
    name: 'Grupo LGO',
    shortName: 'Grupo LGO',
    specialty: 'Ecosistema empresarial',
    description:
      'La entidad paraguas que integra las firmas del ecosistema bajo un mismo criterio.',
    url: '/',
    internal: true,
    published: true
  },
  {
    id: 'abogados',
    name: 'LGO Abogados & Consultores',
    shortName: 'LGO Abogados',
    specialty: 'Legal y corporativo',
    description:
      'Asesoría jurídica corporativa, contratos, defensa fiscal, propiedad intelectual e inmobiliario para empresas que necesitan estructura sólida.',
    url: '/abogados/',
    internal: true,
    published: true
  },
  {
    id: 'contadores',
    name: 'LGO Contadores & Consultores',
    shortName: 'LGO Contadores',
    specialty: 'Fiscal y contable',
    description:
      'Contabilidad mensual, cumplimiento fiscal, declaraciones anuales y planeación estratégica para empresas que operan bien y quieren proteger lo que han construido.',
    url: '/contadores/',
    internal: true,
    published: true
  },
  {
    // ───── Reservada: lanzamiento futuro ─────
    // Cuando esté lista la división: flip published a true,
    // crear src/pages/tecnologia/index.astro, añadir services y FAQs.
    id: 'tecnologia',
    name: 'LGO Tecnología',
    shortName: 'LGO Tecnología',
    specialty: 'Tecnología empresarial',
    description:
      'Tecnología aplicada a la operación: automatización, sistemas internos y transformación digital para empresas que ya operan.',
    url: '/tecnologia/',
    internal: true,
    published: false
  },
  {
    // ───── Reservada: lanzamiento futuro ─────
    id: 'marketing',
    name: 'LGO Marketing',
    shortName: 'LGO Marketing',
    specialty: 'Marketing y crecimiento',
    description:
      'Estrategia de crecimiento, posicionamiento de marca y marketing digital para empresas que necesitan estar presentes donde sus clientes ya están.',
    url: '/marketing/',
    internal: true,
    published: false
  },
  {
    // Servicio LGO con sitio externo propio (no es una práctica con página
    // interna). Se comporta como enlace externo igual que Lorenzana (↗).
    id: 'facturacion',
    name: 'LGO Facturación',
    shortName: 'LGO Facturación',
    specialty: 'Facturación electrónica',
    description:
      'Plataforma en línea para emitir CFDI 4.0 —facturas, nómina, carta porte y complementos— en minutos, con folios sin vigencia y precios por volumen, para negocios y profesionales que facturan todos los días.',
    url: 'https://lgo-facturacion.com',
    internal: false,
    published: true
  },
  {
    id: 'lorenzana',
    name: 'Lorenzana 781',
    shortName: 'Lorenzana 781',
    specialty: 'Casa empresarial boutique',
    description:
      'Casa empresarial boutique en Guadalajara con domicilio fiscal, oficinas privadas, coworking y salón para eventos. Operada por Grupo LGO y Grupo MUMAR.',
    url: 'https://lorenzana781.com',
    internal: false,
    published: true
  }
];

// ──────────────────────────────────────────────────────────────────
//  HELPERS
// ──────────────────────────────────────────────────────────────────
//  Toda iteración en plantillas debería pasar por uno de estos
//  helpers, no por el array `brands` directamente. Garantiza que
//  marcas no publicadas no se filtren accidentalmente al render.

export const getBrand = (id: BrandId): Brand | undefined =>
  brands.find((b) => b.id === id);

/** IDs de las prácticas LGO (las cuatro firmas internas). */
export const LGO_PRACTICE_IDS: LgoPracticeId[] = [
  'abogados',
  'contadores',
  'tecnologia',
  'marketing'
];

/** Todas las sub-marcas LGO (publicadas y no publicadas). Usar solo
 *  en data layer interno (services, faqs, perspectivas) — nunca en render. */
export const allLgoSubBrands: Brand[] = brands.filter((b): b is Brand =>
  (LGO_PRACTICE_IDS as string[]).includes(b.id)
);

/** Sub-marcas LGO publicadas. Usar en JSON-LD subOrganization,
 *  ecosistema de la landing, nav, footer. */
export const publishedSubBrands: Brand[] = allLgoSubBrands.filter((b) => b.published);

/** Todas las marcas que el visitante debe poder ver en el ecosistema.
 *  Incluye sub-marcas LGO publicadas + marcas externas (Facturación, Lorenzana).
 *  Alimenta el grid del ecosistema en la landing y el menú "Servicios" del nav. */
export const ecosystemBrands: Brand[] = brands.filter(
  (b) => b.id !== 'grupo' && b.published
);

/** Marcas del ecosistema con sitio externo propio, publicadas (Facturación,
 *  Lorenzana). No tienen logo en el sitio: se muestran como texto con ↗.
 *  Usar en el footer "Ecosistema" junto a publishedSubBrands. */
export const publishedExternalBrands: Brand[] = ecosystemBrands.filter(
  (b) => !b.internal
);

/** Solo prácticas LGO publicadas. Para nav, footer, filtros de blog. */
export const isPublishedPractice = (id: string): id is LgoPracticeId =>
  publishedSubBrands.some((b) => b.id === id);
