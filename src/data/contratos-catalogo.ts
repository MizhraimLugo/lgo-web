// ════════════════════════════════════════════════════════════════
//  CATÁLOGO DE CONTRATOS — sección /contratos  (GENERADO)
// ════════════════════════════════════════════════════════════════
//
// Generado por _fuentes/_build-tools/generate-catalog.mjs desde la base de
// conocimiento segmentada. NO editar a mano: re-generar tras cambios.
//
// Seguridad de pagos: el precio vive AQUÍ (servidor). Las Netlify Functions
// (paypal-crear-orden, paypal-capturar, generar) leen el precio de este
// catálogo; el frontend solo envía contrato_id y NUNCA un precio.
//
// Duplicados: la base trae el mismo documento en dos bloques (General y
// Negocios). Se conservan como entradas separadas: `{slug}` (General) y
// `{slug}-negocios` (Negocios). Ambas copias comparten el mismo precio.
//
// Por cada entrada existen: src/data/contratos/{id}.json (explicación + campos)
// y _fuentes/plantillas/{id}.docx (plantilla con marcadores {{clave}}).

export type ContratoCategoria = 'General' | 'Negocios';

/** Tier de complejidad del tabulador de precios (1 simple → 3 complejo). */
export type ContratoTier = 1 | 2 | 3;

export type ContratoCatalogo = {
  id: string;
  nombre: string;
  categoria: ContratoCategoria;
  descripcion_corta: string;
  /** Términos para el buscador en vivo del landing y el enrutador del chat. */
  keywords: string[];
  /** Precio en MXN. El frontend lo muestra pero jamás lo envía al servidor. */
  precio: number;
  moneda: 'MXN';
  tier: ContratoTier;
};

