// ════════════════════════════════════════════════════════════════
//  HERRAMIENTAS GRATUITAS GRUPO LGO — Capa de herramientas
// ════════════════════════════════════════════════════════════════
//
// Fuente única de verdad de QUÉ herramientas interactivas gratuitas
// ofrece el sitio. Todo lo que las lista —el dropdown "Herramientas" del
// nav, el índice /herramientas y la sección del home— itera esta lista.
// No hay nombres de herramienta hardcodeados en plantillas.
//
// ──────────────────────────────────────────────────────────────────
//  PRINCIPIO DE ARQUITECTURA  (igual que brands.ts)
// ──────────────────────────────────────────────────────────────────
//  "El data layer dicta cuántas herramientas hay, no el código."
//
//  Publicar una herramienta nueva (ej. Probabilidad, Vigilancia) =
//  añadir una entrada aquí con `published: true` y crear su página.
//  Aparece automáticamente en el dropdown, en /herramientas y en el
//  home — sin tocar ninguna plantilla.
//
//  El copy de estas fichas es de PRESENTACIÓN, no legal: describe la
//  herramienta para promocionarla. La lógica y el fundamento legal de
//  cada herramienta viven en su propio módulo (marcas.ts, diagnostico.ts)
//  y no se tocan desde aquí.

export type HerramientaId = 'diagnostico' | 'marcas' | 'contratos';

export type Herramienta = {
  id: HerramientaId;
  /** Nombre completo. Se usa en el dropdown, la tarjeta y el schema. */
  name: string;
  /** Subtítulo corto para el dropdown (análogo a `specialty` de una marca). */
  tagline: string;
  /** Descripción de 1–2 líneas para las tarjetas (home e índice). */
  description: string;
  /** Texto del enlace de la tarjeta. */
  cta: string;
  /** Ruta interna de la herramienta (con slash final). */
  url: string;
  /** Si false, la herramienta existe en el data layer pero NO se lista
   *  en nav, índice ni home. Útil para reservar una herramienta antes de
   *  lanzarla (ej. Probabilidad, Vigilancia). */
  published: boolean;
};

export const herramientas: Herramienta[] = [
  {
    id: 'diagnostico',
    name: 'Diagnóstico de Salud Empresarial',
    tagline: 'Autoevaluación en cinco territorios',
    description:
      '50 preguntas que revelan los puntos ciegos fiscales, financieros y legales de tu negocio, con una ruta de acción personalizada.',    cta: 'Hacer el diagnóstico',
    url: '/diagnostico/',
    published: true
  },
  {
    id: 'marcas',
    name: 'Calculadora de plazos de marca',
    tagline: 'Vencimiento y renovación ante el IMPI',
    description:
      'Calcula el vencimiento, la ventana de renovación y la declaración de uso de tus marcas registradas ante el IMPI, con fundamento en la ley vigente.',    cta: 'Abrir la calculadora',
    url: '/marcas/',
    published: true
  },
  {
    id: 'contratos',
    name: 'Documentos legales',
    tagline: 'Contratos listos para firmar',
    description:
      'Genera contratos listos para firmar en minutos, redactados por Grupo LGO y listos para descargar.',    cta: 'Ir a documentos',
    url: '/contratos/',
    published: true
  }
];

// ──────────────────────────────────────────────────────────────────
//  HELPERS
// ──────────────────────────────────────────────────────────────────
//  Las plantillas iteran estos helpers, no el array `herramientas`
//  directo: garantiza que una herramienta no publicada no se filtre
//  al render.

/** Herramientas visibles al público. Alimenta nav, /herramientas y home. */
export const publishedHerramientas: Herramienta[] = herramientas.filter(
  (h) => h.published
);

export const getHerramienta = (id: HerramientaId): Herramienta | undefined =>
  herramientas.find((h) => h.id === id);
