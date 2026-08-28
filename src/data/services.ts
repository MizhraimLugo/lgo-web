// Catálogo de servicios por sub-marca. Una sola fuente para landings de cada práctica.
//
// El tipo `brand` es LgoPracticeId — acepta las cuatro prácticas (abogados, contadores,
// tecnologia, marketing) aunque tecnologia/marketing estén unpublished todavía. Los
// helpers filtran a publicadas en runtime; añadir servicios de tecnología/marketing
// hoy es válido y los recoge automáticamente cuando se flipee el flag.

import type { LgoPracticeId } from './brands';
import { isPublishedPractice } from './brands';

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  brand: LgoPracticeId;
  blurb: string;
};

export const services: Service[] = [
  // LGO ABOGADOS
  {
    slug: 'derecho-corporativo',
    name: 'Derecho corporativo y contratos',
    shortName: 'Derecho corporativo',
    brand: 'abogados',
    blurb:
      'Constitución de sociedades, gobierno corporativo, contratos comerciales y estructuración de operaciones para empresas en crecimiento.'
  },
  {
    slug: 'defensa-fiscal',
    name: 'Defensa fiscal y litigios ante el SAT',
    shortName: 'Defensa fiscal',
    brand: 'abogados',
    blurb:
      'Representación ante el Servicio de Administración Tributaria en revisiones, requerimientos y procedimientos contenciosos.'
  },
  {
    slug: 'propiedad-intelectual',
    name: 'Propiedad intelectual y marcas',
    shortName: 'Propiedad intelectual',
    brand: 'abogados',
    blurb:
      'Registro y defensa de marcas, derechos de autor, licenciamiento y protección de activos intangibles.'
  },
  {
    slug: 'derecho-inmobiliario',
    name: 'Derecho inmobiliario y transacciones',
    shortName: 'Derecho inmobiliario',
    brand: 'abogados',
    blurb:
      'Compraventas, fideicomisos, contratos de arrendamiento, due diligence y estructuración de operaciones inmobiliarias.'
  },
  {
    slug: 'asesoria-preventiva',
    name: 'Asesoría legal preventiva y gobierno corporativo',
    shortName: 'Asesoría preventiva',
    brand: 'abogados',
    blurb:
      'Diagnóstico legal periódico, protocolos internos, actas y políticas que evitan que el problema exista.'
  },

  // LGO CONTADORES
  {
    slug: 'contabilidad-mensual',
    name: 'Contabilidad mensual y cierre anual',
    shortName: 'Contabilidad mensual',
    brand: 'contadores',
    blurb:
      'Registro contable, conciliaciones, estados financieros mensuales y cierre anual con reportes ejecutivos legibles.'
  },
  {
    slug: 'cumplimiento-fiscal',
    name: 'Cumplimiento fiscal ante el SAT',
    shortName: 'Cumplimiento fiscal',
    brand: 'contadores',
    blurb:
      'Pagos provisionales, declaraciones informativas, DIOT, atención a requerimientos y manejo del buzón tributario.'
  },
  {
    slug: 'declaraciones-anuales',
    name: 'Declaraciones anuales personas físicas y morales',
    shortName: 'Declaraciones anuales',
    brand: 'contadores',
    blurb:
      'Cálculo, planeación y presentación de la declaración anual, identificando deducciones y oportunidades reales de optimización.'
  },
  {
    slug: 'planeacion-fiscal',
    name: 'Asesoría fiscal estratégica y planeación',
    shortName: 'Planeación fiscal',
    brand: 'contadores',
    blurb:
      'Diagnóstico de régimen, estructura óptima del negocio y planeación anticipada de la carga fiscal con criterio documentado.'
  },
  {
    slug: 'reportes-direccion',
    name: 'Reportes financieros para dirección y socios',
    shortName: 'Reportes para dirección',
    brand: 'contadores',
    blurb:
      'Tableros mensuales en lenguaje claro: cuánto vendiste, cuánto cobraste, qué quedó, cuánto debes. Para decidir con visibilidad.'
  },

  // LGO ADMINISTRADORES INMOBILIARIOS
  // Los seis frentes del alcance del servicio. Los nombres son definitivos;
  // los blurb están pendientes de contenido autorizado (regla de no invención).
  {
    slug: 'financiero',
    name: 'Financiero',
    shortName: 'Financiero',
    brand: 'administradores',
    blurb: 'TODO: describir el frente financiero con información autorizada.'
  },
  {
    slug: 'cobranza',
    name: 'Cobranza',
    shortName: 'Cobranza',
    brand: 'administradores',
    blurb: 'TODO: describir el frente de cobranza con información autorizada.'
  },
  {
    slug: 'incidencias-y-mantenimiento',
    name: 'Incidencias y mantenimiento',
    shortName: 'Incidencias y mantenimiento',
    brand: 'administradores',
    blurb: 'TODO: describir el frente de incidencias y mantenimiento con información autorizada.'
  },
  {
    slug: 'comunicacion',
    name: 'Comunicación',
    shortName: 'Comunicación',
    brand: 'administradores',
    blurb: 'TODO: describir el frente de comunicación con información autorizada.'
  },
  {
    slug: 'documental',
    name: 'Documental',
    shortName: 'Documental',
    brand: 'administradores',
    blurb: 'TODO: describir el frente documental con información autorizada.'
  },
  {
    slug: 'gobernanza',
    name: 'Gobernanza',
    shortName: 'Gobernanza',
    brand: 'administradores',
    blurb: 'TODO: describir el frente de gobernanza con información autorizada.'
  }
];

export const servicesByBrand = (brand: LgoPracticeId): Service[] =>
  services.filter((s) => s.brand === brand);

/** Servicios solo de prácticas publicadas. Para uso en agregados (no en sub-página
 *  individual, donde la propia URL ya garantiza que la práctica está publicada). */
export const publishedServices = (): Service[] =>
  services.filter((s) => isPublishedPractice(s.brand));