export const contratosCatalogo: ContratoCatalogo[] = [
  {
    id: "prestacion-servicios",
    nombre: "Contrato de Prestación de Servicios",
    categoria: "General",
    descripcion_corta:
      "En el contrato de prestación de servicios una persona (profesionista) se obliga con respecto a otra a realizar una serie de servicios a cambio de un precio.",
    keywords: ["contrato","prestación","servicios","persona"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "carta-poder",
    nombre: "Carta Poder",
    categoria: "General",
    descripcion_corta:
      "Una carta poder es el documento por el que una persona otorga facultades para que otra persona realice determinados actos jurídicos en su nombre y representación. Como pueden ser trámites ante una dependencia.",
    keywords: ["carta","poder","persona","documento","otorga","facultades"],
    precio: 80,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "contrato-individual-trabajo",
    nombre: "Contrato Individual de Trabajo",
    categoria: "General",
    descripcion_corta:
      "Contrato individual de trabajo, cualquiera que sea su forma o denominación, es aquel por virtud del cual una persona se obliga a prestar a otra un trabajo personal subordinado, mediante el pago de un salario.",
    keywords: ["contrato","individual","trabajo","cualquiera"],
    precio: 120,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "convenio-divorcio",
    nombre: "Convenio de Divorcio",
    categoria: "General",
    descripcion_corta:
      "Es el acuerdo escrito por el cual dos personas que han contraído matrimonio y que han decidido divorciarse, establecen los términos y condiciones bajo los cuales se administrarán sus bienes, y en su caso, la forma del cuidado de los hijos, así como del pago de pensión alimenticia a que tuviere derecho alguno de ellos.",
    keywords: ["convenio","divorcio","acuerdo","escrito","personas","contraído"],
    precio: 180,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "contrato-chofer-uber",
    nombre: "Contrato para Chofer Uber",
    categoria: "General",
    descripcion_corta:
      "El contrato para chofer Uber en realidad es un contrato de prestación de servicios. Ya que, mediante el mismo, una persona llamada cliente contrata los servicios de un profesionista.",
    keywords: ["contrato","chofer","uber","servicios","realidad"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "contrato-confidencialidad",
    nombre: "Contrato de Confidencialidad",
    categoria: "General",
    descripcion_corta:
      "El contrato de confidencialidad o NDA es un documento entre dos sociedades mediante el cual se compartirá información confidencial y sensible. Esto para su uso posterior en determinado proyecto y restringiendo su uso público.",
    keywords: ["contrato","confidencialidad","documento","sociedades"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "compraventa-vehiculo",
    nombre: "Contrato de Compraventa de Vehículo",
    categoria: "General",
    descripcion_corta:
      "El contrato de compraventa de vehículo es el documento en el que una persona, llamada vendedora se obliga a entregar un vehículo. Mientras que otra persona, llamada compradora se obliga a pagar una cantidad de dinero por ese vehículo.",
    keywords: ["contrato","compraventa","vehículo","persona","llamada","obliga"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "contrato-empleada-domestica",
    nombre: "Contrato de Empleada Doméstica",
    categoria: "General",
    descripcion_corta:
      "El contrato de empleada doméstica es el documento por el cual se establecen los términos y condiciones bajo los cuales una persona emplea a otra para que lleve a cabo diversas labores en una casa habitación a cambio de una remuneración.",
    keywords: ["contrato","empleada","doméstica","documento"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "carta-renuncia-voluntaria",
    nombre: "Carta de Renuncia Voluntaria",
    categoria: "General",
    descripcion_corta:
      "Una carta de renuncia voluntaria es un documento por medio del cual un trabajador da por terminada su relación laboral frente a su patrón de manera formal.",
    keywords: ["carta","renuncia","voluntaria","documento","trabajador"],
    precio: 40,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "carta-confidencialidad-empleados",
    nombre: "Carta de Confidencialidad para Empleados",
    categoria: "General",
    descripcion_corta:
      "La carta de confidencialidad para empleados es el documento por el cual un trabajador se obliga a mantener confidencial los datos de la empresa y de los clientes de la empresa para la cual labora.",
    keywords: ["carta","confidencialidad","empleados","empresa","documento"],
    precio: 80,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "requerimiento-pago",
    nombre: "Requerimiento de Pago",
    categoria: "General",
    descripcion_corta:
      "El requerimiento de pago, es un documento a través del cual una persona le solicita a otra, el pago de una deuda de cualquier tipo.",
    keywords: ["requerimiento","pago","documento","través","persona"],
    precio: 50,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "contrato-mutuo",
    nombre: "Contrato de Mutuo",
    categoria: "General",
    descripcion_corta:
      "El contrato de mutuo es un documento por medio del cual una persona llamada mutuante se obliga a transferir la propiedad de una cantidad de dinero u otras cosas fungibles a otra persona llamada mutuario quien se obliga a devolver otro tanto de la misma especie y calidad.",
    keywords: ["contrato","mutuo","persona","llamada","obliga"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "finiquito-laboral",
    nombre: "Finiquito Laboral",
    categoria: "General",
    descripcion_corta:
      "Es un documento por el cual un trabajador acepta haber recibido cierta cantidad de dinero por la terminación de la relación laboral con su patrón, que cubre ciertos conceptos como aguinaldo y vacaciones.",
    keywords: ["finiquito","laboral","documento","trabajador","acepta","recibido"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "rescision-contrato",
    nombre: "Rescisión de Contrato",
    categoria: "General",
    descripcion_corta:
      "La notificación de rescisión de contrato es un aviso que realiza una persona a otra con el fin de dar por terminado un contrato. Esto debido al incumplimiento de esa otra persona en una o varias de sus obligaciones.",
    keywords: ["rescisión","contrato","persona","notificación"],
    precio: 80,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "carta-instruccion-fe-hechos",
    nombre: "Carta de Instrucción de Fe de Hechos",
    categoria: "General",
    descripcion_corta:
      "La carta de instrucción de fe de hechos es el documento por el que una persona realiza una solicitud a un Notario Público.",
    keywords: ["carta","instrucción","hechos","documento","persona"],
    precio: 40,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "notificacion-deterioros-vendedor",
    nombre: "Notificación de Deterioros al Vendedor por el Sismo",
    categoria: "General",
    descripcion_corta:
      "La notificación de deterioros al vendedor por el sismo es el documento por el cual se le informa al vendedor y propietario del inmueble que sufrió daños derivados de un sismo. Este aviso se realiza por el adquirente del inmueble.",
    keywords: ["notificación","deterioros","vendedor","sismo","inmueble"],
    precio: 40,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "pagare",
    nombre: "Pagaré",
    categoria: "General",
    descripcion_corta:
      "Un pagaré es un documento que contiene la promesa incondicional de una persona (suscriptor o deudor), de que pagará a otra persona (beneficiario o acreedor), una suma determinada de dinero en un determinado plazo.",
    keywords: ["pagaré","persona","documento","promesa","deudor","acreedor"],
    precio: 50,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "recibo-pago",
    nombre: "Recibo de Pago",
    categoria: "General",
    descripcion_corta:
      "Un recibo de pago es un documento firmado en el que se declara haber recibido una cantidad de dinero, una mercancía o un servicio.",
    keywords: ["recibo","pago","documento","firmado","declara"],
    precio: 30,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "carta-pension-alimenticia",
    nombre: "Carta Exigiendo el Pago de Pensión Alimenticia",
    categoria: "General",
    descripcion_corta:
      "La carta exigiendo el pago de pensión alimenticia, es el documento por el cual se requiere a una persona cumplir con la obligación de pagar una pensión alimenticia. Siendo reconocida ya sea por una decisión judicial o por ministerio de ley.",
    keywords: ["carta","exigiendo","pago","pensión","alimenticia","documento"],
    precio: 50,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "promesa-compraventa-inmueble",
    nombre: "Contrato de Promesa de Compraventa de Bien Inmueble",
    categoria: "General",
    descripcion_corta:
      "El contrato de promesa de compraventa de bien inmueble es el documento por el cual se crea la obligación para celebrar un contrato de compraventa de un bien inmueble en una fecha futura determinada.",
    keywords: ["contrato","promesa","compraventa","bien","inmueble"],
    precio: 180,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "permuta",
    nombre: "Contrato de Permuta",
    categoria: "General",
    descripcion_corta:
      "Es el acuerdo por escrito por el que dos o más personas se intercambian alguna cosa y si hay diferencia en el valor o precio se compensa la transacción con el pago de cierta cantidad de dinero.",
    keywords: ["contrato","permuta","acuerdo","escrito","personas","intercambian"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "convenio-modificatorio",
    nombre: "Convenio Modificatorio",
    categoria: "General",
    descripcion_corta:
      "Un convenio modificatorio es el documento por el que se realizan modificaciones a un contrato, que pueda ser susceptible de ser modificado, y pueden recaer en algunas características del contrato siempre y cuando las partes que intervinieron estén de acuerdo.",
    keywords: ["convenio","modificatorio","contrato","documento"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "notificacion-deterioros-arrendador",
    nombre: "Notificación de Deterioros al Arrendador por el Sismo",
    categoria: "General",
    descripcion_corta:
      "La notificación de deterioros al arrendador por el sismo es el documento por el cual se le informa al arrendador que el inmueble sufrió daños derivados de un sismo. Este aviso se realiza por el arrendatario o inquilino del inmueble.",
    keywords: ["notificación","deterioros","arrendador","sismo","inmueble"],
    precio: 40,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "autorizacion-subarrendar",
    nombre: "Autorización para Subarrendar",
    categoria: "General",
    descripcion_corta:
      "La autorización para subarrendar es el documento por el que el arrendador (casi siempre el propietario) de una vivienda o local otorga su consentimiento o su oposición al subarrendamiento solicitado por el arrendatario.",
    keywords: ["autorización","subarrendar","documento","arrendador"],
    precio: 50,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "convenio-terminacion-finiquito",
    nombre: "Convenio de Terminación y Finiquito",
    categoria: "General",
    descripcion_corta:
      "Es el acuerdo por el cual las personas que han celebrado un contrato con anterioridad deciden darlo por terminado, acordando que no adeudan cantidades de dinero entre las mismas.",
    keywords: ["convenio","terminación","finiquito","acuerdo","personas","celebrado","contrato"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "comodato-bien-mueble",
    nombre: "Contrato de Comodato Bien Mueble",
    categoria: "General",
    descripcion_corta:
      "El contrato de comodato bien mueble es el documento por el cual se establecen los términos y condiciones bajo los cuales una persona concede el uso de un bien mueble no fungible a otra persona que se obliga a restituirla individualmente.",
    keywords: ["contrato","comodato","bien","mueble","persona"],
    precio: 80,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "prestacion-servicios-negocios",
    nombre: "Contrato de Prestación de Servicios",
    categoria: "Negocios",
    descripcion_corta:
      "En el contrato de prestación de servicios una persona (profesionista) se obliga con respecto a otra a realizar una serie de servicios a cambio de un precio.",
    keywords: ["contrato","prestación","servicios","persona"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "carta-poder-negocios",
    nombre: "Carta Poder",
    categoria: "Negocios",
    descripcion_corta:
      "Una carta poder es el documento por el que una persona otorga facultades para que otra persona realice determinados actos jurídicos en su nombre y representación. Como pueden ser trámites ante una dependencia.",
    keywords: ["carta","poder","persona","documento","otorga","facultades"],
    precio: 80,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "contrato-individual-trabajo-negocios",
    nombre: "Contrato Individual de Trabajo",
    categoria: "Negocios",
    descripcion_corta:
      "Contrato individual de trabajo, cualquiera que sea su forma o denominación, es aquel por virtud del cual una persona se obliga a prestar a otra un trabajo personal subordinado, mediante el pago de un salario.",
    keywords: ["contrato","individual","trabajo","cualquiera"],
    precio: 120,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "comision-mercantil",
    nombre: "Contrato de Comisión Mercantil",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de comisión mercantil es una forma de mandato mercantil. Es muy parecido al mandato civil ya que, aunque un mandato puede referirse a varias actividades, en el caso de la comisión mercantil, las actividades principales son comprar o vender por cuenta ajena.",
    keywords: ["contrato","comisión","mercantil","mandato","actividades"],
    precio: 120,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "suministro",
    nombre: "Contrato de Suministro",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de suministro, es un contrato por medio del cual una persona se obliga a entregar a la otra persona, a cambio de un precio unitario que puede pagarse periódicamente o caso por caso, cosas muebles que serán entregadas de forma sucesiva.",
    keywords: ["contrato","suministro","persona","obliga"],
    precio: 180,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "contrato-chofer-uber-negocios",
    nombre: "Contrato para Chofer Uber",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato para chofer Uber en realidad es un contrato de prestación de servicios. Ya que, mediante el mismo, una persona llamada cliente contrata los servicios de un profesionista.",
    keywords: ["contrato","chofer","uber","servicios","realidad"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "contrato-confidencialidad-negocios",
    nombre: "Contrato de Confidencialidad",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de confidencialidad o NDA es un documento entre dos sociedades mediante el cual se compartirá información confidencial y sensible. Esto para su uso posterior en determinado proyecto y restringiendo su uso público.",
    keywords: ["contrato","confidencialidad","documento","sociedades"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "carta-renuncia-voluntaria-negocios",
    nombre: "Carta de Renuncia Voluntaria",
    categoria: "Negocios",
    descripcion_corta:
      "Una carta de renuncia voluntaria es un documento por medio del cual un trabajador da por terminada su relación laboral frente a su patrón de manera formal.",
    keywords: ["carta","renuncia","voluntaria","documento","trabajador"],
    precio: 40,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "carta-confidencialidad-empleados-negocios",
    nombre: "Carta de Confidencialidad para Empleados",
    categoria: "Negocios",
    descripcion_corta:
      "La carta de confidencialidad para empleados es el documento por el cual un trabajador se obliga a mantener confidencial los datos de la empresa y de los clientes de la empresa para la cual labora.",
    keywords: ["carta","confidencialidad","empleados","empresa","documento"],
    precio: 80,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "requerimiento-pago-negocios",
    nombre: "Requerimiento de Pago",
    categoria: "Negocios",
    descripcion_corta:
      "El requerimiento de pago, es un documento a través del cual una persona le solicita a otra, el pago de una deuda de cualquier tipo.",
    keywords: ["requerimiento","pago","documento","través","persona"],
    precio: 50,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "compraventa-contado",
    nombre: "Contrato de Compraventa de Contado",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de compraventa de contado es el documento por el cual se establecen los términos y condiciones bajo los cuales una persona vende a otra un bien o producto a un precio cierto.",
    keywords: ["contrato","compraventa","contado","documento"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "contrato-mutuo-negocios",
    nombre: "Contrato de Mutuo",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de mutuo es un documento por medio del cual una persona llamada mutuante se obliga a transferir la propiedad de una cantidad de dinero u otras cosas fungibles a otra persona llamada mutuario quien se obliga a devolver otro tanto de la misma especie y calidad.",
    keywords: ["contrato","mutuo","persona","llamada","obliga"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "aviso-privacidad",
    nombre: "Aviso de Privacidad",
    categoria: "Negocios",
    descripcion_corta:
      "Es la notificación que por ley debe incluirse en cualquier medio o documento en el que se obtengan datos personales como pueden ser nombres, domicilios, números telefónicos y/o direcciones de correo electrónicos, de algún tercero, como clientes, socios, proveedores, etc.",
    keywords: ["aviso","privacidad","notificación","incluirse","cualquier","documento"],
    precio: 80,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "finiquito-laboral-negocios",
    nombre: "Finiquito Laboral",
    categoria: "Negocios",
    descripcion_corta:
      "Es un documento por el cual un trabajador acepta haber recibido cierta cantidad de dinero por la terminación de la relación laboral con su patrón, que cubre ciertos conceptos como aguinaldo y vacaciones.",
    keywords: ["finiquito","laboral","documento","trabajador","acepta","recibido"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "rescision-contrato-negocios",
    nombre: "Rescisión de Contrato",
    categoria: "Negocios",
    descripcion_corta:
      "La notificación de rescisión de contrato es un aviso que realiza una persona a otra con el fin de dar por terminado un contrato. Esto debido al incumplimiento de esa otra persona en una o varias de sus obligaciones.",
    keywords: ["rescisión","contrato","persona","notificación"],
    precio: 80,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "carta-instruccion-fe-hechos-negocios",
    nombre: "Carta de Instrucción de Fe de Hechos",
    categoria: "Negocios",
    descripcion_corta:
      "La carta de instrucción de fe de hechos es el documento por el que una persona realiza una solicitud a un Notario Público.",
    keywords: ["carta","instrucción","hechos","documento","persona"],
    precio: 40,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "notificacion-deterioros-vendedor-negocios",
    nombre: "Notificación de Deterioros al Vendedor por el Sismo",
    categoria: "Negocios",
    descripcion_corta:
      "La notificación de deterioros al vendedor por el sismo es el documento por el cual se le informa al vendedor y propietario del inmueble que sufrió daños derivados de un sismo. Este aviso se realiza por el adquirente del inmueble.",
    keywords: ["notificación","deterioros","vendedor","sismo","inmueble"],
    precio: 40,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "distribucion",
    nombre: "Contrato de Distribución",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de distribución es el contrato por medio del cual una parte se compromete con otra a comprar sus productos y revenderlos durante un plazo, en un territorio específico y bajo ciertas condiciones.",
    keywords: ["contrato","distribución","compromete","comprar"],
    precio: 180,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "compraventa-plazos",
    nombre: "Contrato de Compraventa a Plazos",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de compraventa a plazos es un contrato a través del cual una persona llamada \"vendedor\" se obliga a transmitir la propiedad del objeto (bien mueble) al \"comprador\" quien lo adquiere, a un precio determinado, y el cuál se pagará en plazos determinados y acordados por las partes.",
    keywords: ["contrato","compraventa","plazos","través"],
    precio: 120,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "licencia-uso-marca",
    nombre: "Contrato de Licencia de Uso de Marca",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de licencia de uso de marca es a través del cuál el titular de una marca registrada (Licenciante) autoriza a un tercero (Licenciatario) el uso de la misma a cambio de una remuneración económica.",
    keywords: ["contrato","licencia","marca","través","titular"],
    precio: 180,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "consignacion-mercantil",
    nombre: "Contrato de Consignación Mercantil",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de consignación mercantil es el contrato por virtud del cual, una persona denominada consignante transmite la disponibilidad y no la propiedad de uno o varios bienes muebles, a otra persona denominada consignatario.",
    keywords: ["contrato","consignación","mercantil","persona","denominada"],
    precio: 120,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "recibo-pago-negocios",
    nombre: "Recibo de Pago",
    categoria: "Negocios",
    descripcion_corta:
      "Un recibo de pago es un documento firmado en el que se declara haber recibido una cantidad de dinero, una mercancía o un servicio.",
    keywords: ["recibo","pago","documento","firmado","declara"],
    precio: 30,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "pagare-negocios",
    nombre: "Pagaré",
    categoria: "Negocios",
    descripcion_corta:
      "Un pagaré es un documento que contiene la promesa incondicional de una persona (suscriptor o deudor), de que pagará a otra persona (beneficiario o acreedor), una suma determinada de dinero en un determinado plazo.",
    keywords: ["pagaré","persona","documento","contiene"],
    precio: 50,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "no-competencia",
    nombre: "Contrato de No Competencia",
    categoria: "Negocios",
    descripcion_corta:
      "Es el acuerdo escrito por el cual dos personas se obligan a no competir entre ellas mismas es decir, a no comercializar los productos o servicios que cada una ofrezca al público en cierto territorio y/o temporalidad específicos.",
    keywords: ["contrato","competencia","acuerdo","escrito","personas","obligan"],
    precio: 120,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "compraventa-acciones",
    nombre: "Contrato de Compraventa de Acciones",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de compraventa de acciones es el documento por el cual se establecen los términos y condiciones bajo los cuales una persona transmite la propiedad de acciones que pueden ser de tipo \"A\" o tipo \"B\" a otra persona y los derechos que cada una de estos tipos de acciones le concede al titular de las mismas.",
    keywords: ["contrato","compraventa","acciones","persona"],
    precio: 200,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "abandono-laboral",
    nombre: "Abandono Laboral",
    categoria: "Negocios",
    descripcion_corta:
      "La notificación de abandono laboral, es un documento que envía el patrón a un trabajador para hacerle saber que ha dejado de asistir a su trabajo sin justificación alguna.",
    keywords: ["abandono","laboral","notificación","documento"],
    precio: 40,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "donacion-bien-inmueble",
    nombre: "Contrato de Donación de Bien Inmueble",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de donación de bien inmueble es el documento por el cual una persona transmite a otra la propiedad de uno o varios bienes inmuebles de forma gratuita.",
    keywords: ["contrato","donación","bien","inmueble","documento"],
    precio: 150,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "promesa-compraventa-inmueble-negocios",
    nombre: "Contrato de Promesa de Compraventa de Bien Inmueble",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de promesa de compraventa de bien inmueble es el documento por el cual se crea la obligación para celebrar un contrato de compraventa de un bien inmueble en una fecha futura determinada.",
    keywords: ["contrato","promesa","compraventa","bien","inmueble"],
    precio: 180,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "convenio-modificatorio-negocios",
    nombre: "Convenio Modificatorio",
    categoria: "Negocios",
    descripcion_corta:
      "Un convenio modificatorio es el documento por el que se realizan modificaciones a un contrato, que pueda ser susceptible de ser modificado, y pueden recaer en algunas características del contrato siempre y cuando las partes que intervinieron estén de acuerdo.",
    keywords: ["convenio","modificatorio","contrato","documento"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "notificacion-deterioros-arrendador-negocios",
    nombre: "Notificación de Deterioros al Arrendador por el Sismo",
    categoria: "Negocios",
    descripcion_corta:
      "La notificación de deterioros al arrendador por el sismo es el documento por el cual se le informa al arrendador que el inmueble sufrió daños derivados de un sismo. Este aviso se realiza por el arrendatario o inquilino del inmueble.",
    keywords: ["notificación","deterioros","arrendador","sismo","inmueble"],
    precio: 40,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "autorizacion-subarrendar-negocios",
    nombre: "Autorización para Subarrendar",
    categoria: "Negocios",
    descripcion_corta:
      "La autorización para subarrendar es el documento por el que el arrendador (casi siempre el propietario) de una vivienda o local otorga su consentimiento o su oposición al subarrendamiento solicitado por el arrendatario.",
    keywords: ["autorización","subarrendar","documento","arrendador"],
    precio: 50,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "convenio-terminacion-finiquito-negocios",
    nombre: "Convenio de Terminación y Finiquito",
    categoria: "Negocios",
    descripcion_corta:
      "Es el acuerdo por el cual las personas que han celebrado un contrato con anterioridad deciden darlo por terminado, acordando que no adeudan cantidades de dinero entre las mismas.",
    keywords: ["convenio","terminación","finiquito","acuerdo","personas","celebrado","contrato"],
    precio: 100,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "comodato-bien-mueble-negocios",
    nombre: "Contrato de Comodato Bien Mueble",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de comodato bien mueble es el documento por el cual se establecen los términos y condiciones bajo los cuales una persona concede el uso de un bien mueble no fungible a otra persona que se obliga a restituirla individualmente.",
    keywords: ["contrato","comodato","bien","mueble","persona"],
    precio: 80,
    moneda: 'MXN',
    tier: 2
  },
  {
    id: "arrendamiento-departamento",
    nombre: "Contrato de Arrendamiento de Departamento",
    categoria: "Negocios",
    descripcion_corta:
      "En el contrato de arrendamiento por departamento una persona usa o disfruta temporalmente de un bien a cambio del pago de un precio o la prestación de un servicio a su dueño.",
    keywords: ["contrato","arrendamiento","departamento","persona"],
    precio: 150,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "arrendamiento-local-comercial",
    nombre: "Contrato de Arrendamiento de Local Comercial",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de arrendamiento de local comercial es un documento que se celebra entre el dueño de un inmueble dedicado a la actividad comercial y que desea ceder temporalmente a otra persona el uso y disfrute de su inmueble a cambio de una renta.",
    keywords: ["contrato","arrendamiento","local","comercial","inmueble"],
    precio: 180,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "arrendamiento-casa",
    nombre: "Contrato de Arrendamiento de Casa",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de arrendamiento de casa, es un contrato por medio del cual una persona usa o disfruta temporalmente de un bien inmueble a cambio del pago de un precio a su dueño.",
    keywords: ["contrato","arrendamiento","casa","persona","disfruta"],
    precio: 150,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "arrendamiento-casa-opcion-compra",
    nombre: "Contrato de Arrendamiento de Casa (opción a compra)",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de arrendamiento de casa (opción a compra) está conformado por dos tipos de contratos, uno de arrendamiento de casa habitación y otro de compraventa.",
    keywords: ["contrato","arrendamiento","casa","opción","compra"],
    precio: 200,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "compraventa-bien-inmueble",
    nombre: "Contrato de Compraventa de Bien Inmueble",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de compraventa de bien inmueble es un contrato a través de cual una persona llamada \"comprador\" adquiere un bien inmueble del propietario del mismo, siendo este el \"vendedor\", a un precio determinado, por lo cual se transmite la propiedad del mismo.",
    keywords: ["contrato","compraventa","bien","inmueble","través"],
    precio: 200,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "arrendamiento-bodega",
    nombre: "Contrato de Arrendamiento para Bodega",
    categoria: "Negocios",
    descripcion_corta:
      "En el contrato de arrendamiento para bodega una persona llamada arrendador pone a disposición de otra llamada arrendataria el uso y goce temporal de un inmueble para ser destinado a su uso como bodega en el cual podrán almacenarse o depositarse bienes y/o mercancías.",
    keywords: ["contrato","arrendamiento","bodega","llamada"],
    precio: 180,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "arrendamiento-nave-industrial",
    nombre: "Contrato de Arrendamiento de Nave Industrial",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de arrendamiento de nave industrial es el documento por el cual se establecen los términos y condiciones bajo los cuales una persona rentará un establecimiento comercial para instalar o establecer naves o complejos industriales.",
    keywords: ["contrato","arrendamiento","nave","industrial","documento"],
    precio: 200,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "arrendamiento-vacacional",
    nombre: "Contrato de Arrendamiento Vacacional",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de arrendamiento vacacional es el documento por el cual se establecen los términos y condiciones bajo los cuales una persona renta (pone a disposición o cede) una vivienda a otra durante un determinado periodo o tiempo reducido como lo puede ser un periodo vacacional o un fin de semana.",
    keywords: ["contrato","arrendamiento","vacacional","documento"],
    precio: 150,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "carta-intencion-compra-inmueble",
    nombre: "Carta de Intención de Compra de Inmueble",
    categoria: "Negocios",
    descripcion_corta:
      "La carta de intención de compra de inmueble es un documento que describe un acuerdo entre dos o más partes, que contiene compromisos que posteriormente podrán formalizarse mediante la elaboración del contrato correspondiente.",
    keywords: ["carta","intención","compra","inmueble","documento"],
    precio: 50,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "notificacion-incremento-renta",
    nombre: "Notificación de Incremento de Renta",
    categoria: "Negocios",
    descripcion_corta:
      "La notificación de incremento de renta es el documento por el cual el arrendador informa a través de una notificación la intención de aumentar el precio de la renta al arrendatario o inquilino.",
    keywords: ["notificación","incremento","renta","documento","arrendador"],
    precio: 40,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "recibo-pago-renta",
    nombre: "Recibo de Pago de Renta",
    categoria: "Negocios",
    descripcion_corta:
      "El recibo de pago de renta es el documento por el cual se comprueba que el arrendatario ha efectuado el pago al arrendador del precio de la renta o alquiler. A cambio, el arrendatario ocupa el bien inmueble y hace uso de él.",
    keywords: ["recibo","pago","renta","arrendatario","documento","comprueba"],
    precio: 30,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "notificacion-prorroga-arrendamiento",
    nombre: "Notificación de Prórroga de Contrato de Arrendamiento",
    categoria: "Negocios",
    descripcion_corta:
      "La notificación de prórroga de contrato de arrendamiento es el documento que se utiliza para notificar la extensión de la vigencia en los contratos de arrendamiento.",
    keywords: ["notificación","prórroga","contrato","arrendamiento"],
    precio: 40,
    moneda: 'MXN',
    tier: 1
  },
  {
    id: "donacion-bien-inmueble-2",
    nombre: "Contrato de Donación de Bien Inmueble",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de donación de bien inmueble es el documento por el cual una persona transmite a otra la propiedad de uno o varios bienes inmuebles de forma gratuita.",
    keywords: ["contrato","donación","bien","inmueble","documento"],
    precio: 150,
    moneda: 'MXN',
    tier: 3
  },
  {
    id: "comodato-bien-inmueble",
    nombre: "Contrato de Comodato Bien Inmueble",
    categoria: "Negocios",
    descripcion_corta:
      "El contrato de comodato bien inmueble es el documento por el cual se establecen los términos y condiciones bajo los cuales una persona concede el uso de un bien inmueble a otra persona que se obliga a restituirla individualmente.",
    keywords: ["contrato","comodato","bien","inmueble","persona"],
    precio: 150,
    moneda: 'MXN',
    tier: 3
  }
];

/** Búsqueda por id — las functions la usan para validar contrato_id y leer el precio. */
export const contratoById = (id: string): ContratoCatalogo | undefined =>
  contratosCatalogo.find((c) => c.id === id);
