// Catálogo de cursos del ecosistema LGO.
// Tres formatos coexisten: gratuito (lead magnet), online (pagado), presencial.
//
// PLACEHOLDER de catálogo — la página /cursos/ y el hub recogen estos datos.
// Cuando se lance la plataforma de pago real, este archivo se reemplaza por
// la fuente de verdad (CMS o BD), pero la API en plantillas seguirá igual.

export type CourseFormat = 'gratuito' | 'online' | 'presencial';

export type Course = {
  slug: string;
  name: string;
  shortName: string;
  format: CourseFormat;
  formatLabel: string;
  audience: string;
  blurb: string;
  /** Para landing larga: 3-4 párrafos explicando qué se aprende y a quién va. */
  longDescription?: string[];
  /** Lo que el alumno se lleva al terminar el curso. */
  outcomes?: string[];
  url: string;
  cta: string;
  /** Solo uno debe estar marcado — featured aparece en hero del hub. */
  featured?: boolean;
  /** True si el curso tiene su propia página personalizada (ej. el diagnóstico
   *  con cuestionario interactivo). El template dinámico [slug].astro los excluye. */
  customPage?: boolean;
};

export const cursos: Course[] = [
  // ───────────────────────────────────────────────────────────
  //  LEAD MAGNET — Diagnóstico gratuito
  // ───────────────────────────────────────────────────────────
  {
    slug: 'diagnostico-salud-empresarial',
    name: 'Diagnóstico de Salud Empresarial',
    shortName: 'Diagnóstico Empresarial',
    format: 'gratuito',
    formatLabel: 'Diagnóstico interactivo gratuito',
    audience: 'Empresarios y directivos de cualquier régimen y giro.',
    blurb:
      'Cincuenta preguntas que tu negocio debe poder contestar, organizadas en cinco territorios: orden financiero, régimen fiscal, utilidad y flujo, riesgos cotidianos, socios y patrimonio. Al final recibes un diagnóstico personalizado y una ruta de acción.',
    url: '/cursos/diagnostico-salud-empresarial/',
    cta: 'Tomar el diagnóstico',
    featured: true,
    customPage: true
  },

  // ───────────────────────────────────────────────────────────
  //  CURSOS ONLINE — el catálogo comercial
  // ───────────────────────────────────────────────────────────

  // #1 — El más vendible: deducciones
  {
    slug: 'deducciones-que-si-cuentan',
    name: 'Deducciones que sí cuentan: pagar lo justo al SAT sin riesgos',
    shortName: 'Deducciones que sí cuentan',
    format: 'online',
    formatLabel: 'Online · próximamente',
    audience:
      'Empresarios y dueños de negocio que sienten que pagan más impuestos de los que deberían.',
    blurb:
      'La mayoría deduce mal o no deduce. No por falta de información, sino por falta de criterio para distinguir qué gasto sí cuenta, cómo facturarlo, y qué errores cuestan más de lo que ahorran. Aprende a aprovechar las deducciones legales que tu negocio tiene disponibles, y a evitar las que el SAT termina rechazando.',
    longDescription: [
      'Cada mes, en la mayoría de las PyMEs mexicanas, salen del negocio gastos que sí podrían ser deducibles y no se aprovechan. Otros se intentan deducir y el SAT los rechaza después. Ambos errores cuestan dinero — pero por razones opuestas.',
      'Este curso aborda la deducibilidad desde el criterio práctico: qué gastos están en zona segura, cuáles requieren documentación adicional, cómo facturar correctamente desde la operación, y cuándo conviene reestructurar la forma en que tu negocio compra antes que la forma en que deduce.',
      'No es un curso de teoría fiscal. Es una guía de decisiones que se paga sola en la siguiente declaración.'
    ],
    outcomes: [
      'Saber qué gastos de tu operación son deducibles y cuáles no, con criterio claro y aplicable.',
      'Identificar los errores de facturación más comunes que invalidan deducciones sin que lo notes.',
      'Reorganizar lo que ya gastas para que sea fiscalmente eficiente, sin inventar nada.',
      'Reducir tu carga fiscal anual con seguridad — sin esquemas que dejen al negocio expuesto.'
    ],
    url: '/cursos/deducciones-que-si-cuentan/',
    cta: 'Apuntarme a la lista'
  },

  // #2 — Protección de marca
  {
    slug: 'protege-tu-marca',
    name: 'Protege el nombre de tu negocio antes de que alguien más lo registre',
    shortName: 'Protege tu marca',
    format: 'online',
    formatLabel: 'Online · próximamente',
    audience:
      'Emprendedores y dueños de marca que ya tienen tracción y quieren asegurar el activo.',
    blurb:
      'Cuando tu marca empieza a valer, alguien más también puede notarlo. El registro de marca no es burocracia: es la diferencia entre defender lo tuyo o perderlo. Aprende a verificar si tu marca está disponible, qué clases necesitas registrar, y cómo actuar si descubres que alguien ya solicitó la tuya.',
    longDescription: [
      'En México, los registros de marca se otorgan por orden de llegada. Si alguien más solicita registrar tu nombre antes que tú — aunque tú llevas años operando con él — la ley puede darle la razón a quien llegó primero.',
      'Este curso te enseña a hacer la búsqueda fonética en el sistema del IMPI, a identificar las clases que tu negocio necesita registrar realmente (no las que un proveedor te quiera vender), y a estructurar la solicitud para que no te la rechacen por errores evitables.',
      'Incluye qué hacer cuando descubres que tu marca ya está pedida por otra persona — porque las opciones existen, pero el tiempo corre en tu contra desde el momento en que te enteras.'
    ],
    outcomes: [
      'Verificar hoy mismo si tu nombre comercial está en riesgo de ser registrado por terceros.',
      'Conocer las clases del IMPI que tu negocio debe proteger según lo que realmente vende.',
      'Estructurar tu solicitud de registro para evitar las objeciones más comunes.',
      'Tener un plan de acción claro si descubres que alguien ya solicitó tu marca.'
    ],
    url: '/cursos/protege-tu-marca/',
    cta: 'Apuntarme a la lista'
  },

  // #3 — Contratos comerciales
  {
    slug: 'contratos-que-aseguran-el-cobro',
    name: 'Contratos que aseguran el cobro: cláusulas que no te dejan colgado',
    shortName: 'Contratos para cobrar',
    format: 'online',
    formatLabel: 'Online · próximamente',
    audience:
      'Consultores, prestadores de servicios y PyMEs que viven de facturar y cobrar.',
    blurb:
      'Todo el mundo ha vivido el cliente que no paga o el proveedor que incumple. La diferencia entre cobrar y perseguir está en el contrato que se firmó antes. Aprende qué cláusulas garantizan el pago, qué firmar antes de empezar a trabajar, y cómo reaccionar cuando ya te incumplieron. Incluye plantillas listas para usar.',
    longDescription: [
      'El cliente que no paga rara vez es mala persona — más bien es un cliente cuyo contrato no le obligaba a pagar en términos claros. Y ahí es donde la mayoría de las PyMEs pierden meses de trabajo: en contratos que se firmaron de buena fe sin las cláusulas que activan la cobranza cuando se necesitan.',
      'Este curso revisa los puntos del contrato que más importan para asegurar que cobres: anticipos, hitos de pago, intereses moratorios, garantías, jurisdicción. No para hacer contratos largos, sino para hacer contratos que se cumplen.',
      'Se entregan plantillas listas para adaptar: contrato de prestación de servicios, de suministro, de obra y de honorarios. Editables, comentadas para que sepas qué puedes cambiar y qué no.'
    ],
    outcomes: [
      'Identificar las cláusulas no-negociables que aseguran el pago en cualquier contrato comercial.',
      'Saber qué firmar y qué no firmar antes de empezar a trabajar con un cliente nuevo.',
      'Reaccionar correctamente cuando un cliente ya incumplió — antes de escalar a litigio.',
      'Quedarte con plantillas de contrato editables, listas para usar en tu operación.'
    ],
    url: '/cursos/contratos-que-aseguran-el-cobro/',
    cta: 'Apuntarme a la lista'
  },

  // #4 — Retiros del dueño
  {
    slug: 'cobrarte-como-dueno',
    name: 'Cobrarte como dueño: sacar dinero del negocio con orden',
    shortName: 'Cobrarte como dueño',
    format: 'online',
    formatLabel: 'Online · próximamente',
    audience:
      'Dueños de PyMEs que mezclan cuenta personal y del negocio, o no saben cuánto pueden retirar.',
    blurb:
      'El dinero entra y sale del negocio sin clasificación, las cuentas personales y empresariales están mezcladas, y la pregunta de fondo nunca se contesta: ¿cuánto de esto es realmente tuyo? Aprende a separar patrimonio, a cobrarte de forma que no te genere un problema fiscal, y a saber cuánto puedes retirar sin descapitalizarte.',
    longDescription: [
      'Casi todos los empresarios mexicanos mezclan en algún punto su patrimonio personal con el del negocio: un cargo a la tarjeta de la empresa para algo personal, una transferencia del negocio a la cuenta de casa, un préstamo informal sin documentar. Lo que parece pragmático en el momento se vuelve un problema fiscal cuando el SAT pide explicar los movimientos.',
      'Este curso enseña las cinco formas legales de sacar dinero del negocio — sueldo, honorarios, dividendos, préstamo o reembolso — y cuándo conviene cada una. También aborda cómo separar las cuentas sin afectar la operación, y cómo calcular cuánto puedes retirar realmente sin descapitalizar la empresa.',
      'Es un curso para dueños que ya pasaron la etapa de "lo que entra es mío" y quieren ordenar su flujo personal sin perder control del negocio.'
    ],
    outcomes: [
      'Conocer las cinco formas legales de retirar dinero del negocio y cuándo conviene cada una.',
      'Separar tu patrimonio personal del empresarial sin frenar la operación.',
      'Calcular cuánto puedes cobrarte sin descapitalizar el negocio.',
      'Documentar tus retiros para que no se conviertan en dividendos fictos ante el SAT.'
    ],
    url: '/cursos/cobrarte-como-dueno/',
    cta: 'Apuntarme a la lista'
  },

  // #5 — Checklist legal y fiscal
  {
    slug: 'checklist-legal-y-fiscal',
    name: 'Checklist legal y fiscal: lo que tu negocio debería tener en orden',
    shortName: 'Checklist empresarial',
    format: 'online',
    formatLabel: 'Online · próximamente',
    audience:
      'Empresarios de cualquier etapa que quieren saber con certeza qué les falta y dónde están expuestos.',
    blurb:
      'Una sesión, una lista clara: qué documentos legales, qué registros fiscales, qué obligaciones y qué riesgos tiene tu negocio abiertos hoy. Al final sales con un mapa exacto de tu nivel de orden y un plan para cerrar los huecos pendientes.',
    longDescription: [
      'La mayoría de las PyMEs operan con la duda permanente de si están bien o no. Es la incertidumbre más cara: no es un problema concreto, es la imposibilidad de saber qué problemas tienes abiertos.',
      'Este curso entrega la lista exacta — sin abstracciones — de lo que un negocio mexicano debería tener vigente: actas societarias actualizadas, contratos básicos firmados, registros fiscales al día, obligaciones del SAT cumplidas, marcas registradas, políticas internas mínimas. Y lo que es opcional pero conveniente.',
      'No es teoría: al terminar tienes un checklist tachable contra tu propia operación. Sabes exactamente qué te falta, qué urge y qué puede esperar. El alivio de la claridad total.'
    ],
    outcomes: [
      'Tener el inventario completo de documentos, registros y obligaciones que tu negocio debe tener.',
      'Identificar con precisión qué te falta hoy y en qué orden conviene atenderlo.',
      'Distinguir los pendientes urgentes de los meramente convenientes.',
      'Quedarte con un checklist propio, tachable, que puedes seguir revisando cada trimestre.'
    ],
    url: '/cursos/checklist-legal-y-fiscal/',
    cta: 'Apuntarme a la lista'
  }
];

export const featuredCourse = (): Course | undefined =>
  cursos.find((c) => c.featured);

export const nonFeaturedCourses = (): Course[] =>
  cursos.filter((c) => !c.featured);

/** Cursos que se renderizan con la plantilla dinámica /cursos/[slug].astro.
 *  Excluye los que tienen customPage (página personalizada). */
export const templatedCourses = (): Course[] =>
  cursos.filter((c) => !c.customPage);
