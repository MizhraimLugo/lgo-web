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
  // Los seis frentes del alcance del servicio. Describen qué recibe el
  // condominio en cada frente, sin detallar formatos ni herramientas internas.
  {
    slug: 'financiero',
    name: 'Financiero',
    shortName: 'Financiero',
    brand: 'administradores',
    blurb:
      'Llevamos las cuentas del condominio con soporte documental de cada movimiento: ingresos, egresos, saldos y estado del presupuesto, con información mensual que la asamblea puede revisar y cuestionar. Además, el Consejo de Administración cuenta con un tablero en vivo para consultar la situación financiera en cualquier momento, sin esperar al corte del mes.'
  },
  {
    slug: 'cobranza',
    name: 'Cobranza',
    shortName: 'Cobranza',
    brand: 'administradores',
    blurb:
      'Damos seguimiento individual a las cuotas pendientes, con recordatorios y contacto directo con quien debe. Cuando el atraso rebasa lo que puede resolver la administración, canalizamos el caso a la firma legal del grupo, que lo atiende como un asunto legal aparte de la administración.'
  },
  {
    slug: 'incidencias-y-mantenimiento',
    name: 'Incidencias y mantenimiento',
    shortName: 'Incidencias y mantenimiento',
    brand: 'administradores',
    blurb:
      'Registramos cada reporte y lo seguimos hasta su cierre, con evidencia de lo que se hizo y de quién lo hizo. El mantenimiento de instalaciones y áreas comunes se programa, en lugar de atenderse solo cuando algo se descompone.'
  },
  {
    slug: 'comunicacion',
    name: 'Comunicación',
    shortName: 'Comunicación',
    brand: 'administradores',
    blurb:
      'Un canal definido para que los condóminos reporten, pregunten y reciban respuesta, y avisos oportunos de lo que afecta al inmueble. Nadie tiene que perseguir a la administración para enterarse de lo que pasa en su condominio.'
  },
  {
    slug: 'documental',
    name: 'Documental',
    shortName: 'Documental',
    brand: 'administradores',
    blurb:
      'Mantenemos ordenado el expediente del condominio: actas, contratos, comprobantes y documentación de la operación. Cuando la asamblea lo solicita, o cuando cambia la administración, la información se entrega completa.'
  },
  {
    slug: 'gobernanza',
    name: 'Gobernanza',
    shortName: 'Gobernanza',
    brand: 'administradores',
    blurb:
      'Preparamos las asambleas, las convocamos en forma y levantamos las actas con los acuerdos que efectivamente se tomaron. El proceso lo revisa la firma legal del grupo, para que las decisiones se sostengan si alguien las cuestiona.'
  }
];

export const servicesByBrand = (brand: LgoPracticeId): Service[] =>
  services.filter((s) => s.brand === brand);

/** Servicios solo de prácticas publicadas. Para uso en agregados (no en sub-página
 *  individual, donde la propia URL ya garantiza que la práctica está publicada). */
export const publishedServices = (): Service[] =>
  services.filter((s) => isPublishedPractice(s.brand));
