// FAQs por sub-marca. Cada sub-página de práctica (/abogados/, /contadores/, etc.)
// muestra el bloque correspondiente y lo expone como FAQPage en JSON-LD.
//
// Cuando una nueva práctica se publique (ej. tecnología), basta con añadir su
// `faqsTecnologia` aquí y mapearlo en `faqsByBrand`. El sitio lo recoge sin
// más cambios.

import type { LgoPracticeId } from './brands';

export type FaqItem = { q: string; a: string };

export const faqsAbogados: FaqItem[] = [
  {
    q: '¿Atienden empresas que apenas se constituyen, o solo a empresas establecidas?',
    a: 'Atendemos a ambas. Una parte importante de nuestro trabajo es estructurar correctamente desde el inicio: tipo de sociedad, acuerdos entre socios, contratos base. Lo que se hace bien al principio evita conflictos legales y costos años después.'
  },
  {
    q: '¿Tienen experiencia con autoridades fiscales en defensa, o solo en cumplimiento?',
    a: 'Sí. Representamos a clientes en revisiones del SAT, recursos de revocación, juicios contencioso-administrativos y procedimientos contenidos. La defensa fiscal es una práctica activa del despacho, no un servicio anunciado solamente.'
  },
  {
    q: '¿Cómo trabajan con empresas que ya tienen abogado interno?',
    a: 'Frecuentemente. Funcionamos como contraparte experta o como apoyo externo en áreas específicas (corporativo, fiscal, propiedad intelectual, inmobiliario) donde el equipo interno necesita profundidad o un segundo criterio. Nuestra preferencia siempre es complementar, no competir.'
  },
  {
    q: '¿En qué se diferencian de un despacho legal grande?',
    a: 'En la integración con la práctica contable de LGO Contadores y en el criterio operativo. Las decisiones legales no se toman en aislamiento del impacto fiscal. Y por escala: cada caso recibe atención directa de un socio, no se delega al associate más junior disponible.'
  },
  {
    q: '¿Cómo se cobran los honorarios?',
    a: 'Depende del tipo de asunto. Para asesoría preventiva continua, iguala mensual; para casos específicos (constitución, contratos, litigio), por proyecto con honorario fijo presupuestado. En ninguna modalidad cobramos por hora sin techo. La propuesta se entrega por escrito antes de iniciar trabajo.'
  },
  {
    q: '¿Atienden temas fuera de Jalisco?',
    a: 'Sí. Operamos desde Guadalajara con capacidad de atender ante autoridades federales, registros nacionales y operaciones en cualquier estado. Cuando el asunto requiere presencia física fuera de Jalisco, lo coordinamos con corresponsales de confianza.'
  }
];

export const faqsContadores: FaqItem[] = [
  {
    q: '¿Atienden personas físicas o solo personas morales?',
    a: 'Ambas. La diferencia técnica entre persona física y persona moral exige tratamientos distintos, y la práctica del despacho contempla los principales regímenes de ambas: actividad empresarial, servicios profesionales, RESICO, arrendamiento, régimen general de personas morales.'
  },
  {
    q: '¿Mi contador actual puede seguir, o reemplazarían toda la función contable?',
    a: 'Depende del cliente. Algunos eligen migrar la función completa; otros nos contratan como segunda opinión, planeación estratégica o atención de temas específicos (defensa, declaración anual, planeación fiscal). El acuerdo se define en la primera conversación.'
  },
  {
    q: '¿Reciben empresas con declaraciones atrasadas o problemas con el SAT?',
    a: 'Sí. Regularización de declaraciones omitidas, atención de requerimientos, manejo de buzón tributario y solución de adeudos son parte de la práctica habitual. La primera fase siempre es diagnóstico: entender qué hay, qué falta y qué se puede hacer en qué orden.'
  },
  {
    q: '¿Cómo entregan los reportes? ¿Solo balance y estado de resultados?',
    a: 'No. Entregamos un tablero mensual ejecutivo en lenguaje claro: cuánto vendió, cuánto cobró, qué quedó, cuánto debe, cuánto debe pagar de impuestos. El balance y el estado de resultados están disponibles para quien quiera el detalle técnico, pero la conversación principal es de decisión, no de contabilidad.'
  },
  {
    q: '¿Hacen planeación fiscal o solo cumplimiento?',
    a: 'Ambos, en ese orden. El cumplimiento es la base no negociable; la planeación viene después. La planeación que ofrecemos se documenta, se sostiene en ley vigente y resiste revisión. No vendemos esquemas que dependan de huecos temporales o de que nadie pregunte.'
  },
  {
    q: '¿Cómo se cobran los honorarios?',
    a: 'Para contabilidad mensual, iguala mensual escalonada según volumen de operaciones y régimen. Para servicios puntuales (declaración anual, planeación, defensa), honorario por proyecto. La propuesta es por escrito antes de iniciar.'
  }
];

// Mapa de FAQs por práctica. Cuando se lance una nueva, se añade entry aquí.
const FAQS_BY_BRAND: Partial<Record<LgoPracticeId, FaqItem[]>> = {
  abogados: faqsAbogados,
  contadores: faqsContadores
  // tecnologia: faqsTecnologia,   // ← cuando se lance, descomentar
  // marketing:  faqsMarketing,    // ← cuando se lance, descomentar
};

export const faqsByBrand = (brand: LgoPracticeId): FaqItem[] =>
  FAQS_BY_BRAND[brand] ?? [];
