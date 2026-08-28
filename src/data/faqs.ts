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

// Las seis preguntas responden objeciones del lector, no "qué hacemos": eso lo
// contesta el cuerpo de la página.
//
// FUNDAMENTO LEGAL — el régimen de condominio en Jalisco se rige por el Título
// Sexto del Libro Tercero del Código Civil del Estado de Jalisco (artículos 1001
// y siguientes). NO por la Ley sobre el Régimen de Propiedad y Condominio de
// Inmuebles para el Estado de Jalisco, abrogada en 1995, ni por el Código Urbano.
// Solo se citan artículos verificados contra el texto oficial y expresamente
// autorizados: 1011, 1013 bis, 1019, 1020, 1022, 1023, 1025, 1026 y 1029. No
// añadir ninguno más sin verificación y autorización.
//
// Estilo de cita: comercial, no técnico. Primero la respuesta útil en lenguaje
// llano, después el fundamento en una sola frase. Sin fracciones, sin
// transcripción literal del texto legal.
//
// Terminología: al órgano de gobierno del condominio se le llama siempre
// "Consejo de Administración". El "comité de vigilancia" del artículo 1011 es
// una figura legal distinta —es quien celebra el contrato de administración
// profesional— y se nombra así a propósito: no unificar los dos términos.
//
// Estas respuestas viajan también en el FAQPage del JSON-LD, así que cada una
// debe sostenerse sola, fuera del contexto de la página.
export const faqsAdministradores: FaqItem[] = [
  {
    q: '¿Cómo se cambia de administrador en un condominio?',
    a: 'La decisión es de la asamblea de condóminos, no de la administración en turno: la asamblea es el órgano supremo del condominio y es quien designa a quien lo administra, en la reunión ordinaria que se celebra al menos una vez al año. El Código Civil del Estado de Jalisco lo establece en sus artículos 1011, 1019 y 1020. En la práctica significa que cambiar de administrador no se tramita con el administrador saliente: se decide en asamblea y desde ahí se ejecuta. En esta misma página explicamos cómo acompañamos ese cambio, en su frente legal y en el operativo.'
  },
  {
    q: '¿Nos quedamos amarrados a un contrato largo?',
    a: 'No. Cuando la asamblea decide contratar servicios profesionales de administración, quien celebra el contrato es el comité de vigilancia, que es un órgano distinto del Consejo de Administración, y ese contrato no puede exceder de un año: se renueva únicamente mientras la asamblea no determine lo contrario. El Código Civil del Estado de Jalisco lo fija en su artículo 1011. Es una protección para el condominio, porque cada año hay un punto natural para revisar si el servicio debe continuar, sin necesidad de argumentar una salida.'
  },
  {
    q: '¿Qué pasa con la información del condominio cuando termina el contrato?',
    a: 'Se entrega. Designada una nueva administración, la saliente tiene un plazo máximo de quince días naturales para entregar la documentación, los estados de cuenta y los valores y bienes que tuviera bajo resguardo; el Código Civil del Estado de Jalisco lo establece en su artículo 1013 bis. Cuando quien sale somos nosotros, entregamos el expediente completo sin condicionarlo: el expediente es del condominio, no de quien lo administra.'
  },
  {
    q: '¿Cómo se cobra a un condómino que no paga?',
    a: 'Primero con gestión ordinaria: recordatorios, contacto directo y acuerdos de pago cuando son viables. Si el adeudo persiste, el estado de cuenta se convierte en título ejecutivo una vez transcurridos noventa días desde que venció el plazo de pago, siempre que lo suscriba el administrador con la aprobación del presidente del Consejo de Administración; el Código Civil del Estado de Jalisco lo prevé en su artículo 1029. Para llegar ahí se necesitan cuentas en orden y recibos completos, porque sin eso el título no se sostiene. Ese cobro por la vía judicial se atiende como asunto legal aparte de la cuota de administración.'
  },
  {
    q: '¿Qué hace que un acuerdo de asamblea se sostenga?',
    a: 'Que la convoque quien está facultado para hacerlo, con la anticipación que marca la ley y con el quórum necesario para instalarse: la convocatoria a asamblea ordinaria pide cuando menos quince días naturales de anticipación y la extraordinaria veinte, y la ordinaria se instala en primera convocatoria con el cincuenta y uno por ciento de los derechos. El Código Civil del Estado de Jalisco lo regula en sus artículos 1022, 1023 y 1025. Por eso una asamblea convocada de prisa deja sus acuerdos expuestos: el fondo puede ser correcto y la forma tumbarlo de todos modos.'
  },
  {
    q: '¿Atienden condominios pequeños?',
    a: 'Sí, de cualquier tamaño. La ley no distingue: las obligaciones de la asamblea, del administrador y de la contabilidad del condominio son las mismas en un edificio de doce departamentos que en uno de doscientos, y la contribución de cada condómino se determina por el porcentaje que su unidad privativa representa en el condominio, como lo establece el Código Civil del Estado de Jalisco en su artículo 1026. Lo que cambia con el tamaño es el volumen de trabajo, y a eso se ajustan los honorarios.'
  }
];

// Mapa de FAQs por práctica. Cuando se lance una nueva, se añade entry aquí.
const FAQS_BY_BRAND: Partial<Record<LgoPracticeId, FaqItem[]>> = {
  abogados: faqsAbogados,
  contadores: faqsContadores,
  administradores: faqsAdministradores
  // tecnologia: faqsTecnologia,   // ← cuando se lance, descomentar
  // marketing:  faqsMarketing,    // ← cuando se lance, descomentar
};

export const faqsByBrand = (brand: LgoPracticeId): FaqItem[] =>
  FAQS_BY_BRAND[brand] ?? [];
