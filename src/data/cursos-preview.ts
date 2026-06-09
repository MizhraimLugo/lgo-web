// Catálogo preview de cursos del ecosistema LGO.
// Tres formatos coexisten: gratuito (lead magnet), online (pagado), presencial (en Lorenzana 781).
//
// PLACEHOLDER de Fase 1 — la página /cursos/ vendrá en Fase 4. Por ahora se usan
// estos datos para el módulo featured de la landing.

export type CourseFormat = 'gratuito' | 'online' | 'presencial';

export type Course = {
  slug: string;
  name: string;
  shortName: string;
  format: CourseFormat;
  formatLabel: string;        // texto humano para badge ("Gratuito", "Online", "Presencial")
  audience: string;           // a quién va dirigido
  blurb: string;              // descripción corta
  url: string;                // ruta a /cursos/[slug]/ (placeholder hasta Fase 4)
  cta: string;                // CTA específico ("Tomar el diagnóstico", "Inscribirme", etc.)
  featured?: boolean;         // se muestra primero, ancho completo en landing
};

export const cursos: Course[] = [
  {
    slug: 'diagnostico-salud-fiscal',
    name: 'Diagnóstico de Salud Fiscal',
    shortName: 'Diagnóstico Fiscal',
    format: 'gratuito',
    formatLabel: 'Diagnóstico interactivo gratuito',
    audience: 'Empresarios y directivos en cualquier régimen fiscal.',
    blurb:
      'Cincuenta preguntas que tu negocio debe poder contestar, organizadas en cinco territorios de salud fiscal. Al final recibes un diagnóstico personalizado y una ruta de acción concreta.',
    url: '/cursos/diagnostico-salud-fiscal/',
    cta: 'Tomar el diagnóstico',
    featured: true
  },
  {
    slug: 'cierre-fiscal-anual',
    name: 'Cierre fiscal anual sin sorpresas',
    shortName: 'Cierre fiscal',
    format: 'online',
    formatLabel: 'Online · próximamente',
    audience: 'Contadores internos, dueños de PyME y socios administradores.',
    blurb:
      'Curso grabado de cuatro módulos. Cómo planear el cierre del ejercicio desde octubre, no desde marzo. Incluye plantillas de planeación y checklist por régimen.',
    url: '/cursos/cierre-fiscal-anual/',
    cta: 'Más información'
  },
  {
    slug: 'gobierno-corporativo-pyme',
    name: 'Gobierno corporativo para PyME',
    shortName: 'Gobierno corporativo',
    format: 'presencial',
    formatLabel: 'Presencial en Lorenzana 781',
    audience: 'Dueños y socios de empresas familiares y PyMEs.',
    blurb:
      'Masterclass de un día en Guadalajara. Cómo estructurar los acuerdos entre socios, las políticas de retiro y la sucesión, antes de que el conflicto exista.',
    url: '/cursos/gobierno-corporativo-pyme/',
    cta: 'Reservar lugar'
  }
];

export const featuredCourse = (): Course | undefined =>
  cursos.find((c) => c.featured);

export const nonFeaturedCourses = (): Course[] =>
  cursos.filter((c) => !c.featured);
