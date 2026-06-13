// ════════════════════════════════════════════════════════════════
//  CAMPOS DE CONTRATOS — llenado conversacional  (GENERADO)
// ════════════════════════════════════════════════════════════════
//
// Generado por _fuentes/_build-tools/generate-campos-index.mjs desde los
// src/data/contratos/{id}.json. NO editar a mano: re-generar tras cambios.
//
// Lo consume la Netlify Function chat.js (form-filling) y registrar-documento.js.
// Es la definición de los campos que el asistente pregunta; los valores los
// captura la conversación. Los campos calculados (p. ej. monto en letra) NO
// están aquí: se derivan al generar el .docx (Paso 5).

export type ContratoCampoTipo = 'texto' | 'parrafo' | 'select' | 'fecha' | 'numero' | 'moneda';

export type ContratoCampo = {
  clave: string;
  etiqueta: string;
  tipo: ContratoCampoTipo;
  obligatorio: boolean;
  opciones?: string[];
  depende_de?: { clave_padre: string; valor_que_activa: string };
};

export type ContratoCamposEntry = { nombre: string; campos: ContratoCampo[] };

export const contratosCampos: Record<string, ContratoCamposEntry> = {
  "abandono-laboral": {
    "nombre": "Abandono Laboral",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_patron",
        "etiqueta": "La persona empleadora (patrón) que notifica el abandono laboral es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_patron",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona empleadora (patrón) que realiza la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_patron",
        "etiqueta": "¿Cuál es el nombre completo del representante de la persona empleadora (patrón) que realiza la notificación?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_patron",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_trabajador",
        "etiqueta": "¿Cuál es el nombre completo del trabajador que abandonó su empleo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_trabajador",
        "etiqueta": "¿Cuál es el domicilio del trabajador a quien se le notifica el abandono de su trabajo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_notificacion",
        "etiqueta": "¿En qué lugar se realiza la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_notificacion",
        "etiqueta": "¿En qué fecha se realiza la notificación?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "arrendamiento-bodega": {
    "nombre": "Contrato de Arrendamiento para Bodega",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "La persona que dará bodegas en arrendamiento es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que dará bodegas en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendador",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que dará bodegas en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_arrendador",
        "etiqueta": "¿Cuál es el domicilio de la persona que dará bodegas en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "La persona que recibirá bodegas en arrendamiento es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá bodegas en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que recibirá bodegas en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendatario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se llevarán dichas controversias para su resolución?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_bodega",
        "etiqueta": "¿Cuál es el domicilio donde se ubican la(s) bodega(s) que se dará(n) en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "estado_civil_arrendador",
        "etiqueta": "La persona que dará bodegas en arrendamiento:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "No está casado y es único dueño del inmueble",
          "No está casado y es dueño de las bodegas junto con otras personas",
          "Se encuentra casado bajo el régimen de sociedad conyugal",
          "Se encuentra casado bajo el régimen de bienes separados"
        ]
      },
      {
        "clave": "nombre_copropietarios",
        "etiqueta": "Indica el nombre completo de las otras personas que son propietarias de las bodegas:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "estado_civil_arrendador",
          "valor_que_activa": "No está casado y es dueño de las bodegas junto con otras personas"
        }
      },
      {
        "clave": "nombre_conyuge",
        "etiqueta": "¿Cuál es el nombre completo del esposo(a) de la persona que dará bodegas en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "estado_civil_arrendador",
          "valor_que_activa": "Se encuentra casado bajo el régimen de sociedad conyugal"
        }
      },
      {
        "clave": "numero_bodegas",
        "etiqueta": "¿Cuántas bodegas se darán en arrendamiento?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "incluir_medidas",
        "etiqueta": "¿Deseas incluir las medidas y dimensiones de las bodegas que se darán en arrendamiento?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "periodicidad_renta",
        "etiqueta": "¿Cómo se calculará el pago de la renta?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Por hora",
          "Por día",
          "Por mes"
        ]
      },
      {
        "clave": "renta_mensual",
        "etiqueta": "¿A qué cantidad ascenderá la renta mensual que se pagará? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "dias_pago_renta",
        "etiqueta": "¿Con cuántos días contará la persona que recibe las bodegas en arrendamiento para pagar la renta, comenzando desde el primer día de cada mes?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "cobra_interes_mora",
        "etiqueta": "¿Se cobrará algún interés en caso de que no se pague la renta a tiempo?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes_mora",
        "etiqueta": "¿Cuál será la tasa de interés que se cobrará en caso de incumplimiento en el pago de la renta?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "cobra_interes_mora",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "requiere_deposito",
        "etiqueta": "¿Será necesario que se entregue cierta cantidad de dinero como depósito para el caso de cualquier incumplimiento?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "monto_deposito",
        "etiqueta": "¿Qué cantidad se deberá entregar como depósito? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "requiere_deposito",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El contrato se celebrará por: ¿tiempo específico o tiempo indeterminado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Tiempo específico",
          "Tiempo indeterminado"
        ]
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará la vigencia del contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Tiempo específico"
        }
      }
    ]
  },
  "arrendamiento-casa-opcion-compra": {
    "nombre": "Contrato de Arrendamiento de Casa (opción a compra)",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "La persona que dará el bien en arrendamiento es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que dará en arrendamiento la casa habitación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendador",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que dará el bien en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_arrendador",
        "etiqueta": "¿Cuál es el domicilio de la persona que dará el bien en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "La persona que recibirá el bien en arrendamiento es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá el bien en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que recibirá el bien en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendatario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "domicilio_casa",
        "etiqueta": "¿Cuál es el domicilio donde se ubica la casa habitación que se dará en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "estado_civil_arrendador",
        "etiqueta": "La persona que dará en arrendamiento la casa habitación:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "No se encuentra casado y es el único dueño del inmueble",
          "No se encuentra casado y es dueño del inmueble junto con otras personas",
          "Se encuentra casado bajo el régimen de bienes separados",
          "Se encuentra casado bajo el régimen de sociedad conyugal"
        ]
      },
      {
        "clave": "renta_mensual",
        "etiqueta": "¿A qué cantidad ascenderá la renta mensual que se pagará? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "dias_pago_renta",
        "etiqueta": "¿Con cuántos días contará la persona que recibe el bien en arrendamiento para pagar la renta, comenzando desde el primer día del mes?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "cobra_interes_mora",
        "etiqueta": "¿Se cobrará algún interés en caso de que no se pague la renta a tiempo?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes_mora",
        "etiqueta": "¿Cuál será la tasa de interés que se cobrará en caso de incumplimiento en el pago de la renta?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "cobra_interes_mora",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "requiere_deposito",
        "etiqueta": "¿Será necesario que se entregue cierta cantidad de dinero como depósito para el caso de cualquier incumplimiento?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "meses_deposito",
        "etiqueta": "¿Cuántos meses de renta se deberán entregar como depósito?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "requiere_deposito",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "fecha_inicio_vigencia",
        "etiqueta": "¿En qué fecha comenzará la vigencia del contrato de arrendamiento?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El contrato se celebrará por: ¿tiempo específico o tiempo indeterminado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Tiempo específico",
          "Tiempo indeterminado"
        ]
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará la vigencia del contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Tiempo específico"
        }
      },
      {
        "clave": "termina_por_muerte",
        "etiqueta": "¿El contrato se terminará por la muerte de alguna de las partes?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "contratara_seguro",
        "etiqueta": "¿Deberá la persona que recibe el bien en arrendamiento contratar un seguro que cubra cualquier daño ocasionado a la casa habitación?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "dias_aviso_opcion_compra",
        "etiqueta": "¿Con cuántos días naturales contará la persona que recibe el bien en arrendamiento para avisar que es su deseo adquirir la casa habitación por el ejercicio de la opción de compra?",
        "tipo": "numero",
        "obligatorio": true
      }
    ]
  },
  "arrendamiento-casa": {
    "nombre": "Contrato de Arrendamiento de Casa",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "La persona que dará el bien en arrendamiento es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que dará en arrendamiento la casa habitación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "pais_constitucion_arrendador",
        "etiqueta": "¿En qué país se constituyó la persona que dará el bien en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_representante_arrendador",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que dará el bien en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_arrendador",
        "etiqueta": "¿Cuál es el domicilio de la persona que dará el bien en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "La persona que recibirá el bien en arrendamiento es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá el bien en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nacionalidad_arrendatario",
        "etiqueta": "¿Cuál es la nacionalidad de la persona que recibirá el bien en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "forma_firma_arrendatario",
        "etiqueta": "La persona que recibirá el bien en arrendamiento firmará el contrato: ¿personalmente o a través de representante?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Personalmente",
          "A través de representante"
        ]
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se llevarán dichas controversias para su resolución?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_casa",
        "etiqueta": "¿Cuál es el domicilio donde se ubica la casa habitación que se dará en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "estado_civil_arrendador",
        "etiqueta": "La persona que dará en arrendamiento la casa habitación:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "No se encuentra casado y es el único dueño de la casa habitación",
          "No se encuentra casado y es dueño de la casa habitación junto con otras personas",
          "Se encuentra casado bajo el régimen de bienes separados",
          "Se encuentra casado bajo el régimen de sociedad conyugal"
        ]
      },
      {
        "clave": "renta_mensual",
        "etiqueta": "¿A qué cantidad ascenderá la renta mensual que se pagará? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "dias_pago_renta",
        "etiqueta": "¿Con cuántos días contará la persona que recibe el bien en arrendamiento para pagar la renta, comenzando desde el primer día del mes?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "cobra_interes_mora",
        "etiqueta": "¿Se cobrará algún interés en caso de que no se pague la renta a tiempo?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes_mora",
        "etiqueta": "¿Cuál será la tasa de interés que se cobrará en caso de incumplimiento en el pago de la renta?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "cobra_interes_mora",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "requiere_deposito",
        "etiqueta": "¿Será necesario que se entregue cierta cantidad de dinero como depósito para el caso de cualquier incumplimiento?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "meses_deposito",
        "etiqueta": "¿Cuántos meses de renta se deberán entregar como depósito?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "requiere_deposito",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "fecha_inicio_vigencia",
        "etiqueta": "¿En qué fecha comenzará la vigencia del contrato de arrendamiento?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El contrato se celebrará por: ¿tiempo específico o tiempo indeterminado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Tiempo específico",
          "Tiempo indeterminado"
        ]
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará la vigencia del contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Tiempo específico"
        }
      },
      {
        "clave": "termina_por_muerte",
        "etiqueta": "¿El contrato se terminará por la muerte de alguna de las partes?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "contratara_seguro",
        "etiqueta": "¿Deberá la persona que recibe el bien en arrendamiento contratar un seguro que cubra cualquier daño ocasionado a la casa habitación?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  },
  "arrendamiento-departamento": {
    "nombre": "Contrato de Arrendamiento de Departamento",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "La persona que dará el bien en arrendamiento es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que dará en arrendamiento el departamento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendador",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que dará el bien en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_arrendador",
        "etiqueta": "¿Cuál es el domicilio de la persona que dará el bien en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "La persona que recibirá el bien en arrendamiento es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá el bien en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que recibirá el bien en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendatario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se llevarán dichas controversias para su resolución?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_departamento",
        "etiqueta": "¿Cuál es el domicilio donde se ubica el departamento que se dará en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "estado_civil_arrendador",
        "etiqueta": "La persona que dará en arrendamiento el departamento:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "No se encuentra casado y es el único dueño del departamento",
          "No se encuentra casado y es dueño del departamento junto con otras personas",
          "Se encuentra casado bajo el régimen de bienes separados",
          "Se encuentra casado bajo el régimen de sociedad conyugal"
        ]
      },
      {
        "clave": "renta_mensual",
        "etiqueta": "¿A qué cantidad ascenderá la renta mensual que se pagará? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "dias_pago_renta",
        "etiqueta": "¿Con cuántos días contará la persona que recibe el bien en arrendamiento para pagar la renta, comenzando desde el primer día del mes?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "cobra_interes_mora",
        "etiqueta": "¿Se cobrará algún interés en caso de que no se pague la renta a tiempo?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes_mora",
        "etiqueta": "¿Cuál será la tasa de interés que se cobrará en caso de incumplimiento en el pago de la renta?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "cobra_interes_mora",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "requiere_deposito",
        "etiqueta": "¿Será necesario que se entregue cierta cantidad de dinero como depósito para el caso de cualquier incumplimiento?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "meses_deposito",
        "etiqueta": "¿Cuántos meses de renta se deberán entregar como depósito?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "requiere_deposito",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "fecha_inicio_vigencia",
        "etiqueta": "¿En qué fecha comenzará la vigencia del contrato de arrendamiento?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El contrato se celebrará por: ¿un periodo de tiempo o tiempo indeterminado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Un periodo de tiempo",
          "Tiempo indeterminado"
        ]
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará la vigencia del contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Un periodo de tiempo"
        }
      },
      {
        "clave": "termina_por_muerte",
        "etiqueta": "¿El contrato se terminará por la muerte de alguna de las partes?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "contratara_seguro",
        "etiqueta": "¿Deberá la persona que recibe el bien en arrendamiento contratar un seguro que cubra cualquier daño ocasionado al departamento?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  },
  "arrendamiento-local-comercial": {
    "nombre": "Contrato de Arrendamiento de Local Comercial",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "La persona que dará el bien en renta es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que dará el bien que se rentará?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendador",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que dará el bien que se rentará?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_arrendador",
        "etiqueta": "¿Cuál es el domicilio de la persona propietaria del bien que se rentará?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "La persona que recibe el bien que se rentará es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibe el bien que se rentará?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que recibe el bien que se rentará?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendatario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_arrendatario",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibe el bien que se rentará?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se celebrará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "estado_civil_arrendador",
        "etiqueta": "La persona que dará en arrendamiento el inmueble comercial:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "No se encuentra casado y es el único dueño del inmueble comercial",
          "No se encuentra casado y es dueño del inmueble junto con otras personas",
          "Se encuentra casado bajo el régimen de bienes separados",
          "Se encuentra casado bajo el régimen de sociedad conyugal"
        ]
      },
      {
        "clave": "domicilio_local",
        "etiqueta": "Determine el domicilio del local comercial que se rentará:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "descripcion_local",
        "etiqueta": "Describe el bien inmueble o local comercial que se rentará:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "renta_mensual",
        "etiqueta": "¿Cuánto se pagará mensualmente por la renta del bien? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "pena_convencional",
        "etiqueta": "¿Deberá pagar la parte que recibe el bien que se rentará alguna cantidad como castigo o pena convencional, en caso de incumplimiento en el pago de la renta mensual?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "porcentaje_pena",
        "etiqueta": "¿Qué porcentaje del monto de la renta se deberá pagar como castigo o pena convencional en caso de incumplimiento?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "pena_convencional",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El contrato se celebrará por: ¿periodo determinado o tiempo indeterminado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Periodo determinado",
          "Tiempo indeterminado"
        ]
      },
      {
        "clave": "meses_vigencia",
        "etiqueta": "¿Cuántos meses estará vigente el presente contrato?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Periodo determinado"
        }
      },
      {
        "clave": "uso_local",
        "etiqueta": "Describe el uso que se le dará al bien que se rentará:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "requiere_deposito",
        "etiqueta": "¿Deberá la persona que recibe el bien que se rentará entregar una cantidad en depósito al inicio de la vigencia del contrato, como garantía del cumplimiento de sus obligaciones?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "meses_deposito",
        "etiqueta": "¿De cuántos meses de renta será el depósito?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "requiere_deposito",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "arrendamiento-nave-industrial": {
    "nombre": "Contrato de Arrendamiento de Nave Industrial",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "La persona que dará un bien para fines industriales en arrendamiento es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que dará un bien para fines industriales en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendador",
        "etiqueta": "¿Cuál es el nombre completo del representante de la persona que dará un bien para fines industriales en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_arrendador",
        "etiqueta": "¿Cuál es el domicilio de la persona que dará un bien para fines industriales en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "La persona que recibirá un bien para fines industriales en arrendamiento es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá un bien para fines industriales en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo del representante de la persona que recibirá un bien para fines industriales en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendatario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se llevarán dichas controversias para su resolución?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_nave",
        "etiqueta": "¿Cuál es el domicilio donde se ubica el bien para fines industriales que se dará en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "estado_civil_arrendador",
        "etiqueta": "La persona que dará un bien para fines industriales en arrendamiento:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "No está casado y es único dueño del inmueble",
          "No está casado y es dueño de las bodegas junto con otras personas",
          "Se encuentra casado bajo el régimen de sociedad conyugal",
          "Se encuentra casado bajo el régimen de bienes separados"
        ]
      },
      {
        "clave": "descripcion_nave",
        "etiqueta": "Describe en qué consiste el bien para fines industriales que se dará en arrendamiento:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "incluir_medidas",
        "etiqueta": "¿Deseas incluir las medidas y dimensiones del bien para fines industriales que se darán en arrendamiento?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "periodicidad_renta",
        "etiqueta": "¿Con qué periodicidad se realizará el pago de la renta?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Mensual",
          "Por semana"
        ]
      },
      {
        "clave": "renta_mensual",
        "etiqueta": "¿A qué cantidad ascenderá la renta mensual que se pagará? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "dias_pago_renta",
        "etiqueta": "¿Con cuántos días contará la persona que recibe los bienes para fines industriales en arrendamiento para pagar la renta, comenzando desde el primer día de cada mes?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "cobra_interes_mora",
        "etiqueta": "¿Se cobrará algún interés en caso de que no se pague la renta a tiempo?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes_mora",
        "etiqueta": "¿Cuál será la tasa de interés que se cobrará en caso de incumplimiento en el pago de la renta?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "cobra_interes_mora",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "requiere_deposito",
        "etiqueta": "¿Será necesario que se entregue cierta cantidad de dinero como depósito para el caso de cualquier incumplimiento?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "monto_deposito",
        "etiqueta": "¿Qué cantidad se deberá entregar como depósito?",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "requiere_deposito",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El contrato se celebrará por: ¿tiempo específico o tiempo indeterminado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Tiempo específico",
          "Tiempo indeterminado"
        ]
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará la vigencia del contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Tiempo específico"
        }
      }
    ]
  },
  "arrendamiento-vacacional": {
    "nombre": "Contrato de Arrendamiento Vacacional",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "La persona que dará el bien en arrendamiento es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo de la persona que dará un bien para vacación en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_arrendador",
        "etiqueta": "¿Cuál es el domicilio de la persona que dará el bien para vacación en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "La persona que recibirá el bien para vacación en arrendamiento es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá el bien para vacación en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "domicilio_bien",
        "etiqueta": "¿Cuál es el domicilio donde se ubica el bien para vacación que se dará en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "estado_civil_arrendador",
        "etiqueta": "La persona que dará en arrendamiento el bien para vacación:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "No está casado y es único dueño del inmueble",
          "No está casado y es dueño de las bodegas junto con otras personas",
          "Se encuentra casado bajo el régimen de sociedad conyugal",
          "Se encuentra casado bajo el régimen de bienes separados"
        ]
      },
      {
        "clave": "renta_diaria",
        "etiqueta": "¿A qué cantidad ascenderá la renta diaria que se pagará por el hospedaje? (especificar moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "incluye_alimentos",
        "etiqueta": "¿La renta que se pagará incluirá alimentos?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "horario_alimentos",
        "etiqueta": "¿En qué horario se podrán tomar los alimentos?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "incluye_alimentos",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "numero_dias",
        "etiqueta": "¿Por cuántos días se hospedará la persona que recibe el bien en arrendamiento?",
        "tipo": "numero",
        "obligatorio": true
      }
    ]
  },
  "autorizacion-subarrendar-negocios": {
    "nombre": "Autorización para Subarrendar",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "La persona que realiza la autorización (arrendador) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo de la persona que realiza la autorización? (el arrendador)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_contrato",
        "etiqueta": "¿En qué fecha se celebró el contrato de arrendamiento?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_bien",
        "etiqueta": "Describe el bien que se dio en arrendamiento:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "domicilio_bien",
        "etiqueta": "Indica el domicilio donde se ubica el bien que se dio en arrendamiento:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "La persona que es autorizada para subarrendar (arrendatario) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que es autorizada para subarrendar? (arrendatario)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_arrendatario",
        "etiqueta": "¿Cuál es el domicilio de la persona que es autorizada? (arrendatario)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "incluir_info_adicional",
        "etiqueta": "¿Deseas incluir alguna nota o información adicional a la notificación?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "info_adicional",
        "etiqueta": "Información adicional que desea incluir (texto libre):",
        "tipo": "parrafo",
        "obligatorio": false,
        "depende_de": {
          "clave_padre": "incluir_info_adicional",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "ciudad_elaboracion",
        "etiqueta": "¿En qué ciudad se elabora la autorización?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_elaboracion",
        "etiqueta": "¿En qué fecha se elabora la autorización?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "autorizacion-subarrendar": {
    "nombre": "Autorización para Subarrendar",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la república.",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "La persona que realiza la autorización (arrendador) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que realiza la autorización? (arrendador)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendador",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que realiza la autorización? (arrendador)",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "fecha_contrato",
        "etiqueta": "¿En qué fecha se celebró el contrato de arrendamiento?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_bien",
        "etiqueta": "Describe el bien que se dio en arrendamiento:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "domicilio_bien",
        "etiqueta": "Indica el domicilio del bien que se dio en arrendamiento:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "La persona que es autorizada para subarrendar (arrendatario) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que es autorizada para subarrendar? (arrendatario)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_arrendatario",
        "etiqueta": "¿Cuál es el domicilio de la persona que es autorizada? (arrendatario)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "incluir_info_adicional",
        "etiqueta": "¿Deseas incluir alguna nota o información adicional a la autorización?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "ciudad_elaboracion",
        "etiqueta": "¿En qué ciudad se elabora la autorización?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_elaboracion",
        "etiqueta": "¿En qué fecha se elabora la autorización?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "aviso-privacidad": {
    "nombre": "Aviso de Privacidad",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la república.",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "nombre_responsable",
        "etiqueta": "¿Cómo se llama la persona, empresa o entidad que emite el aviso de privacidad?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_responsable",
        "etiqueta": "¿Cuál es el domicilio de la persona que emite el aviso de privacidad?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "datos_personales_recabados",
        "etiqueta": "Determina los datos personales que se recabarán:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "fines_primarios",
        "etiqueta": "Determina los fines para los que se recaban los datos personales:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "contacto_responsable",
        "etiqueta": "Proporcione información de contacto de la persona que recabará Datos Personales (número de teléfono, horario de atención y dirección de correo electrónico):",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "usa_fines_secundarios",
        "etiqueta": "¿Se utilizarán los datos personales para finalidades secundarias o accesorias, es decir, para fines que no sean estrictamente necesarios para el servicio que se solicita?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "fines_secundarios",
        "etiqueta": "Determina los fines secundarios o accesorios para los que se recabarán datos personales:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "usa_fines_secundarios",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "fines_mercadotecnicos",
        "etiqueta": "Dentro de los fines secundarios o accesorios, para los que se utilizarán datos personales, ¿se incluyen fines mercadotécnicos, publicitarios y/o de prospección comercial?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "usa_fines_secundarios",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "datos_financieros",
        "etiqueta": "¿La persona que recabará datos personales, obtendrá aquellos de carácter financiero y/o patrimonial?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "transfiere_terceros",
        "etiqueta": "¿La persona que recabará datos personales transferirá los mismos a terceros?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "ambito_transferencia",
        "etiqueta": "La transferencia de datos personales se realizará a personas:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "dentro del país",
          "dentro y fuera del país",
          "fuera del país"
        ],
        "depende_de": {
          "clave_padre": "transfiere_terceros",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "destinatarios_transferencia",
        "etiqueta": "Escribe el nombre de la persona(s), empresa(s) y/o entidad(es) a las que se les transferirán datos personales:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "transfiere_terceros",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "fines_transferencia",
        "etiqueta": "Determina los fines para los que se transfieren los datos personales a terceros:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "transfiere_terceros",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "usa_cookies",
        "etiqueta": "¿La persona que recaba datos personales utiliza cookies, o cualquier tecnología similar, en su página de Internet, a través de las cuales se monitoree el comportamiento de los usuarios y se recabe información de los mismos?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "medio_aviso_cambios",
        "etiqueta": "¿De qué manera la persona que recaba datos personales dará aviso de cualquier cambio, modificación o actualización al aviso de privacidad?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_aviso",
        "etiqueta": "¿Qué tipo de aviso de privacidad desea redactar?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aviso de privacidad impreso",
          "Aviso de privacidad web"
        ]
      }
    ]
  },
  "carta-confidencialidad-empleados-negocios": {
    "nombre": "Carta de Confidencialidad para Empleados",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_patron",
        "etiqueta": "El patrón a quien se dirige la carta de confidencialidad es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_patron",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) del patrón a quien se dirige la carta de confidencialidad?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_patron",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal del patrón a quien se dirige la carta de confidencialidad?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_patron",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_patron",
        "etiqueta": "¿Cuál es el domicilio del patrón a quien se dirige la carta de confidencialidad?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_empleado",
        "etiqueta": "¿Cuál es el nombre completo del trabajador que firmará la carta de confidencialidad?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará la carta de confidencialidad:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará la carta de confidencialidad:",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "carta-confidencialidad-empleados": {
    "nombre": "Carta de Confidencialidad para Empleados",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_patron",
        "etiqueta": "El patrón a quien se dirige la carta de confidencialidad es: ¿persona física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_patron",
        "etiqueta": "¿Cuál es el nombre completo del patrón a quien se dirige la carta de confidencialidad?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_patron",
        "etiqueta": "¿Cuál es el domicilio del patrón a quien se dirige la carta de confidencialidad?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_empleado",
        "etiqueta": "¿Cuál es el nombre completo del trabajador que firmará la carta de confidencialidad?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará la carta de confidencialidad:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará la carta de confidencialidad:",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "carta-instruccion-fe-hechos-negocios": {
    "nombre": "Carta de Instrucción de Fe de Hechos",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_solicitante",
        "etiqueta": "La persona que solicita la fe de hechos es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_solicitante",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que solicita la fe de hechos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_solicitante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que solicita la fe de hechos?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_solicitante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_notario",
        "etiqueta": "¿Cómo se llama el notario público que realizará la fe de hechos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_notaria",
        "etiqueta": "¿Cuál es el domicilio de la notaría pública?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_diligencia",
        "etiqueta": "Indica el domicilio donde se llevará a cabo la fe de hechos:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_diligencia",
        "etiqueta": "Indica la fecha en la que se llevará a cabo la fe de hechos:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "horario_diligencia",
        "etiqueta": "Indica el horario en el que se llevará a cabo la fe de hechos:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "objeto_fe_hechos",
        "etiqueta": "Indica en qué consistirá la fe de hechos:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Cobranza/requerimiento de pago",
          "Pago de algún adeudo",
          "Notificación por escrito/entrega de un documento",
          "Otro"
        ]
      },
      {
        "clave": "nombre_pagador",
        "etiqueta": "Indica el nombre de la persona que realizará el pago:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "objeto_fe_hechos",
          "valor_que_activa": "Pago de algún adeudo"
        }
      },
      {
        "clave": "nombre_beneficiario_pago",
        "etiqueta": "Indica el nombre de la persona a quien se le pagará el adeudo:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "objeto_fe_hechos",
          "valor_que_activa": "Pago de algún adeudo"
        }
      },
      {
        "clave": "motivo_pago",
        "etiqueta": "Indica el motivo del pago del adeudo:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "objeto_fe_hechos",
          "valor_que_activa": "Pago de algún adeudo"
        }
      },
      {
        "clave": "nombre_requirente",
        "etiqueta": "Indica el nombre de la persona que realizará el requerimiento de pago:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "objeto_fe_hechos",
          "valor_que_activa": "Cobranza/requerimiento de pago"
        }
      },
      {
        "clave": "nombre_requerido",
        "etiqueta": "Indica el nombre de la persona a quien se le exigirá el pago:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "objeto_fe_hechos",
          "valor_que_activa": "Cobranza/requerimiento de pago"
        }
      },
      {
        "clave": "motivo_cobranza",
        "etiqueta": "Indica el motivo de la cobranza / requerimiento de pago:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "objeto_fe_hechos",
          "valor_que_activa": "Cobranza/requerimiento de pago"
        }
      },
      {
        "clave": "nota_adicional",
        "etiqueta": "¿Deseas incluir alguna nota o información adicional a la notificación?",
        "tipo": "parrafo",
        "obligatorio": false
      },
      {
        "clave": "ciudad_elaboracion",
        "etiqueta": "¿En qué ciudad se elabora la solicitud de fe de hechos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_elaboracion",
        "etiqueta": "¿En qué fecha se elabora la solicitud de fe de hechos?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "carta-instruccion-fe-hechos": {
    "nombre": "Carta de Instrucción de Fe de Hechos",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_solicitante",
        "etiqueta": "La persona que solicita la fe de hechos es: ¿moral o física?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_solicitante",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que solicita la fe de hechos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_solicitante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que solicita la fe de hechos?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_solicitante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_notario",
        "etiqueta": "¿Cómo se llama el notario público que realizará la fe de hechos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_notaria",
        "etiqueta": "¿Cuál es el domicilio de la notaría pública?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_fe_hechos",
        "etiqueta": "Indica el domicilio donde se llevará a cabo la fe de hechos:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_fe_hechos",
        "etiqueta": "Indica la fecha en la que se llevará a cabo la fe de hechos:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "horario_fe_hechos",
        "etiqueta": "Indica el horario en el que se llevará a cabo la fe de hechos:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_fe_hechos",
        "etiqueta": "Indica en qué consistirá la fe de hechos: cobranza, por algún adeudo, notificación por escrito, otro.",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_requirente",
        "etiqueta": "Indica el nombre de la persona que realizará el requerimiento de pago:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_requerido",
        "etiqueta": "Indica el nombre de la persona a quien se le exigirá el pago:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "motivo_cobranza",
        "etiqueta": "Indica el motivo de la cobranza / requerimiento de pago:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "nota_adicional",
        "etiqueta": "¿Deseas incluir alguna nota o información adicional a la notificación?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "texto_nota_adicional",
        "etiqueta": "Escribe la nota o información adicional que deseas incluir:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "nota_adicional",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "lugar_elaboracion",
        "etiqueta": "¿En qué ciudad se elabora la solicitud de fe de hechos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_elaboracion",
        "etiqueta": "¿En qué fecha se elabora la solicitud de fe de hechos?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "carta-intencion-compra-inmueble": {
    "nombre": "Carta de Intención de Compra de Inmueble",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_remitente",
        "etiqueta": "La persona que envía la carta es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_remitente",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que envía la carta?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_remitente",
        "etiqueta": "¿Cuál es el nombre completo del representante de la persona que envía la carta?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_remitente",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "tipo_destinatario",
        "etiqueta": "La persona que recibe la carta es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_destinatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona a quien se envía la carta?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_destinatario",
        "etiqueta": "¿Cuál es el domicilio de la persona a quien se dirige la carta?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En qué lugar se firma la carta?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "¿En qué fecha se firma la carta?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_inmueble",
        "etiqueta": "Describe el bien inmueble que se desea adquirir:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "hace_oferta",
        "etiqueta": "¿La persona que envía la carta desea realizar alguna oferta respecto de la compra del bien inmueble?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "monto_oferta",
        "etiqueta": "¿Qué cantidad ofrece la persona que envía la carta por el bien que desea adquirir? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "hace_oferta",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "carta-pension-alimenticia": {
    "nombre": "Carta Exigiendo el Pago de Pensión Alimenticia",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "nombre_acreedor_alimenticio",
        "etiqueta": "¿Cuál es el nombre de la persona que envía la carta?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_deudor_alimenticio",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibe la carta?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_deudor_alimenticio",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibirá la carta?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_emision",
        "etiqueta": "¿En qué lugar se emite la carta?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_emision",
        "etiqueta": "¿En qué fecha se emite la carta?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tiene_resolucion_judicial",
        "etiqueta": "¿Existe alguna resolución judicial que haya determinado el pago de una pensión alimenticia por parte de la persona que recibe la carta?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "datos_juicio",
        "etiqueta": "Describe los datos de identificación del juicio correspondiente, incluyendo número de expediente, juzgado, ciudad y estado:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tiene_resolucion_judicial",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "porcentaje_pension",
        "etiqueta": "¿Qué porcentaje de los ingresos mensuales de la persona que recibe la carta se exige como pago de pensión?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "relacion_partes",
        "etiqueta": "¿Qué relación tiene la persona que emite la carta con la que la recibe?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "otras_personas_pension",
        "etiqueta": "¿Existen otras personas a quien se les deba pagar pensión alimenticia, adicionales a la persona que envía la carta?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "nombres_otros_beneficiarios",
        "etiqueta": "Indica el nombre de las personas a quienes se les debe pagar una pensión alimenticia:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "otras_personas_pension",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "forma_pago_pension",
        "etiqueta": "Describe de qué forma se deberá pagar la pensión alimenticia:",
        "tipo": "texto",
        "obligatorio": true
      }
    ]
  },
  "carta-poder-negocios": {
    "nombre": "Carta Poder",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_otorgante",
        "etiqueta": "La persona que otorga el poder es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_otorgante",
        "etiqueta": "¿Cuál es el nombre o denominación de quien otorga el poder?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_otorgante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la empresa que otorga el poder?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_otorgante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "caracter_representante",
        "etiqueta": "El representante de la persona moral (empresa o asociación) que otorgará el poder es:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Apoderado legal",
          "Funcionario con facultades suficientes"
        ],
        "depende_de": {
          "clave_padre": "tipo_otorgante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_otorgante",
        "etiqueta": "¿Cuál es el domicilio de quien otorga el poder?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_apoderado",
        "etiqueta": "¿Cuál es el nombre completo de la persona a quien se le otorga el poder?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_apoderado",
        "etiqueta": "¿Cuál es el domicilio de la persona a quien se le otorga el poder?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará la carta poder:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará la carta poder:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tramite_gestion",
        "etiqueta": "¿Para qué trámite o gestión se otorga el poder?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "institucion_tramite",
        "etiqueta": "Proporciona el nombre completo de la institución, autoridad o persona ante la cual se realizará el trámite o gestión para el que se requiere la carta poder:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "vigencia_fecha_especifica",
        "etiqueta": "¿Desea que la carta poder esté vigente hasta alguna fecha específica?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará la vigencia del poder?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "vigencia_fecha_especifica",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "nombre_testigo1",
        "etiqueta": "¿Cuál es el nombre de uno de los testigos que firmará la carta poder?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_testigo1",
        "etiqueta": "¿Cuál es el domicilio del primer testigo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_testigo2",
        "etiqueta": "¿Cuál es el nombre del segundo testigo que firmará la carta poder?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_testigo2",
        "etiqueta": "¿Cuál es el domicilio del segundo testigo?",
        "tipo": "texto",
        "obligatorio": true
      }
    ]
  },
  "carta-poder": {
    "nombre": "Carta Poder",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_otorgante",
        "etiqueta": "La persona que otorga el poder es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_otorgante",
        "etiqueta": "¿Cuál es el nombre de quien otorga el poder? (nombre completo o denominación social)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_otorgante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la empresa que otorga el poder?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_otorgante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "caracter_representante",
        "etiqueta": "El representante de la persona moral (empresa o asociación) que otorgará el poder es:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Funcionario con facultades suficientes",
          "Apoderado legal"
        ],
        "depende_de": {
          "clave_padre": "tipo_otorgante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_otorgante",
        "etiqueta": "¿Cuál es el domicilio de quien otorga el poder?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_apoderado",
        "etiqueta": "¿Cuál es el nombre completo de la persona a quien se le otorga el poder?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_apoderado",
        "etiqueta": "¿Cuál es el domicilio de la persona a quien se le otorga el poder?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará la carta poder.",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en la que se firmará la carta poder.",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tramite_gestion",
        "etiqueta": "¿Para qué trámite o gestión se otorga el poder?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "institucion_tramite",
        "etiqueta": "Nombre completo de la institución, autoridad o persona ante la cual se realizará el trámite o gestión para el que se requiere la carta poder:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "vigencia_fecha_especifica",
        "etiqueta": "¿Desea que la carta poder esté vigente hasta alguna fecha específica?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará la vigencia del poder?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "vigencia_fecha_especifica",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "nombre_testigo1",
        "etiqueta": "¿Cuál es el nombre de uno de los testigos que firmará la carta poder?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_testigo1",
        "etiqueta": "¿Cuál es el domicilio del primer testigo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_testigo2",
        "etiqueta": "¿Cuál es el nombre del segundo testigo que firmará la carta poder?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_testigo2",
        "etiqueta": "¿Cuál es el domicilio del segundo testigo?",
        "tipo": "texto",
        "obligatorio": true
      }
    ]
  },
  "carta-renuncia-voluntaria-negocios": {
    "nombre": "Carta de Renuncia Voluntaria",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_patron",
        "etiqueta": "El patrón a quien se dirige la carta renuncia es: ¿persona física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_patron",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) del patrón a quien se dirige la carta renuncia?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_patron",
        "etiqueta": "¿Cuál es el nombre del representante legal de la empresa a quien se dirige la carta renuncia?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_patron",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_patron",
        "etiqueta": "¿Cuál es el domicilio del patrón a quien se dirige la carta renuncia?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_trabajador",
        "etiqueta": "¿Cuál es el nombre completo del trabajador que firma la carta renuncia?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_celebracion",
        "etiqueta": "Lugar en que se celebrará la carta renuncia:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará la carta renuncia:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "puesto_trabajador",
        "etiqueta": "¿Qué puesto desempeñaba la persona que renuncia?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_inicio_labores",
        "etiqueta": "¿En qué fecha comenzó a laborar el trabajador que firma la carta renuncia?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "carta-renuncia-voluntaria": {
    "nombre": "Carta de Renuncia Voluntaria",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_patron",
        "etiqueta": "El patrón a quien se dirige la carta renuncia es: ¿persona física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_patron",
        "etiqueta": "¿Cuál es el nombre completo del patrón a quien se dirige la carta?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_patron",
        "etiqueta": "¿Cuál es el nombre del representante legal de la empresa a quien se dirige la carta renuncia?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_patron",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_patron",
        "etiqueta": "¿Cuál es el domicilio del patrón a quien se dirige la carta renuncia?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_trabajador",
        "etiqueta": "¿Cuál es el nombre completo del trabajador que firma la carta renuncia?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_celebracion",
        "etiqueta": "Lugar en que se celebrará la carta renuncia:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará la carta renuncia:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "puesto_trabajador",
        "etiqueta": "¿Qué puesto desempeñaba la persona que renuncia?",
        "tipo": "texto",
        "obligatorio": true
      }
    ]
  },
  "comision-mercantil": {
    "nombre": "Contrato de Comisión Mercantil",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_comitente",
        "etiqueta": "La persona que encargará las actividades comerciales es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comitente",
        "etiqueta": "¿Cuál es el nombre completo de la empresa (denominación social) que encargará las actividades comerciales?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_comitente",
        "etiqueta": "¿Cuál es el nombre completo de la persona que representará a la persona que encargará las actividades comerciales?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comitente",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_comitente",
        "etiqueta": "¿Cuál es el domicilio de la persona que encargará las actividades comerciales?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_comisionista",
        "etiqueta": "La persona que realizará las actividades comerciales es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comisionista",
        "etiqueta": "¿Cuál es el nombre completo de la persona que realizará las actividades comerciales?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_comisionista",
        "etiqueta": "¿Cuál es el nombre completo de la persona que representará a la persona que realizará las actividades comerciales?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comisionista",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_comisionista",
        "etiqueta": "¿Cuál es el domicilio de la persona que realizará las actividades comerciales?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En dónde se firmará el contrato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "¿En qué fecha se firmará el contrato?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "actividades_comision",
        "etiqueta": "¿Qué actividades comerciales se realizarán?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "porcentaje_comision",
        "etiqueta": "¿Qué porcentaje de los ingresos se entregará como pago a la persona que realizará la comisión?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "La vigencia del presente Contrato será: ¿hasta una fecha específica o por tiempo indefinido?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Fecha específica",
          "Tiempo indefinido"
        ]
      },
      {
        "clave": "fecha_fin_contrato",
        "etiqueta": "¿En qué fecha terminará el contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Fecha específica"
        }
      },
      {
        "clave": "terminacion_anticipada_si",
        "etiqueta": "¿Podrán las partes terminar anticipadamente el contrato mediante notificación previa enviada a la otra parte?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  },
  "comodato-bien-inmueble": {
    "nombre": "Contrato de Comodato Bien Inmueble",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_comodante",
        "etiqueta": "La persona que dará el bien en comodato es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comodante",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que dará en comodato el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_comodante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que dará el bien inmueble en comodato?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comodante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_comodante",
        "etiqueta": "¿Cuál es el domicilio de la persona que dará el bien inmueble en comodato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_comodatario",
        "etiqueta": "La persona que recibirá el bien inmueble en comodato es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comodatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá el bien inmueble en comodato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_comodatario",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que recibirá el bien inmueble en comodato?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comodatario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "domicilio_inmueble",
        "etiqueta": "¿Cuál es el domicilio donde se ubica el inmueble que se dará en comodato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "estado_civil_comodante",
        "etiqueta": "La persona que dará en comodato el bien inmueble:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "No está casado y es único dueño del inmueble.",
          "No está casado y es dueño de las bodegas junto con otras personas.",
          "Se encuentra casado bajo el régimen de sociedad conyugal.",
          "Se encuentra casado bajo el régimen de bienes separados."
        ]
      },
      {
        "clave": "uso_inmueble",
        "etiqueta": "¿A qué se deberá destinar el uso del bien inmueble que se dará en comodato?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "requiere_deposito",
        "etiqueta": "¿Se entregará cierta cantidad de dinero como depósito para reparaciones por daños en el Inmueble, ocasionados por la persona que recibe el bien?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "monto_deposito",
        "etiqueta": "¿Qué cantidad se deberá entregar como depósito?",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "requiere_deposito",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El contrato se celebrará por: ¿tiempo específico o tiempo indeterminado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Tiempo específico",
          "Tiempo indeterminado"
        ]
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará la vigencia del contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Tiempo específico"
        }
      },
      {
        "clave": "requiere_seguro",
        "etiqueta": "¿Deberá la persona que recibe el bien en comodato contratar un seguro que cubra cualquier daño ocasionado al inmueble?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  },
  "comodato-bien-mueble-negocios": {
    "nombre": "Contrato de Comodato Bien Mueble",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_comodante",
        "etiqueta": "La persona que dará el bien en comodato es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comodante",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que dará en comodato el bien mueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_comodante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que dará el bien mueble en comodato?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comodante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_comodante",
        "etiqueta": "¿Cuál es el domicilio de la persona que dará el bien mueble en comodato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_comodatario",
        "etiqueta": "La persona que recibirá el bien mueble en comodato es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comodatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá el bien mueble en comodato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_comodatario",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que recibirá el bien mueble en comodato?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comodatario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_comodatario",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibe el bien en comodato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_bien",
        "etiqueta": "Describe el o los bienes muebles que se darán en comodato:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "uso_bien",
        "etiqueta": "¿A qué se deberá destinar el uso del bien mueble que se dará en comodato?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "requiere_deposito",
        "etiqueta": "¿Se entregará cierta cantidad de dinero como depósito para reparaciones por daños en el bien, ocasionados por la persona que recibe el bien?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "monto_deposito",
        "etiqueta": "¿Qué cantidad se deberá entregar como depósito?",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "requiere_deposito",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El contrato se celebrará por: ¿tiempo específico o tiempo indeterminado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Tiempo específico",
          "Tiempo indeterminado"
        ]
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará la vigencia del contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Tiempo específico"
        }
      },
      {
        "clave": "contratara_seguro",
        "etiqueta": "¿Deberá la persona que recibe el bien en comodato contratar un seguro que cubra cualquier daño ocasionado al mueble?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  },
  "comodato-bien-mueble": {
    "nombre": "Contrato de Comodato Bien Mueble",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_comodante",
        "etiqueta": "La persona que dará el bien en comodato es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comodante",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que dará en comodato el bien mueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_comodante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que dará el bien mueble en comodato?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comodante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_comodante",
        "etiqueta": "¿Cuál es el domicilio de la persona que dará el bien mueble en comodato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_comodatario",
        "etiqueta": "La persona que recibirá el bien mueble en comodato es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_representante_comodatario",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que recibirá el bien mueble en comodato?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comodatario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_comodatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá el bien mueble en comodato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_comodatario",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibe el bien comodato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_bien",
        "etiqueta": "Describe el o los bienes muebles que se darán en comodato:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "uso_bien",
        "etiqueta": "¿A qué se deberá destinar el uso del bien mueble que se dará en comodato?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "deposito_si",
        "etiqueta": "¿Se entregará cierta cantidad de dinero como depósito para reparaciones por daños en el bien, ocasionados por la persona que recibe el bien?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "monto_deposito",
        "etiqueta": "¿Qué cantidad se deberá entregar como depósito? (tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "deposito_si",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El contrato se celebrará por: ¿tiempo indeterminado o tiempo específico?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Tiempo indeterminado",
          "Tiempo específico"
        ]
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará la vigencia del contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Tiempo específico"
        }
      },
      {
        "clave": "seguro_si",
        "etiqueta": "¿Deberá la persona que recibe el bien en comodato contratar un seguro que cubra cualquier daño ocasionado al mueble?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  },
  "compraventa-acciones": {
    "nombre": "Contrato de Compraventa de Acciones",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_vendedor",
        "etiqueta": "El vendedor es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_vendedor",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que venderá las acciones?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_vendedor",
        "etiqueta": "¿Cuál es el nombre completo del representante de la persona que venderá las acciones?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vendedor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_vendedor",
        "etiqueta": "¿Cuál es el domicilio de la persona que venderá las acciones?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "regimen_propiedad_vendedor",
        "etiqueta": "La persona que venderá las acciones:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "No se encuentra casado y es el único dueño de las acciones",
          "No se encuentra casado y es dueño de las acciones junto con otras personas",
          "Se encuentra casado bajo el régimen de bienes separados",
          "Se encuentra casado bajo el régimen de sociedad conyugal"
        ]
      },
      {
        "clave": "nombres_otros_propietarios_acciones",
        "etiqueta": "Indica el nombre completo de las otras personas que son propietarias de las acciones",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "regimen_propiedad_vendedor",
          "valor_que_activa": "No se encuentra casado y es dueño de las acciones junto con otras personas"
        }
      },
      {
        "clave": "tipo_comprador",
        "etiqueta": "El comprador es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comprador",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que comprará las acciones?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_comprador",
        "etiqueta": "¿Cuál es el nombre completo del representante de la persona que comprará las acciones?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comprador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_comprador",
        "etiqueta": "¿Cuál es el domicilio de la persona que comprará las acciones?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se celebrará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se resolverán dichas controversias?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_sociedad",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la sociedad anónima de la que se transmiten acciones?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "representante_sociedad",
        "etiqueta": "¿Cuál es el nombre completo de la persona que representará a la sociedad anónima de la que se venden acciones?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "numero_acciones",
        "etiqueta": "Determine el número de acciones que se venderán:",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "tiene_clase_serie",
        "etiqueta": "¿Las acciones que se venderán pertenecen a una clase o serie de acciones específica?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "clase_serie_acciones",
        "etiqueta": "Determine las clases y series a las que pertenecen las acciones:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tiene_clase_serie",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "aprobacion_asamblea",
        "etiqueta": "Determine si la transmisión de las acciones fue previamente aprobada mediante una Asamblea de Accionistas:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tipo_asamblea",
        "etiqueta": "Determine qué tipo de asamblea aprobó la transmisión de acciones:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Asamblea General Ordinaria de accionistas",
          "Asamblea especial de accionistas"
        ],
        "depende_de": {
          "clave_padre": "aprobacion_asamblea",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "fecha_asamblea",
        "etiqueta": "Especifique la fecha en la que se celebró la Asamblea de Accionistas que aprobó la venta de las acciones.",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "aprobacion_asamblea",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "precio_acciones",
        "etiqueta": "¿Cuánto se pagará por la compra de las acciones? (especifica el tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "modalidad_pago",
        "etiqueta": "Determine cuándo se pagará el precio por la venta de las acciones:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "En el acto de celebración del contrato",
          "En fecha específica",
          "En dos o más pagos"
        ]
      },
      {
        "clave": "fecha_pago",
        "etiqueta": "¿En qué fecha se pagará el precio por la venta de las acciones?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "modalidad_pago",
          "valor_que_activa": "En fecha específica"
        }
      },
      {
        "clave": "tiene_garantia",
        "etiqueta": "¿Las acciones que se venden cuentan con alguna garantía?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "descripcion_garantia",
        "etiqueta": "Describe la garantía que tienen las acciones que se venderán:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tiene_garantia",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "incluir_pena_convencional",
        "etiqueta": "¿Deberá pagar el comprador alguna cantidad de dinero al vendedor como castigo o pena convencional en caso de incumplimiento?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "porcentaje_pena_convencional",
        "etiqueta": "¿Qué porcentaje del precio se deberá pagar como castigo o pena convencional en caso de incumplimiento?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "incluir_pena_convencional",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "dias_pago_pena",
        "etiqueta": "¿En cuántos días deberá el comprador pagar la pena convencional, a partir de la fecha en que el vendedor se lo requiera?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "incluir_pena_convencional",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "causar_intereses",
        "etiqueta": "¿Se causarán intereses por retrasos en el pago del precio por la compra de las acciones?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes",
        "etiqueta": "¿Qué porcentaje como tasa de interés se aplicaría sobre el adeudo no pagado, por retrasos en el pago de dicho adeudo?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "causar_intereses",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "compraventa-bien-inmueble": {
    "nombre": "Contrato de Compraventa de Bien Inmueble",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_vendedor",
        "etiqueta": "La persona que venderá el bien inmueble es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_vendedor",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que venderá el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_vendedor",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que venderá el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vendedor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_vendedor",
        "etiqueta": "¿Cuál es el domicilio de la persona que venderá el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_comprador",
        "etiqueta": "La persona que comprará el bien inmueble es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comprador",
        "etiqueta": "¿Cuál es el nombre completo de la persona que comprará el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_comprador",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que comprará el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comprador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "domicilio_comprador",
        "etiqueta": "¿Cuál es el domicilio de la persona que comprará el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "estado_civil_vendedor",
        "etiqueta": "La persona que venderá el bien inmueble:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "No está casado y es único dueño del inmueble",
          "No está casado y es dueño del inmueble junto con otras personas",
          "Está casado bajo el régimen de bienes separados",
          "Está casado bajo el régimen de sociedad conyugal"
        ]
      },
      {
        "clave": "domicilio_inmueble",
        "etiqueta": "Determine el domicilio del bien inmueble que se venderá:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "precio_compraventa",
        "etiqueta": "Determine la contraprestación que se pagará por la compraventa del bien inmueble: (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "forma_pago",
        "etiqueta": "¿Cuándo se pagará el precio por la compra del bien inmueble?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "En un solo pago en fecha específica",
          "En dos pagos en fechas determinadas"
        ]
      },
      {
        "clave": "fecha_pago",
        "etiqueta": "¿En qué fecha se pagará el precio?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tiene_gravamen",
        "etiqueta": "¿El bien inmueble que se venderá tiene alguna garantía, carga o gravamen?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "descripcion_gravamen",
        "etiqueta": "Indica qué garantía tiene el bien inmueble que se venderá:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tiene_gravamen",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "pena_convencional_si",
        "etiqueta": "En caso de que el comprador incumpla cualquiera de sus obligaciones, ¿deberá pagar alguna pena convencional?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "porcentaje_pena_convencional",
        "etiqueta": "¿Qué porcentaje del adeudo se deberá pagar como pena convencional en caso de incumplimiento?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "pena_convencional_si",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El presente contrato de compraventa estará vigente:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Por un tiempo específico",
          "Hasta que el comprador cumpla todas sus obligaciones de pago"
        ]
      },
      {
        "clave": "meses_vigencia",
        "etiqueta": "¿Por cuántos meses estará vigente el presente Contrato?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Por un tiempo específico"
        }
      },
      {
        "clave": "cobra_interes_mora",
        "etiqueta": "¿Se generarán intereses en caso de retraso por parte del comprador en realizar algún pago?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes_mora",
        "etiqueta": "¿Qué porcentaje del adeudo se aplicará para calcular los intereses por retrasos en el pago del precio?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "cobra_interes_mora",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "compraventa-contado": {
    "nombre": "Contrato de Compraventa de Contado",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_vendedor",
        "etiqueta": "La parte que venderá el bien es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_vendedor",
        "etiqueta": "¿Cuál es el nombre de la persona moral (la denominación social) que venderá el bien? (la llamaremos Parte A)",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vendedor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_representante_vendedor",
        "etiqueta": "¿Cómo se llama el representante? (de la Parte A)",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vendedor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_vendedor",
        "etiqueta": "¿Cuál es el domicilio de la persona que venderá el bien?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_comprador",
        "etiqueta": "La parte que comprará el bien es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comprador",
        "etiqueta": "¿Cuál es el nombre completo de la persona que comprará el bien? (la llamaremos Parte B)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_comprador",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que comprará el bien?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comprador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_comprador",
        "etiqueta": "¿Cuál es el domicilio de la persona que comprará el bien?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En dónde firmarán el contrato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "¿En qué fecha se firmará el contrato?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_bien",
        "etiqueta": "¿Qué es lo que se va a vender? Describe brevemente el objeto o cosa que se venderá:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "precio_bien",
        "etiqueta": "¿Cuál es el precio final del bien que se venderá? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "iva_precio",
        "etiqueta": "¿Ese precio incluye I.V.A.?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Incluye el IVA",
          "Es ese precio más IVA",
          "No tomar en cuenta"
        ]
      },
      {
        "clave": "fecha_pago",
        "etiqueta": "¿En qué fecha se deberá pagar lo que se pretende vender?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "intereses_retraso",
        "etiqueta": "¿Se generarán intereses por retrasos en el pago?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes_mensual",
        "etiqueta": "¿Cuál es la tasa de interés mensual que se aplicará para calcular los intereses?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "intereses_retraso",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "momento_entrega",
        "etiqueta": "¿Cuándo le entregará la parte Vendedora a la parte Compradora lo que se vende?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "En fecha específica",
          "Cuando se pague en su totalidad"
        ]
      },
      {
        "clave": "fecha_entrega",
        "etiqueta": "¿En qué fecha se entregará el bien?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "momento_entrega",
          "valor_que_activa": "En fecha específica"
        }
      }
    ]
  },
  "compraventa-plazos": {
    "nombre": "Contrato de Compraventa a Plazos",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_vendedor",
        "etiqueta": "La parte que venderá el bien es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_vendedor",
        "etiqueta": "¿Cuál es el nombre de la persona moral (la denominación social) que venderá el bien?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vendedor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "representante_vendedor",
        "etiqueta": "¿Cómo se llama el representante de la parte vendedora?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vendedor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_vendedor",
        "etiqueta": "¿Cuál es el domicilio de la persona que venderá el bien?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_comprador",
        "etiqueta": "La parte que comprará el bien es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comprador",
        "etiqueta": "¿Cuál es el nombre completo de quién comprará el bien?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "representante_comprador",
        "etiqueta": "¿Cómo se llama el representante de la parte compradora?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comprador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_comprador",
        "etiqueta": "¿Cuál es el domicilio de la persona que comprará el bien?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En dónde firmarán el contrato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "¿En qué fecha se firmará el contrato?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_bien",
        "etiqueta": "¿Qué es lo que se va vender? Describe brevemente el objeto o cosa que se venderá.",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "precio_total",
        "etiqueta": "¿Cuál es el precio final del bien que se venderá? (especificar moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "incluye_iva",
        "etiqueta": "¿Ese precio incluye I.V.A.?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí, incluye I.V.A.",
          "Ese precio más I.V.A.",
          "No tomar en cuenta"
        ]
      },
      {
        "clave": "tabla_pagos",
        "etiqueta": "¿En cuántos pagos el Comprador deberá pagar el precio total del bien que se pretende vender? (Indica fecha de pago, monto a pagar y concepto por cada parcialidad)",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "genera_intereses",
        "etiqueta": "¿Se generarán intereses por retrasos en el pago?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes",
        "etiqueta": "¿Cuál es la tasa de interés que se aplicará para calcular los intereses?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "genera_intereses",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "momento_entrega",
        "etiqueta": "¿Cuándo le entregará la parte Vendedora a la parte Compradora lo que se vende?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "En la fecha en que se pague el bien vendido",
          "En otra fecha"
        ]
      }
    ]
  },
  "compraventa-vehiculo": {
    "nombre": "Contrato de Compraventa de Vehículo",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_vendedor",
        "etiqueta": "La persona que vende el vehículo es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_vendedor",
        "etiqueta": "¿Cuál es el nombre completo de la persona que venderá el vehículo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_vendedor",
        "etiqueta": "¿Cuál es el domicilio de la persona que venderá el vehículo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_comprador",
        "etiqueta": "La persona que compra el vehículo es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comprador",
        "etiqueta": "¿Cuál es el nombre completo de la persona que comprará el vehículo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_comprador",
        "etiqueta": "¿Cuál es el domicilio de la persona que comprará el vehículo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "vendedor_casado",
        "etiqueta": "¿La persona que venderá el vehículo se encuentra casada?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "descripcion_vehiculo",
        "etiqueta": "Describa el(los) vehículo(s) que se venderá(n):",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "precio_vehiculo",
        "etiqueta": "¿Cuál es el precio por la compra del vehículo? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "forma_pago",
        "etiqueta": "¿En qué fechas y en qué plazos se pagará el precio por la compra del vehículo?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Un solo pago",
          "Parcialidades"
        ]
      },
      {
        "clave": "domicilio_entrega",
        "etiqueta": "Indique el domicilio de entrega del vehículo:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_entrega",
        "etiqueta": "¿Cuándo se entregará el vehículo?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "genera_intereses",
        "etiqueta": "¿Se generarán intereses por retrasos en el pago del precio?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "vigencia_contrato",
        "etiqueta": "El presente contrato estará vigente:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Tiempo determinado",
          "Hasta el pago del total de cantidades"
        ]
      },
      {
        "clave": "garantia_desperfectos",
        "etiqueta": "¿Se otorgará alguna garantía por desperfectos del vehículo a favor de la persona que lo adquiere?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "pena_convencional",
        "etiqueta": "¿Deberá pagar el comprador alguna cantidad de dinero al vendedor como castigo o pena convencional en caso de incumplimiento?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "porcentaje_pena",
        "etiqueta": "¿Qué porcentaje del adeudo se deberá pagar como pena convencional en caso de incumplimiento?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "pena_convencional",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "consignacion-mercantil": {
    "nombre": "Contrato de Consignación Mercantil",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_cliente",
        "etiqueta": "La parte que proveerá el bien (consignante) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_cliente",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la parte que proveerá el bien?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "pais_constitucion_cliente",
        "etiqueta": "¿En qué país se constituyó la parte que proveerá el bien?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_cliente",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "representante_cliente",
        "etiqueta": "¿Cuál es el nombre completo del representante legal de la parte que proveerá el bien?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_cliente",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "caracter_representante_cliente",
        "etiqueta": "El representante de la parte que proveerá el bien es:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Apoderado legal",
          "Funcionario con facultades suficientes"
        ],
        "depende_de": {
          "clave_padre": "tipo_cliente",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_cliente",
        "etiqueta": "¿Cuál es el domicilio de la parte que proveerá el bien para su venta?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_comercializadora",
        "etiqueta": "La persona que comercializará el bien es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comercializadora",
        "etiqueta": "¿Cuál es el nombre completo de la persona que comercializará el bien?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "representante_comercializadora",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la parte que comercializará el bien?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comercializadora",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nacionalidad_comercializadora",
        "etiqueta": "¿Cuál es la nacionalidad de la persona que comercializará el bien?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_comercializadora",
        "etiqueta": "¿Cuál es el domicilio de la persona que comercializará el bien?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se celebrará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se llevarán dichas controversias para su resolución?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "descripcion_bien",
        "etiqueta": "Describe brevemente el bien mueble que se entregará a la persona que lo comercializará:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "bien_asegurado",
        "etiqueta": "¿Tendrá la parte cliente la obligación de mantener el bien asegurado durante la vigencia del contrato?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "porcentaje_comision",
        "etiqueta": "¿Qué porcentaje del valor de la venta cobrará la persona que venderá el bien, como pago por sus servicios?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "precio_venta",
        "etiqueta": "¿Por cuánto se deberá vender el bien? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "dias_vigencia",
        "etiqueta": "¿Cuántos días estará vigente el contrato?",
        "tipo": "numero",
        "obligatorio": true
      }
    ]
  },
  "contrato-chofer-uber-negocios": {
    "nombre": "Contrato para Chofer Uber",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_prestataria",
        "etiqueta": "La persona que es dueña del vehículo es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_prestataria_fisica",
        "etiqueta": "¿Cuál es el nombre completo de la persona física propietaria del vehículo?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_prestataria",
          "valor_que_activa": "Física"
        }
      },
      {
        "clave": "nombre_prestataria",
        "etiqueta": "¿Cuál es la denominación social de la persona moral propietaria del vehículo?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_prestataria",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_representante_prestataria",
        "etiqueta": "¿Cuál es el nombre del representante del dueño del vehículo?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_prestataria",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_prestataria",
        "etiqueta": "¿Cuál es el domicilio de la persona propietaria del vehículo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_prestadora",
        "etiqueta": "¿Cuál es el nombre de la persona que prestará los servicios de transporte (chofer)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_prestadora",
        "etiqueta": "¿Cuál es el domicilio de la persona que prestará los servicios de transporte? (chofer)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "compania_transporte",
        "etiqueta": "¿Con qué compañía se prestarán los servicios de transporte privado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Uber",
          "Cabify"
        ]
      },
      {
        "clave": "modalidad_pago",
        "etiqueta": "¿Cómo se realizará el pago al chofer por los servicios de transporte?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Se le pagará cada mes un porcentaje de las ganancias acumuladas",
          "Se le pagará cada semana una cantidad específica de dinero",
          "Se le pagará cada mes una cantidad específica de dinero",
          "Se le pagará cada mes el remanente que resulte de restar una cantidad específica a las ganancias adquiridas en el mes"
        ]
      },
      {
        "clave": "porcentaje_ganancias",
        "etiqueta": "¿Qué porcentaje de las ganancias mensuales se pagará por los servicios de transporte?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "modalidad_pago",
          "valor_que_activa": "Se le pagará cada mes un porcentaje de las ganancias acumuladas"
        }
      },
      {
        "clave": "monto_pago_semanal",
        "etiqueta": "¿Cuánto le pagará semanalmente el dueño del vehículo al chofer por los servicios de transporte privado?",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "modalidad_pago",
          "valor_que_activa": "Se le pagará cada semana una cantidad específica de dinero"
        }
      },
      {
        "clave": "monto_pago_mensual",
        "etiqueta": "¿Cuánto le pagará mensualmente el dueño del vehículo al chofer por los servicios de transporte privado?",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "modalidad_pago",
          "valor_que_activa": "Se le pagará cada mes una cantidad específica de dinero"
        }
      },
      {
        "clave": "monto_resta_mensual",
        "etiqueta": "¿Qué cantidad se restará mensualmente a las ganancias? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "modalidad_pago",
          "valor_que_activa": "Se le pagará cada mes el remanente que resulte de restar una cantidad específica a las ganancias adquiridas en el mes"
        }
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El presente contrato tendrá una vigencia: ¿indeterminada o determinada?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Indeterminada",
          "Determinada"
        ]
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará la vigencia del contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Determinada"
        }
      },
      {
        "clave": "descripcion_vehiculo",
        "etiqueta": "Describe el vehículo con el que se prestarán los servicios de transporte privado:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "celular_para_chofer",
        "etiqueta": "¿El dueño del vehículo le dará un celular al chofer para poder prestar los servicios de transporte?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "descripcion_celular",
        "etiqueta": "Describe el celular que el dueño del vehículo le dará al chofer para prestar sus servicios:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "celular_para_chofer",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En qué lugar se celebrará el contrato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Indica la fecha de firma del contrato:",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "contrato-chofer-uber": {
    "nombre": "Contrato para Chofer Uber",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_prestataria",
        "etiqueta": "La persona dueña del vehículo (Parte Prestataria) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_prestataria",
        "etiqueta": "¿Cuál es la denominación social de la persona moral propietaria del vehículo?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_prestataria",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_representante_prestataria",
        "etiqueta": "¿Cuál es el nombre del representante del dueño del vehículo?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_prestataria",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_prestataria_fisica",
        "etiqueta": "¿Cuál es el nombre completo del dueño del vehículo?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_prestataria",
          "valor_que_activa": "Física"
        }
      },
      {
        "clave": "domicilio_prestataria",
        "etiqueta": "¿Cuál es el domicilio de la persona propietaria del vehículo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_prestadora",
        "etiqueta": "¿Cuál es el nombre completo de la persona que prestará los servicios de transporte (chofer)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_prestadora",
        "etiqueta": "¿Cuál es el domicilio de la persona que prestará los servicios de transporte (chofer)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "plataforma_transporte",
        "etiqueta": "¿Con qué compañía se prestarán los servicios de transporte privado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Uber",
          "Cabify"
        ]
      },
      {
        "clave": "periodicidad_pago",
        "etiqueta": "¿Cómo se realizará el pago al chofer por los servicios de transporte?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Mensual",
          "Semanal",
          "Quincenal"
        ]
      },
      {
        "clave": "porcentaje_pago",
        "etiqueta": "¿Qué porcentaje de las ganancias se pagará al chofer por los servicios de transporte?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El presente contrato tendrá una vigencia:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Determinada",
          "Indeterminada"
        ]
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará la vigencia del contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Determinada"
        }
      },
      {
        "clave": "descripcion_vehiculo",
        "etiqueta": "Describe el vehículo con el que se prestarán los servicios de transporte privado:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "da_celular",
        "etiqueta": "¿El dueño del vehículo le dará un celular al chofer para poder prestar los servicios de transporte?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "descripcion_celular",
        "etiqueta": "Describe el celular que el dueño del vehículo le dará al chofer para prestar sus servicios:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "da_celular",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En qué lugar se celebrará el contrato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Indica la fecha de firma del contrato:",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "contrato-confidencialidad-negocios": {
    "nombre": "Contrato de Confidencialidad",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_parte_a",
        "etiqueta": "LA PARTE A es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_parte_a",
        "etiqueta": "¿Cuál es la denominación social completa de la persona moral que contratará como PARTE A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nacionalidad_parte_a",
        "etiqueta": "¿Cuál es la nacionalidad de la Parte A? (persona física)",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Física"
        }
      },
      {
        "clave": "pais_constitucion_parte_a",
        "etiqueta": "¿Conforme a las leyes de qué país está constituida la sociedad o asociación que actuará como PARTE A?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_representante_parte_a",
        "etiqueta": "¿Cuál es el nombre completo del representante legal que firmará el contrato en representación de la sociedad o asociación que actuará como PARTE A?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "caracter_representante_parte_a",
        "etiqueta": "El representante de la sociedad o asociación que contratará como PARTE A es:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Apoderado legal",
          "Funcionario con facultades suficientes"
        ],
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_parte_a",
        "etiqueta": "¿Cuál es el domicilio de la PARTE A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_parte_b",
        "etiqueta": "La PARTE B es: ¿persona moral o física?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_parte_b",
        "etiqueta": "¿Cuál es el nombre completo de la persona que contratará como PARTE B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nacionalidad_parte_b",
        "etiqueta": "¿Cuál es la nacionalidad de la PARTE B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "pais_constitucion_parte_b",
        "etiqueta": "¿Conforme a las leyes de qué país está constituida la Parte B? (persona moral)",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_b",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_representante_parte_b",
        "etiqueta": "¿Cuál es el nombre completo del representante legal que firmará el contrato en representación de la PARTE B?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_b",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_parte_b",
        "etiqueta": "¿Cuál es el domicilio de la PARTE B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_celebracion",
        "etiqueta": "Lugar en que se celebrará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se llevarán dichas controversias para su resolución?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_fin_contrato",
        "etiqueta": "¿En qué fecha terminará el contrato?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "contrato-confidencialidad": {
    "nombre": "Contrato de Confidencialidad",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_parte_a",
        "etiqueta": "La PARTE A es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_parte_a",
        "etiqueta": "¿Cuál es la denominación social completa de la persona moral que contratará como PARTE A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nacionalidad_parte_a",
        "etiqueta": "¿Cuál es la nacionalidad de la Parte A? (persona física)",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Física"
        }
      },
      {
        "clave": "pais_constitucion_parte_a",
        "etiqueta": "¿Conforme a las leyes de qué país está constituida la sociedad o asociación que actuará como PARTE A?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "representante_parte_a",
        "etiqueta": "¿Cuál es el nombre completo del representante legal que firmará el contrato en representación de la PARTE A?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "caracter_representante_a",
        "etiqueta": "El representante de la PARTE A es:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Apoderado legal",
          "Funcionario con facultades suficientes"
        ],
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_parte_a",
        "etiqueta": "¿Cuál es el domicilio de la PARTE A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_parte_b",
        "etiqueta": "La PARTE B es: ¿moral o física?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_parte_b",
        "etiqueta": "¿Cuál es la denominación social completa de la persona moral que contratará como PARTE B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nacionalidad_parte_b",
        "etiqueta": "¿Cuál es la nacionalidad de la Parte B? (persona física)",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_b",
          "valor_que_activa": "Física"
        }
      },
      {
        "clave": "pais_constitucion_parte_b",
        "etiqueta": "¿Conforme a las leyes de qué país está constituida la sociedad o asociación que actuará como PARTE B?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_b",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "representante_parte_b",
        "etiqueta": "¿Cuál es el nombre completo del representante legal que firmará el contrato en representación de la PARTE B?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_b",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "caracter_representante_b",
        "etiqueta": "El representante de la PARTE B es:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Apoderado legal",
          "Persona con facultades suficientes"
        ],
        "depende_de": {
          "clave_padre": "tipo_parte_b",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_parte_b",
        "etiqueta": "¿Cuál es el domicilio de la PARTE B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se celebrará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se llevarán dichas controversias para su resolución?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará el contrato?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "contrato-empleada-domestica": {
    "nombre": "Contrato de Empleada Doméstica",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República.",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "nombre_empleador",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá los servicios domésticos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_empleador",
        "etiqueta": "¿Cuál es el domicilio de la parte a quien se le prestarán los servicios domésticos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_trabajador",
        "etiqueta": "¿Cómo se llama la persona que prestará los servicios domésticos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_trabajador",
        "etiqueta": "¿Cuál es el domicilio de la persona que prestará los servicios domésticos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_servicios",
        "etiqueta": "¿Cuál es el domicilio donde se prestarán los servicios?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar donde se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_servicios",
        "etiqueta": "Describe los servicios domésticos que se prestarán:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "forma_prestacion",
        "etiqueta": "Indica de qué forma se prestarán los servicios de limpieza domésticos:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "De planta",
          "De entrada por salida"
        ]
      },
      {
        "clave": "horas_diarias",
        "etiqueta": "Describe el número de horas diario de servicios domésticos de limpieza:",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "dias_semana",
        "etiqueta": "Indica cuántos días a la semana se prestarán los servicios domésticos de limpieza:",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "periodicidad_pago",
        "etiqueta": "¿Cómo se calculará el pago de los servicios domésticos?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Diario",
          "Semanal",
          "Quincenal",
          "Mensual"
        ]
      },
      {
        "clave": "monto_pago",
        "etiqueta": "¿Cuánto se le pagará por cada periodo de prestación de servicios domésticos?",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "vigencia_especifica",
        "etiqueta": "¿Se pactará alguna vigencia específica del contrato?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "meses_vigencia",
        "etiqueta": "¿Por cuántos meses estará vigente el contrato?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "vigencia_especifica",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "contrato-individual-trabajo-negocios": {
    "nombre": "Contrato Individual de Trabajo",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_patron",
        "etiqueta": "La Parte Empleadora (patrón) es: ¿persona física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "denominacion_patron",
        "etiqueta": "¿Cuál es la denominación social completa de la Parte Empleadora (patrón)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "pais_constitucion_patron",
        "etiqueta": "¿En qué país se constituyó la empresa que contrata (patrón)?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_patron",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_representante_patron",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la Parte Empleadora (patrón)?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_patron",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_patron",
        "etiqueta": "¿Cuál es el domicilio de la Parte Empleadora (patrón)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_trabajador",
        "etiqueta": "¿Cuál es el nombre completo de la persona que contratará como Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nacionalidad_trabajador",
        "etiqueta": "¿Cuál es la nacionalidad de la Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_trabajador",
        "etiqueta": "¿Cuál es el domicilio de la Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_celebracion",
        "etiqueta": "Lugar en que se celebrará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se llevarán dichas controversias para su resolución?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "ciudad_pais_trabajo",
        "etiqueta": "¿En qué ciudad y país trabajará la Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "puesto_trabajador",
        "etiqueta": "¿Cuál es el puesto o cargo que desempeñará la Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "servicios_trabajador",
        "etiqueta": "Describa los servicios o actividades que llevará a cabo la Parte Empleada (trabajador):",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "horas_jornada",
        "etiqueta": "¿De cuántas horas será la jornada laboral de la Parte Empleada (trabajador)?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "dias_trabajo",
        "etiqueta": "¿De qué día a qué día de la semana trabajará la Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "dias_descanso_semana",
        "etiqueta": "¿Cuántos días a la semana descansará la Parte Empleada (trabajador)?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "dias_descanso",
        "etiqueta": "¿Qué día(s) de la semana descansará la Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "salario_mensual",
        "etiqueta": "¿Cuál será el salario mensual neto que recibirá la Parte Empleada (trabajador) por sus servicios? Tipo de moneda.",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "periodicidad_pago",
        "etiqueta": "¿Cada cuánto será pagado el sueldo a la Parte Empleada (trabajador)?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Mensual",
          "Semanal",
          "Quincenal"
        ]
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "¿La vigencia del contrato terminará en alguna fecha específica o se celebrará por tiempo indeterminado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Fecha específica",
          "Tiempo indeterminado"
        ]
      },
      {
        "clave": "fecha_fin_contrato",
        "etiqueta": "¿En qué fecha terminará el contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Fecha específica"
        }
      },
      {
        "clave": "recibira_informacion_confidencial",
        "etiqueta": "¿Recibirá la Parte Empleada (trabajador) información confidencial de la Parte Empleadora (patrón) como consecuencia del desempeño de sus labores?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  },
  "contrato-individual-trabajo": {
    "nombre": "Contrato Individual de Trabajo",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_patron",
        "etiqueta": "La Parte Empleadora (patrón) es: ¿persona física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "denominacion_patron",
        "etiqueta": "¿Cuál es la denominación social completa de la Parte Empleadora (patrón)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "pais_constitucion_patron",
        "etiqueta": "¿En qué país se constituyó la empresa que contrata (patrón)?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_patron",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_representante_patron",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la Parte Empleadora (patrón)?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_patron",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_patron",
        "etiqueta": "¿Cuál es el domicilio de la Parte Empleadora (patrón)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_trabajador",
        "etiqueta": "¿Cuál es el nombre completo de la persona que contratará como Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nacionalidad_trabajador",
        "etiqueta": "¿Cuál es la nacionalidad de la Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_trabajador",
        "etiqueta": "¿Cuál es el domicilio de la Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_celebracion",
        "etiqueta": "Lugar en que se celebrará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se llevarán dichas controversias para su resolución?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "ciudad_pais_trabajo",
        "etiqueta": "¿En qué ciudad y país trabajará la Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "puesto_trabajador",
        "etiqueta": "¿Cuál es el puesto o cargo que desempeñará la Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "servicios_trabajador",
        "etiqueta": "Describa los servicios o actividades que llevará a cabo la Parte Empleada (trabajador):",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "horas_jornada",
        "etiqueta": "¿De cuántas horas será la jornada laboral de la Parte Empleada (trabajador)?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "dias_trabajo",
        "etiqueta": "¿De qué día a qué día de la semana trabajará la Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "dias_descanso_semana",
        "etiqueta": "¿Cuántos días a la semana descansará la Parte Empleada (trabajador)?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "dias_descanso",
        "etiqueta": "¿Qué día(s) de la semana descansará la Parte Empleada (trabajador)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "salario_mensual",
        "etiqueta": "¿Cuál será el salario mensual neto que recibirá la Parte Empleada (trabajador) por sus servicios? Especificar tipo de moneda.",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "periodicidad_pago",
        "etiqueta": "¿Cada cuánto será pagado el sueldo a la Parte Empleada (trabajador)?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Mensual",
          "Quincenal"
        ]
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "¿La vigencia del contrato terminará en alguna fecha específica o se celebrará por tiempo indeterminado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Por tiempo indeterminado",
          "En fecha específica"
        ]
      },
      {
        "clave": "fecha_fin_contrato",
        "etiqueta": "¿En qué fecha terminará el contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "En fecha específica"
        }
      },
      {
        "clave": "recibira_informacion_confidencial",
        "etiqueta": "¿Recibirá la Parte Empleada (trabajador) información confidencial de la Parte Empleadora (patrón) como consecuencia del desempeño de sus labores?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  },
  "contrato-mutuo-negocios": {
    "nombre": "Contrato de Mutuo",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_mutuante",
        "etiqueta": "La persona que presta es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_mutuante",
        "etiqueta": "¿Cuál es el nombre de la persona que hará el préstamo? (nombre completo o denominación social)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_mutuante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la empresa que hará el préstamo?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_mutuante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_mutuante",
        "etiqueta": "¿Cuál es el domicilio de la persona que hará el préstamo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_mutuario",
        "etiqueta": "La persona que recibe el préstamo es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_mutuario",
        "etiqueta": "¿Cuál es el nombre de la persona que recibirá el préstamo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_mutuario",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la empresa que recibirá el préstamo?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_mutuario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_mutuario",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibirá el préstamo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se celebrará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "monto_prestamo",
        "etiqueta": "¿Cuánto dinero se prestará? (especifica el tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "fecha_devolucion",
        "etiqueta": "¿En qué fecha se deberá devolver o pagar el préstamo?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "genera_intereses",
        "etiqueta": "¿El préstamo generará intereses ordinarios?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes",
        "etiqueta": "¿Qué tasa de interés ordinaria anual se pactará?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "genera_intereses",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "otorga_garantia",
        "etiqueta": "¿Se deberá otorgar una garantía sobre un bien mueble a favor de la persona que hace el préstamo?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "descripcion_bien_garantia",
        "etiqueta": "Describe el bien que se otorgará como garantía de pago:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "otorga_garantia",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "valor_bien_garantia",
        "etiqueta": "Determina el valor del bien que se dará en garantía: (especifica el tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "otorga_garantia",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "contrato-mutuo": {
    "nombre": "Contrato de Mutuo",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_mutuante",
        "etiqueta": "La persona que presta es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_mutuante",
        "etiqueta": "¿Cuál es el nombre de la persona que hará el préstamo? (nombre completo o denominación social)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_mutuante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la empresa que hará el préstamo?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_mutuante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_mutuante",
        "etiqueta": "¿Cuál es el domicilio de la persona que hará el préstamo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_mutuario",
        "etiqueta": "La persona que recibe el préstamo es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_mutuario",
        "etiqueta": "¿Cuál es el nombre de la persona que recibirá el préstamo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_mutuario",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibirá el préstamo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se celebrará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "monto_prestamo",
        "etiqueta": "¿Cuánto dinero se prestará? (especifica el tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "fecha_devolucion",
        "etiqueta": "¿En qué fecha se deberá devolver o pagar el préstamo?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "genera_intereses",
        "etiqueta": "¿El préstamo generará intereses ordinarios?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes",
        "etiqueta": "¿Qué tasa de interés ordinaria anual se pactará?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "genera_intereses",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "otorga_garantia",
        "etiqueta": "¿Se deberá otorgar una garantía sobre un bien mueble a favor de la persona que hace el préstamo?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "descripcion_bien_garantia",
        "etiqueta": "Describe el bien que se otorgará como garantía de pago:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "otorga_garantia",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "valor_bien_garantia",
        "etiqueta": "Determina el valor del bien que se dará en garantía: (especifica el tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "otorga_garantia",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "convenio-divorcio": {
    "nombre": "Convenio de Divorcio",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "nombre_parte_a",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el contrato como Parte A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_parte_a",
        "etiqueta": "¿Cuál es el domicilio de la Parte A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_parte_b",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el contrato como Parte B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_parte_b",
        "etiqueta": "¿Cuál es el domicilio de la Parte B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En qué lugar se firmará el contrato?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se llevarán dichas controversias para su resolución?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_matrimonio",
        "etiqueta": "¿En qué fecha contrajeron matrimonio los esposos que desean divorciarse?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "regimen_patrimonial",
        "etiqueta": "Los esposos se casaron bajo el régimen patrimonial de:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Separación de bienes",
          "Sociedad conyugal"
        ]
      },
      {
        "clave": "compensacion_bienes",
        "etiqueta": "¿Habrá alguna compensación de bienes por virtud del régimen patrimonial de separación de bienes?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "regimen_patrimonial",
          "valor_que_activa": "Separación de bienes"
        }
      },
      {
        "clave": "quien_paga_compensacion",
        "etiqueta": "¿Quién deberá pagar la compensación?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "compensacion_bienes",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "tienen_hijos",
        "etiqueta": "Los esposos que desean divorciarse, ¿han procreado o adoptado hijos?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "nombres_hijos",
        "etiqueta": "Indica el nombre de los hijos de los esposos que desean divorciarse:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tienen_hijos",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "conyuge_embarazada",
        "etiqueta": "¿Se encuentra embarazada alguno de los cónyuges?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "procedimiento_iniciado",
        "etiqueta": "¿Los esposos han iniciado el procedimiento de divorcio correspondiente?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "fecha_inicio_procedimiento",
        "etiqueta": "¿En qué fecha se inició el procedimiento de divorcio?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "procedimiento_iniciado",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "quien_guardia_custodia",
        "etiqueta": "¿Quién tendrá la guardia y custodia de los hijos menores o incapaces?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tienen_hijos",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "frecuencia_visitas",
        "etiqueta": "El cónyuge que no ejerza la guardia y custodia de los hijos podrá realizar visitas a los mismos:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Semanalmente",
          "Mensualmente"
        ],
        "depende_de": {
          "clave_padre": "tienen_hijos",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "horas_visitas",
        "etiqueta": "¿Por cuántas horas podrán ser las visitas a los menores de edad?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tienen_hijos",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "pagara_pension",
        "etiqueta": "¿Se deberá pagar pensión alimenticia?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "porcentaje_pension",
        "etiqueta": "¿Qué porcentaje de los ingresos se deberá pagar como pensión alimenticia?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "pagara_pension",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "quien_paga_pension",
        "etiqueta": "¿Quién deberá pagar pensión alimenticia a los menores y a su cónyuge?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Parte A",
          "Parte B"
        ],
        "depende_de": {
          "clave_padre": "pagara_pension",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "domicilio_conyugal",
        "etiqueta": "¿En dónde se ubica el domicilio conyugal?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "quien_habita_domicilio_conyugal",
        "etiqueta": "¿Quién habitará en el domicilio conyugal?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Parte A",
          "Parte B"
        ]
      }
    ]
  },
  "convenio-modificatorio-negocios": {
    "nombre": "Convenio Modificatorio",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_parte_a",
        "etiqueta": "Una de las partes que firmará el contrato es (la llamaremos Parte A): ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_parte_a",
        "etiqueta": "¿Cuál es el nombre (denominación social) de una de las personas que firmará como Parte A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_parte_a",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el contrato en representación de la Parte A?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_parte_a",
        "etiqueta": "¿Cuál es el domicilio de la Parte A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_parte_b",
        "etiqueta": "La otra parte que firmará el contrato es (la llamaremos Parte B): ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_parte_b",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el contrato como Parte B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_parte_b",
        "etiqueta": "¿Cuál es el domicilio de la persona que firmará el contrato como Parte B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En qué lugar se firmará el contrato? (incluye la ciudad o región y estado)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tipo_documento_original",
        "etiqueta": "Selecciona si el tipo de acuerdo o documento que celebraron las partes:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Contrato",
          "Convenio"
        ]
      },
      {
        "clave": "nombre_documento_original",
        "etiqueta": "¿Cómo se llama el contrato que se modificará? Ejemplo: Contrato de Prestación de Servicios",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_documento_original",
        "etiqueta": "¿En qué fecha se firmó el contrato que se modificará?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "obligaciones_parte_a_original",
        "etiqueta": "¿A qué se obligó la Parte A en el contrato original?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "obligaciones_parte_b_original",
        "etiqueta": "¿A qué se obligó la Parte B en el contrato original?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "contrato_permite_modificacion",
        "etiqueta": "¿En el contrato original se hace referencia a la posibilidad de modificar el documento?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "contenido_a_modificar",
        "etiqueta": "Transcribe el contenido que deseas modificar:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "nueva_redaccion",
        "etiqueta": "Redacta cómo debe quedar la nueva cláusula, información o contenido del contrato:",
        "tipo": "parrafo",
        "obligatorio": true
      }
    ]
  },
  "convenio-modificatorio": {
    "nombre": "Convenio Modificatorio",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_parte_a",
        "etiqueta": "Una de las partes que firmará el contrato (Parte A) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_representante_parte_a",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el contrato en representación de la Parte A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_parte_a",
        "etiqueta": "¿Cuál es el domicilio de la Parte A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_parte_b",
        "etiqueta": "La otra parte que firmará el contrato (Parte B) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_parte_b",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el contrato como Parte B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_parte_b",
        "etiqueta": "¿Cuál es el domicilio de la persona que firmará el contrato como Parte B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En qué lugar se firmará el contrato? (incluye la ciudad o región y estado)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tipo_acuerdo",
        "etiqueta": "Selecciona el tipo de acuerdo o documento que celebraron las partes:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Convenio",
          "Contrato"
        ]
      },
      {
        "clave": "nombre_contrato_original",
        "etiqueta": "¿Cómo se llama el contrato que se modificará? Ejemplo: Contrato de Prestación de Servicios",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_contrato_original",
        "etiqueta": "¿En qué fecha se firmó el contrato que se modificará?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "obligacion_parte_a",
        "etiqueta": "¿A qué se obligó la Parte A en el contrato original?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "obligacion_parte_b",
        "etiqueta": "¿A qué se obligó la Parte B en el contrato original?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "referencia_modificacion",
        "etiqueta": "¿En el contrato original se hace referencia a la posibilidad de modificar el documento?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "contenido_a_modificar",
        "etiqueta": "Transcribe el contenido que deseas modificar:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "nueva_clausula",
        "etiqueta": "Redacta cómo debe quedar la nueva cláusula, información o contenido del contrato:",
        "tipo": "parrafo",
        "obligatorio": true
      }
    ]
  },
  "convenio-terminacion-finiquito-negocios": {
    "nombre": "Convenio de Terminación y Finiquito",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_parte_a",
        "etiqueta": "Una de las partes que firmará el contrato es (la llamaremos Parte A): ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_parte_a",
        "etiqueta": "¿Cuál es el nombre (denominación social) de una de las personas que firmará como Parte A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_parte_a",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el convenio en representación de la Parte A?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_parte_a",
        "etiqueta": "¿Cuál es el domicilio de la Parte A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_parte_b",
        "etiqueta": "La otra parte que firmará el convenio es (la llamaremos Parte B): ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_parte_b",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el convenio como Parte B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_parte_b",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el convenio en representación de la Parte B?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_b",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_parte_b",
        "etiqueta": "¿Cuál es el domicilio de la persona que firmará el convenio como Parte B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En qué lugar se firmará el convenio? (incluye la ciudad o región y estado)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el convenio:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "nombre_contrato_original",
        "etiqueta": "¿Cómo se llama el contrato que se dará por terminado? Ejemplo: Contrato de Prestación de Servicios",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_contrato_original",
        "etiqueta": "¿En qué fecha se firmó el contrato que se dará por terminado?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "obligacion_parte_a",
        "etiqueta": "¿A qué se obligó la Parte A en el contrato original?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "obligacion_parte_b",
        "etiqueta": "¿A qué se obligó la Parte B en el contrato original?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "agregar_razon_terminacion",
        "etiqueta": "¿Deseas agregar la razón por la que se da por terminado el Contrato Original?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "razon_terminacion",
        "etiqueta": "Describe las razones por las cuales se dará por terminado el contrato original:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "agregar_razon_terminacion",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "agregar_renuncia_acciones",
        "etiqueta": "¿Deseas agregar que las partes renuncian a cualquier acción en contra de su contraparte?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "agregar_acuerdo_adicional",
        "etiqueta": "¿Deseas agregar algún acuerdo adicional?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  },
  "convenio-terminacion-finiquito": {
    "nombre": "Convenio de Terminación y Finiquito",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_parte_a",
        "etiqueta": "Una de las partes que firmará el convenio (Parte A) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_representante_parte_a",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el convenio en representación de la Parte A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_parte_a",
        "etiqueta": "¿Cuál es el domicilio de la Parte A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_parte_b",
        "etiqueta": "La otra parte que firmará el convenio (Parte B) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "domicilio_parte_b",
        "etiqueta": "¿Cuál es el domicilio de la persona que firmará el convenio como Parte B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En qué lugar se firmará el convenio? (incluye la ciudad o región y estado)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el convenio:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "nombre_contrato_original",
        "etiqueta": "¿Cómo se llama el contrato que se dará por terminado? Ejemplo: Contrato de Prestación de Servicios",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_contrato_original",
        "etiqueta": "¿En qué fecha se firmó el contrato que se dará por terminado?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "obligacion_parte_a",
        "etiqueta": "¿A qué se obligó la Parte A en el contrato original?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "obligacion_parte_b",
        "etiqueta": "¿A qué se obligó la Parte B en el contrato original?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "agregar_razon_terminacion",
        "etiqueta": "¿Deseas agregar la razón por la que se da por terminado el Contrato Original?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "razon_terminacion",
        "etiqueta": "Describe las razones por las cuales se dará por terminado el contrato original:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "agregar_razon_terminacion",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "agregar_renuncia_acciones",
        "etiqueta": "¿Deseas agregar que las partes renuncian a cualquier acción en contra de su contraparte?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "agregar_acuerdo_adicional",
        "etiqueta": "¿Deseas agregar algún acuerdo adicional?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  },
  "distribucion": {
    "nombre": "Contrato de Distribución",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_suministradora",
        "etiqueta": "La persona fabricante de los productos es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_suministradora",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) completa de la empresa fabricante de los productos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "pais_constitucion_suministradora",
        "etiqueta": "¿En qué país se constituyó la empresa fabricante de los productos?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_suministradora",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "representante_suministradora",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la empresa fabricante de los productos?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_suministradora",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "caracter_representante_suministradora",
        "etiqueta": "El representante o apoderado legal de la empresa fabricante de los productos es:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Apoderado legal",
          "Funcionario con facultades suficientes"
        ],
        "depende_de": {
          "clave_padre": "tipo_suministradora",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_suministradora",
        "etiqueta": "¿Cuál es el domicilio de la persona fabricante de los productos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_distribuidora",
        "etiqueta": "La persona que distribuirá los productos es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_distribuidora",
        "etiqueta": "¿Cuál es el nombre completo de la persona que distribuirá los productos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "representante_distribuidora",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la empresa distribuidora de los productos?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_distribuidora",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nacionalidad_distribuidora",
        "etiqueta": "¿Cuál es la nacionalidad de la persona que distribuirá los productos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "firma_distribuidora",
        "etiqueta": "La persona que distribuirá los productos firmará el contrato:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Personalmente",
          "A través del representante"
        ]
      },
      {
        "clave": "domicilio_distribuidora",
        "etiqueta": "¿Cuál es el domicilio de la persona que distribuirá los productos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se celebrará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se llevarán dichas controversias para su resolución?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "descripcion_productos",
        "etiqueta": "¿Cuáles son los productos que se distribuirán?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "territorio_limitado",
        "etiqueta": "¿La distribución de los productos estará limitada a algún territorio específico?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "territorio_distribucion",
        "etiqueta": "¿En qué territorio se deberán distribuir los productos?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "territorio_limitado",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "exclusividad",
        "etiqueta": "¿La persona que distribuirá los productos será la única que podrá comercializar los mismos en el territorio autorizado? Es decir, ¿contará con exclusividad para comercializar los productos?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "inventario_minimo",
        "etiqueta": "¿Qué valor en dinero de productos tendrá que mantener en inventario mensualmente la persona que distribuirá los productos?",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "dias_entrega",
        "etiqueta": "¿Cuántos días hábiles tendrá la persona fabricante de los productos para entregar los mismos una vez que la parte que los distribuirá haya realizado el pedido correspondiente?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "domicilio_entrega",
        "etiqueta": "¿En qué domicilio deberá la persona fabricante de los productos entregar los mismos a la persona que los distribuirá?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "genera_intereses",
        "etiqueta": "¿Se generarán intereses en caso de que la persona que distribuirá los productos incumpla con sus obligaciones de pago?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes",
        "etiqueta": "¿Qué tasa de interés se aplicará sobre las cantidades adeudadas por la persona que distribuirá los productos?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "genera_intereses",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "fecha_inicio_vigencia",
        "etiqueta": "¿En qué fecha comenzará a surtir efectos el contrato?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El contrato se celebrará:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Tiempo determinado",
          "Tiempo indeterminado"
        ]
      },
      {
        "clave": "unidad_vigencia",
        "etiqueta": "La vigencia del contrato tendrá una vigencia de un número determinado de:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Semanas",
          "Meses",
          "Años"
        ],
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Tiempo determinado"
        }
      },
      {
        "clave": "cantidad_vigencia",
        "etiqueta": "¿Cuántas semanas de vigencia tendrá el contrato?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Tiempo determinado"
        }
      },
      {
        "clave": "terminacion_anticipada",
        "etiqueta": "¿Podrán las partes terminar anticipadamente el contrato mediante notificación previa enviada a la otra parte?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  },
  "donacion-bien-inmueble-2": {
    "nombre": "Contrato de Donación de Bien Inmueble",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_donante",
        "etiqueta": "La persona que donará el bien inmueble es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_donante",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que donará el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_donante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que donará el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_donante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_donante",
        "etiqueta": "¿Cuál es el domicilio de la persona que donará el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_donatario",
        "etiqueta": "La persona que recibirá el bien inmueble es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_donatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_donatario",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que recibirá el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_donatario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "domicilio_donatario",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibirá el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "estado_civil_donante",
        "etiqueta": "La persona que donará el bien inmueble:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "No está casado y es único dueño del inmueble.",
          "No está casado y es dueño de las bodegas junto con otras personas.",
          "Se encuentra casado bajo el régimen de sociedad conyugal.",
          "Se encuentra casado bajo el régimen de bienes separados."
        ]
      },
      {
        "clave": "domicilio_inmueble",
        "etiqueta": "Determine el domicilio del bien inmueble que se donará:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tiene_gravamen",
        "etiqueta": "¿El bien inmueble que se donará tiene alguna garantía, carga o gravamen?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "descripcion_gravamen",
        "etiqueta": "Indica qué garantía tiene el bien inmueble que se donará:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tiene_gravamen",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "donacion-bien-inmueble": {
    "nombre": "Contrato de Donación de Bien Inmueble",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_donante",
        "etiqueta": "La persona que donará el bien inmueble es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_donante",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que donará el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_donante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que donará el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_donante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_donante",
        "etiqueta": "¿Cuál es el domicilio de la persona que donará el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_donatario",
        "etiqueta": "La persona que recibirá el bien inmueble es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_donatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "domicilio_donatario",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibirá el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "regimen_propiedad_donante",
        "etiqueta": "La persona que donará el bien inmueble:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Es el único dueño del inmueble",
          "Es dueño del inmueble junto con otras personas",
          "Se encuentra bajo el régimen de bienes separados y es el dueño del bien inmueble",
          "Se encuentra casado bajo el régimen de sociedad conyugal"
        ]
      },
      {
        "clave": "nombres_otros_propietarios",
        "etiqueta": "Indica el nombre completo de las otras personas que son propietarias del bien inmueble",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "regimen_propiedad_donante",
          "valor_que_activa": "Es dueño del inmueble junto con otras personas"
        }
      },
      {
        "clave": "domicilio_inmueble",
        "etiqueta": "Determine el domicilio del bien inmueble que se donará:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tiene_gravamen",
        "etiqueta": "¿El bien inmueble que se donará tiene alguna garantía, carga o gravamen?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "descripcion_gravamen",
        "etiqueta": "Indica qué garantía tiene el bien inmueble que se donará:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tiene_gravamen",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "donante_paga_adeudos",
        "etiqueta": "¿Deseas incluir que a fin de que el inmueble esté libre de cualquier adeudo o carga el donante se hará cargo de cualquier pago que se deba realizar?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  },
  "finiquito-laboral-negocios": {
    "nombre": "Finiquito Laboral",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_patron",
        "etiqueta": "El patrón a quien se dirige la carta finiquito es: ¿persona física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_patron",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) del patrón a quien se dirige la carta finiquito?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_patron",
        "etiqueta": "¿Cuál es el nombre del representante legal de la empresa a quien se dirige la carta de finiquito?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_patron",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_patron",
        "etiqueta": "¿Cuál es el domicilio del patrón a quien se dirige la carta finiquito?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_trabajador",
        "etiqueta": "¿Cómo se llama el trabajador que firmará la carta de finiquito?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "termino_por_renuncia",
        "etiqueta": "¿La terminación de la relación laboral fue por una renuncia?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "monto_finiquito",
        "etiqueta": "¿Cuánto recibirá el trabajador por el finiquito? (especifica la moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "fecha_terminacion",
        "etiqueta": "¿En qué fecha terminó la relación laboral?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "incluye_prestaciones",
        "etiqueta": "¿Deseas incluir que se cubren ciertas prestaciones con el pago que recibe el trabajador?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "cubre_salarios_vencidos",
        "etiqueta": "¿El pago de finiquito cubre el concepto de salarios vencidos a la fecha de terminación de la relación laboral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_vacaciones",
        "etiqueta": "¿El pago de finiquito cubre el concepto de vacaciones?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_prima_vacacional",
        "etiqueta": "¿El pago de finiquito cubre el concepto de prima vacacional?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_aguinaldo",
        "etiqueta": "¿El pago de finiquito cubre el concepto de aguinaldo?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_prima_antiguedad",
        "etiqueta": "¿El pago de finiquito cubre el concepto de prima de antigüedad?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_prima_dominical",
        "etiqueta": "¿El pago de finiquito cubre el concepto de prima dominical?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_caja_ahorro",
        "etiqueta": "¿El pago de finiquito cubre alguna caja de ahorro?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_bonos",
        "etiqueta": "¿El pago de finiquito cubre algún concepto de bonos?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_concepto_adicional",
        "etiqueta": "¿El pago de finiquito cubre algún concepto adicional?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "descripcion_concepto_adicional",
        "etiqueta": "Indica el concepto o prestación adicional que se cubre con el finiquito:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "cubre_concepto_adicional",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "incluye_liberacion",
        "etiqueta": "¿Deseas incluir que se libera de toda responsabilidad al patrón por la relación laboral que ha terminado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Indica el lugar de firma de la carta finiquito:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Indica la fecha de firma de la carta finiquito:",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "finiquito-laboral": {
    "nombre": "Finiquito Laboral",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_patron",
        "etiqueta": "El patrón a quien se dirige la carta finiquito es: ¿persona física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_patron",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) del patrón a quien se dirige la carta finiquito?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_patron",
        "etiqueta": "¿Cuál es el nombre del representante legal de la empresa a quien se dirige la carta de finiquito?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_patron",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_patron",
        "etiqueta": "¿Cuál es el domicilio del patrón a quien se dirige la carta finiquito?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_trabajador",
        "etiqueta": "¿Cómo se llama el trabajador que firmará la carta de finiquito?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "termino_por_renuncia",
        "etiqueta": "¿La terminación de la relación laboral fue por una renuncia?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "monto_finiquito",
        "etiqueta": "¿Cuánto recibirá el trabajador por el finiquito?",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "fecha_terminacion",
        "etiqueta": "¿En qué fecha terminó la relación laboral?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "incluye_prestaciones",
        "etiqueta": "¿Deseas incluir que se cubren ciertas prestaciones con el pago que recibe el trabajador?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "cubre_salarios_vencidos",
        "etiqueta": "¿El pago de finiquito cubre el concepto de salarios vencidos a la fecha de terminación de la relación laboral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_vacaciones",
        "etiqueta": "¿El pago de finiquito cubre el concepto de vacaciones?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_prima_vacacional",
        "etiqueta": "¿El pago de finiquito cubre el concepto de prima vacacional?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_aguinaldo",
        "etiqueta": "¿El pago de finiquito cubre el concepto de aguinaldo?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_prima_antiguedad",
        "etiqueta": "¿El pago de finiquito cubre el concepto de prima de antigüedad?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_prima_dominical",
        "etiqueta": "¿El pago de finiquito cubre el concepto de prima dominical?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_caja_ahorro",
        "etiqueta": "¿El pago de finiquito cubre alguna caja de ahorro?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_bonos",
        "etiqueta": "¿El pago de finiquito cubre algún concepto de bonos?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "cubre_concepto_adicional",
        "etiqueta": "¿El pago de finiquito cubre algún concepto adicional?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "incluye_prestaciones",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "descripcion_concepto_adicional",
        "etiqueta": "Indica el concepto o prestación adicional que se cubre con el finiquito:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "cubre_concepto_adicional",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "incluye_liberacion",
        "etiqueta": "¿Deseas incluir que se libera de toda responsabilidad al patrón por la relación laboral que ha terminado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Indica el lugar de firma de la carta finiquito:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Indica la fecha de firma de la carta finiquito:",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "licencia-uso-marca": {
    "nombre": "Contrato de Licencia de Uso de Marca",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_licenciante",
        "etiqueta": "La persona que otorgará la licencia de marca es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_licenciante",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la empresa que otorgará la licencia de marca?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "representante_licenciante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado de la empresa que otorgará la licencia de marca?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_licenciante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_licenciante",
        "etiqueta": "¿Cuál es el domicilio de la persona que otorgará la licencia de marca?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_licenciatario",
        "etiqueta": "La persona que obtendrá la licencia de marca es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_licenciatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que obtendrá la licencia de marca?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "representante_licenciatario",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado de la empresa que obtendrá la licencia de marca?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_licenciatario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_licenciatario",
        "etiqueta": "¿Cuál es el domicilio de la persona que obtendrá la licencia de marca?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se celebrará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se llevarán dichas controversias para su resolución?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "numero_registro_marca",
        "etiqueta": "Indica el número de registro de la marca de la que se otorgará una licencia:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_licencia",
        "etiqueta": "¿De qué forma se otorga la licencia de marca?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Exclusiva",
          "No exclusiva simple"
        ]
      },
      {
        "clave": "permite_sublicencia",
        "etiqueta": "¿Podrá la persona que obtendrá la licencia de marca, a su vez, otorgar una licencia de dicha marca a otra persona?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "genera_pago",
        "etiqueta": "¿Deberá la parte que obtendrá una licencia de marca pagar alguna cantidad de dinero a la parte propietaria de la marca por el uso de la marca?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "periodicidad_pago",
        "etiqueta": "¿Cada cuánto se deberá pagar el uso de la marca al propietario de la marca?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Semanalmente",
          "Mensualmente",
          "Anualmente"
        ],
        "depende_de": {
          "clave_padre": "genera_pago",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "monto_licencia",
        "etiqueta": "¿Cuánto deberá pagar la persona que obtendrá la licencia de marca, por el uso de la marca? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "genera_pago",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "fecha_inicio_uso",
        "etiqueta": "¿A partir de qué fecha se podrá usar la marca?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El contrato se celebra por:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Periodo específico",
          "Tiempo indeterminado"
        ]
      },
      {
        "clave": "fecha_fin_vigencia",
        "etiqueta": "¿En qué fecha terminará la vigencia del contrato?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Periodo específico"
        }
      },
      {
        "clave": "terminacion_anticipada",
        "etiqueta": "¿Podrán las partes dar por terminado el contrato de manera anticipada mediante notificación previa enviada a la otra parte?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  },
  "no-competencia": {
    "nombre": "Contrato de No Competencia",
    "campos": [
      {
        "clave": "tipo_parte_a",
        "etiqueta": "Una de las partes que firmará el contrato es (la llamaremos Parte A): ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_parte_a",
        "etiqueta": "¿Cuál es el nombre (denominación social) de la persona moral que contratará como Parte A?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_parte_a_fisica",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el contrato como Parte A?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Física"
        }
      },
      {
        "clave": "nombre_representante_parte_a",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el contrato en representación de la Parte A?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_parte_a",
        "etiqueta": "¿Cuál es el domicilio de la Parte A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_parte_b",
        "etiqueta": "La otra parte que firmará el contrato es (la llamaremos Parte B): ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_representante_parte_b",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el contrato en representación de la Parte B?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_b",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_parte_b",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona moral que firmará el contrato como Parte B?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_b",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_parte_b_fisica",
        "etiqueta": "¿Cuál es el nombre completo de la persona que firmará el contrato como Parte B?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_b",
          "valor_que_activa": "Física"
        }
      },
      {
        "clave": "domicilio_parte_b",
        "etiqueta": "¿Cuál es el domicilio de la persona que firmará el contrato como Parte B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En qué lugar se firmará el contrato? (incluye la ciudad o región y estado)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "actividades_comerciales",
        "etiqueta": "Describe las actividades comerciales sobre las cuales no podrán competir las mismas:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "territorio_parte_a",
        "etiqueta": "Determine en qué territorio podrá comercializar los productos o servicios la Parte A:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "territorio_parte_b",
        "etiqueta": "Determine en qué territorio podrá comercializar los productos o servicios la Parte B:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "incluir_actividades_prohibidas",
        "etiqueta": "¿Deseas incluir actividades específicas que estén expresamente prohibidas?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "actividades_incumplimiento",
        "etiqueta": "Describa las actividades específicas que se entenderán como incumplimiento a las obligaciones de no competencia:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "incluir_actividades_prohibidas",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "incluir_pena_convencional",
        "etiqueta": "¿Deseas que se pacte una sanción o una pena convencional en caso de incumplimiento por alguna de las partes?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "porcentaje_pena_convencional",
        "etiqueta": "¿Qué porcentaje de los ingresos que haya recibido la persona que haya incumplido a sus obligaciones, deberá de pagar a la parte afectada por dicho incumplimiento?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "incluir_pena_convencional",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "notificacion-deterioros-arrendador-negocios": {
    "nombre": "Notificación de Deterioros al Arrendador por el Sismo",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la república.",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "La persona que envía la notificación (arrendatario) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que envía la notificación? (arrendatario)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que envía la notificación? (arrendatario)",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendatario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "fecha_contrato",
        "etiqueta": "¿En qué fecha se celebró el contrato de arrendamiento?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_bien",
        "etiqueta": "Describe el bien que se dio en arrendamiento:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "domicilio_bien",
        "etiqueta": "Indica el domicilio del bien que se dio en arrendamiento:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "La persona que recibe la notificación (arrendador) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibe la notificación? (arrendador)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_arrendador",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibe la notificación? (arrendador)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "ciudad_afectada_sismo",
        "etiqueta": "Indica la ciudad o región afectada por el sismo, donde se ubica el inmueble:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "danos_deterioros",
        "etiqueta": "Indica los daños y deterioros que sufrió el inmueble:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "incluir_info_adicional",
        "etiqueta": "¿Deseas incluir alguna nota o información adicional a la notificación?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "info_adicional",
        "etiqueta": "Incluye la información adicional que deseas agregar:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "incluir_info_adicional",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "ciudad_elaboracion",
        "etiqueta": "¿En qué ciudad se elabora la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_elaboracion",
        "etiqueta": "¿En qué fecha se elabora la notificación?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "notificacion-deterioros-arrendador": {
    "nombre": "Notificación de Deterioros al Arrendador por el Sismo",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la república.",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "La persona que envía la notificación (arrendatario) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que envía la notificación? (arrendatario)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que envía la notificación? (arrendatario)",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendatario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "fecha_contrato",
        "etiqueta": "¿En qué fecha se celebró el contrato de arrendamiento?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_bien",
        "etiqueta": "Describe el bien que se dio en arrendamiento:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "domicilio_bien",
        "etiqueta": "Indica el domicilio del bien que se dio en arrendamiento:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "La persona que recibe la notificación (arrendador) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibe la notificación? (arrendador)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_arrendador",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibe la notificación? (arrendador)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "ciudad_afectada_sismo",
        "etiqueta": "Indica la ciudad o región afectada por el sismo, donde se ubica el inmueble:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "danos_deterioros",
        "etiqueta": "Indica los daños y deterioros que sufrió el inmueble:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "incluir_info_adicional",
        "etiqueta": "¿Deseas incluir alguna nota o información adicional a la notificación?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "info_adicional",
        "etiqueta": "Incluye la información adicional que deseas agregar:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "incluir_info_adicional",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "ciudad_elaboracion",
        "etiqueta": "¿En qué ciudad se elabora la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_elaboracion",
        "etiqueta": "¿En qué fecha se elabora la notificación?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "notificacion-deterioros-vendedor-negocios": {
    "nombre": "Notificación de Deterioros al Vendedor por el Sismo",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la república.",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_comprador",
        "etiqueta": "La persona que envía la notificación (comprador) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comprador",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que envía la notificación? (comprador)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_comprador",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que envía la notificación? (comprador)",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comprador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "fecha_contrato",
        "etiqueta": "¿En qué fecha se celebró el contrato entre el vendedor y comprador?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_bien",
        "etiqueta": "Describe el bien que se vendió:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "domicilio_bien",
        "etiqueta": "Indica el domicilio del bien que se vendió:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_vendedor",
        "etiqueta": "La persona que recibe la notificación (vendedor) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_vendedor",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibe la notificación? (vendedor)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_vendedor",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibe la notificación? (vendedor)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "ciudad_afectada_sismo",
        "etiqueta": "Indica la ciudad o región afectada por el sismo, donde se ubica el inmueble:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "danos_deterioros",
        "etiqueta": "Indica los daños y deterioros que sufrió el inmueble:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "incluir_info_adicional",
        "etiqueta": "¿Deseas incluir alguna nota o información adicional a la notificación?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "ciudad_elaboracion",
        "etiqueta": "¿En qué ciudad se elabora la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_elaboracion",
        "etiqueta": "¿En qué fecha se elabora la notificación?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "notificacion-deterioros-vendedor": {
    "nombre": "Notificación de Deterioros al Vendedor por el Sismo",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_comprador",
        "etiqueta": "La persona que envía la notificación (comprador) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_comprador",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que envía la notificación? (comprador)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_comprador",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que envía la notificación? (comprador)",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_comprador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "fecha_contrato",
        "etiqueta": "¿En qué fecha se celebró el contrato entre el vendedor y comprador?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_bien",
        "etiqueta": "Describe el bien que se vendió:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "domicilio_bien",
        "etiqueta": "Indica el domicilio del bien que se vendió:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_vendedor",
        "etiqueta": "La persona que recibe la notificación (vendedor) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_vendedor",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que recibe la notificación? (vendedor)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_vendedor",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibe la notificación? (vendedor)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "ciudad_sismo",
        "etiqueta": "Indica la ciudad o región afectada por el sismo, donde se ubica el inmueble:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "descripcion_danos",
        "etiqueta": "Indica los daños y deterioros que sufrió el inmueble:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "nota_adicional",
        "etiqueta": "¿Deseas incluir alguna nota o información adicional a la notificación?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "texto_nota_adicional",
        "etiqueta": "Escribe la nota o información adicional que deseas incluir:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "nota_adicional",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "lugar_elaboracion",
        "etiqueta": "¿En qué ciudad se elabora la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_elaboracion",
        "etiqueta": "¿En qué fecha se elabora la notificación?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "notificacion-incremento-renta": {
    "nombre": "Notificación de Incremento de Renta",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "La persona que realiza la notificación (arrendador) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que realizará la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendador",
        "etiqueta": "¿Cuál es el nombre completo del representante de la persona que realizará la notificación?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "La persona que recibirá la notificación (arrendatario) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_arrendatario",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibe la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_contrato_arrendamiento",
        "etiqueta": "¿En qué fecha se celebró el contrato de arrendamiento del cual se incrementará la renta pactada?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "domicilio_inmueble",
        "etiqueta": "¿En qué domicilio se ubica el bien inmueble que se otorgó en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "descripcion_inmueble",
        "etiqueta": "Describe brevemente en qué consiste el bien inmueble que se otorgó en arrendamiento:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "clausula_aumento",
        "etiqueta": "¿En el contrato de arrendamiento que han celebrado las partes, se ha pactado alguna cláusula relacionada con el aumento de la renta?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "nueva_renta",
        "etiqueta": "¿A qué cantidad se incrementará la nueva renta? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "fecha_nueva_renta",
        "etiqueta": "¿A partir de qué fecha se deberá realizar el pago del nuevo monto de la renta?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "deposito_otorgado",
        "etiqueta": "¿La persona que renta el bien inmueble otorgó alguna cantidad en depósito a favor del propietario del bien inmueble?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "incrementar_deposito",
        "etiqueta": "¿Será necesario que el depósito que se ha otorgado se incremente en la misma proporción en que se incrementó la renta?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ],
        "depende_de": {
          "clave_padre": "deposito_otorgado",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En qué lugar se realiza la notificación de incremento de renta?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "¿En qué fecha se firma la notificación de incremento de renta?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "notificacion-prorroga-arrendamiento": {
    "nombre": "Notificación de Prórroga de Contrato de Arrendamiento",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "La persona que realiza la notificación (arrendatario, quien tomó el bien en renta) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que realizará la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo del representante de la persona que realizará la notificación?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendatario",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "La persona que recibirá la notificación (arrendador, dueño del bien) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibirá la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_arrendador",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibe la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_contrato_arrendamiento",
        "etiqueta": "¿En qué fecha se celebró el contrato de arrendamiento del cual se prorrogará el plazo?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "domicilio_inmueble",
        "etiqueta": "¿En qué domicilio se ubica el bien inmueble que se otorgó en arrendamiento?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "descripcion_inmueble",
        "etiqueta": "Describe brevemente en qué consiste el bien inmueble que se otorgó en arrendamiento:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "clausula_prorroga",
        "etiqueta": "¿En el contrato de arrendamiento que han celebrado las partes, se ha pactado alguna cláusula relacionada con alguna prórroga al plazo?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "meses_prorroga",
        "etiqueta": "¿Por cuántos meses se desea prorrogar el contrato de arrendamiento?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En qué lugar se realiza la notificación de prórroga de plazo?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "¿En qué fecha se realizará la notificación de prórroga?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "pagare-negocios": {
    "nombre": "Pagaré",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_suscriptor",
        "etiqueta": "La persona que firma el pagaré (suscriptor) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_suscriptor",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la empresa que firmará el pagaré (suscriptor)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "representante_suscriptor",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la empresa que firmará el pagaré (suscriptor)?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_suscriptor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_suscriptor",
        "etiqueta": "¿Cuál es el domicilio de la persona que firmará el pagaré (suscriptor)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_beneficiario",
        "etiqueta": "¿Cuál es el nombre o denominación social de la persona a quien se le pagará el dinero (beneficiario)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "monto_pagare",
        "etiqueta": "¿Cuál es la cantidad que promete pagar la persona que firma el pagaré (suscriptor) al beneficiario? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "forma_pago",
        "etiqueta": "La persona que firmará el pagaré (suscriptor) deberá pagar el adeudo:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Fecha específica",
          "Cuando el beneficiario presente al suscriptor para su cobro en un solo pago",
          "En diversas parcialidades y fechas"
        ]
      },
      {
        "clave": "fecha_vencimiento",
        "etiqueta": "¿En qué fecha promete el deudor (suscriptor) pagar al beneficiario el adeudo?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "forma_pago",
          "valor_que_activa": "Fecha específica"
        }
      },
      {
        "clave": "descripcion_forma_pago",
        "etiqueta": "Describe la forma de pago del adeudo:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "genera_intereses_ordinarios",
        "etiqueta": "¿Se generarán intereses ordinarios?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes_ordinario",
        "etiqueta": "¿Qué tasa de interés se aplicará para calcular los intereses ordinarios?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "genera_intereses_ordinarios",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "genera_intereses_moratorios",
        "etiqueta": "¿Se generarán intereses moratorios por retraso en el pago del adeudo?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes_moratorio",
        "etiqueta": "¿Qué tasa de interés se aplicará para calcular los intereses por el retraso en el pago del adeudo?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "genera_intereses_moratorios",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "fecha_suscripcion",
        "etiqueta": "¿En qué fecha se firma o suscribe el pagaré?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "lugar_suscripcion",
        "etiqueta": "¿En qué lugar se firma o suscribe el pagaré?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tiene_aval",
        "etiqueta": "¿Firmará el pagaré algún aval, es decir alguna persona que se obligue a realizar el pago del adeudo si la persona que firma el pagaré (suscriptor) no lo hiciere?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tipo_aval",
        "etiqueta": "La persona que firmará como aval, obligándose a pagar el adeudo en caso de que el deudor (suscriptor) no lo hiciere, es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ],
        "depende_de": {
          "clave_padre": "tiene_aval",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "nombre_aval",
        "etiqueta": "¿Cuál es el nombre completo del aval?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tiene_aval",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "domicilio_aval",
        "etiqueta": "¿Cuál es el domicilio del aval quien se obliga a realizar el pago del adeudo si la persona que firma el pagaré (suscriptor) no lo realiza?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tiene_aval",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "pagare": {
    "nombre": "Pagaré",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_suscriptor",
        "etiqueta": "La persona que firma el pagaré (suscriptor) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_suscriptor",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la empresa que firmará el pagaré (suscriptor)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_suscriptor",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la empresa que firmará el pagaré (suscriptor)?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_suscriptor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_suscriptor",
        "etiqueta": "¿Cuál es el domicilio de la persona que firmará el pagaré (suscriptor)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_beneficiario",
        "etiqueta": "¿Cuál es el nombre o denominación social de la persona a quien se le pagará el dinero (beneficiario)?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "monto_pagare",
        "etiqueta": "¿Cuál es la cantidad que promete pagar la persona que firma el pagaré (suscriptor) al beneficiario?",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "tipo_pago",
        "etiqueta": "La persona que firmará el pagaré (suscriptor) deberá pagar el adeudo: ¿en fecha específica y un solo pago, en parcialidades, o cuando el beneficiario presente el pagaré al suscriptor para su pago?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Fecha específica y un solo pago",
          "Parcialidades",
          "Cuando el beneficiario presente el pagaré"
        ]
      },
      {
        "clave": "fecha_vencimiento",
        "etiqueta": "¿En qué fecha promete el deudor (suscriptor) pagar al beneficiario el adeudo?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "forma_pago",
        "etiqueta": "Describe la forma de pago del adeudo:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "intereses_ordinarios",
        "etiqueta": "¿Se generarán intereses ordinarios?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes_ordinarios",
        "etiqueta": "¿Qué tasa de interés se aplicará para calcular los intereses ordinarios?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "intereses_ordinarios",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "intereses_moratorios",
        "etiqueta": "¿Se generarán intereses moratorios por retraso en el pago del adeudo?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes_moratorios",
        "etiqueta": "¿Qué tasa de interés se aplicará para calcular los intereses por el retraso en el pago del adeudo?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "intereses_moratorios",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "¿En qué fecha se firma o suscribe el pagaré?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En qué lugar se firma o suscribe el pagaré?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tiene_aval",
        "etiqueta": "¿Firmará el pagaré algún aval, es decir alguna persona que se obligue a realizar el pago del adeudo si la persona que firma el pagaré (suscriptor) no lo hiciere?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tipo_aval",
        "etiqueta": "La persona que firmará como aval, obligándose a pagar el adeudo en caso de que el deudor (suscriptor) no lo hiciere, es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ],
        "depende_de": {
          "clave_padre": "tiene_aval",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "nombre_aval",
        "etiqueta": "¿Cuál es el nombre completo del aval?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tiene_aval",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "domicilio_aval",
        "etiqueta": "¿Cuál es el domicilio del aval quien se obliga a realizar el pago del adeudo si la persona que firma el pagaré (suscriptor) no lo realiza?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tiene_aval",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "permuta": {
    "nombre": "Contrato de Permuta",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_parte_a",
        "etiqueta": "Una de las personas que intercambiará una cosa (Parte A) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_parte_a",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la Parte A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_parte_a",
        "etiqueta": "¿Cuál es el nombre completo del representante de la Parte A?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_parte_a",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_parte_a",
        "etiqueta": "¿Cuál es el domicilio de la Parte A?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_parte_b",
        "etiqueta": "La otra persona que intercambiará una cosa (Parte B) es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_parte_b",
        "etiqueta": "¿Cuál es el nombre completo de la Parte B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_parte_b",
        "etiqueta": "¿Cuál es el domicilio de la Parte B?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_bien_a",
        "etiqueta": "Describe el bien que la Parte A entregará a la Parte B:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "descripcion_bien_b",
        "etiqueta": "Describe el bien que la Parte B entregará a la Parte A:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "valor_mayor",
        "etiqueta": "Escoge el bien que tenga un valor mayor, o en su caso la opción de que tienen el mismo valor:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Mismo valor",
          "El de la Parte A",
          "El de la Parte B"
        ]
      },
      {
        "clave": "pago_compensacion",
        "etiqueta": "¿La Parte A deberá pagar alguna cantidad de dinero a la Parte B por la diferencia?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "monto_compensacion",
        "etiqueta": "¿Cuánto deberá pagar la Parte A a la Parte B? (especifica el tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "pago_compensacion",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "forma_pago_compensacion",
        "etiqueta": "Describe de qué forma y cuándo se pagará la cantidad por compensación:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "pago_compensacion",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "pena_convencional",
        "etiqueta": "¿Se pagará alguna pena convencional por incumplimiento?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "porcentaje_pena_convencional",
        "etiqueta": "¿Qué porcentaje del valor del bien que entrega la parte que incumple se deberá considerar para el pago de la pena?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "pena_convencional",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "prestacion-servicios-negocios": {
    "nombre": "Contrato de Prestación de Servicios",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_prestataria",
        "etiqueta": "La parte a quien se le prestan los servicios es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_prestataria",
        "etiqueta": "¿Cuál es el nombre de la persona moral (denominación social) a quien se le prestarán los servicios?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_prestataria",
        "etiqueta": "¿Cuál es el nombre completo del representante de la persona moral a quien se le prestarán los servicios?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_prestataria",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_prestataria",
        "etiqueta": "¿Cuál es el domicilio de la parte a quien se le prestarán los servicios?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_prestadora",
        "etiqueta": "La parte que prestará los servicios es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_prestadora",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que prestará los servicios?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_prestadora",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que prestará los servicios?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_prestadora",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_prestadora",
        "etiqueta": "¿Cuál es el domicilio de la persona que prestará los servicios?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar donde se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_servicios",
        "etiqueta": "Describa los servicios que se prestarán:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "meses_vigencia",
        "etiqueta": "¿Por cuántos meses estará vigente el contrato?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "monto_contraprestacion",
        "etiqueta": "¿Cuánto se pagará por la prestación de los servicios? (tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "forma_pago",
        "etiqueta": "Describe la forma de pago de los servicios:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "intereses_si",
        "etiqueta": "En caso de incumplimiento del pago, ¿se generarán intereses mensualmente por el retraso en dicho pago?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes",
        "etiqueta": "¿Qué tasa de interés se aplicará en caso de incumplimiento?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "intereses_si",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "prestacion-servicios": {
    "nombre": "Contrato de Prestación de Servicios",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_prestataria",
        "etiqueta": "La parte a quien se le prestan los servicios es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_prestataria",
        "etiqueta": "¿Cuál es el nombre de la parte a quien se le prestarán los servicios? (nombre completo o denominación social)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_prestataria",
        "etiqueta": "¿Cuál es el nombre completo del representante de la persona moral a quien se le prestarán los servicios?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_prestataria",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_prestataria",
        "etiqueta": "¿Cuál es el domicilio de la parte a quien se le prestarán los servicios?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_prestadora",
        "etiqueta": "La parte que prestará los servicios es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_prestadora",
        "etiqueta": "¿Cuál es el nombre de la persona que prestará los servicios? (nombre completo o denominación social)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_prestadora",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la empresa que prestará los servicios?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_prestadora",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_prestadora",
        "etiqueta": "¿Cuál es el domicilio de la persona que prestará los servicios?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar donde se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "descripcion_servicios",
        "etiqueta": "Describa los servicios que se prestarán:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "meses_vigencia",
        "etiqueta": "¿Por cuántos meses estará vigente el contrato?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "monto_contraprestacion",
        "etiqueta": "¿Cuánto se pagará por la prestación de los servicios? (especifica el tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "forma_pago",
        "etiqueta": "Describe la forma de pago de los servicios:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "intereses_incumplimiento",
        "etiqueta": "En caso de incumplimiento del pago, ¿se generarán intereses mensualmente por el retraso en dicho pago?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes",
        "etiqueta": "¿Qué tasa de interés se aplicará en caso de incumplimiento?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "intereses_incumplimiento",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "promesa-compraventa-inmueble-negocios": {
    "nombre": "Contrato de Promesa de Compraventa de Bien Inmueble",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_promitente_vendedor",
        "etiqueta": "La persona que tiene la intención de vender el bien inmueble es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_promitente_vendedor",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que tiene intención de vender el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_promitente_vendedor",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que tiene intención de vender el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_promitente_vendedor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_promitente_vendedor",
        "etiqueta": "¿Cuál es el domicilio de la persona que tiene intención de vender el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_promitente_comprador",
        "etiqueta": "La persona que tiene intención de comprar el bien inmueble es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_promitente_comprador",
        "etiqueta": "¿Cuál es el nombre completo de la persona que tiene intención de comprar el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_promitente_comprador",
        "etiqueta": "¿Cuál es el domicilio de la persona que tiene intención de comprar el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "regimen_propiedad_promitente_vendedor",
        "etiqueta": "La persona que tiene intención de vender el bien inmueble:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Es único dueño del inmueble",
          "Es dueño del inmueble junto con otras personas",
          "Se encuentra casado bajo el régimen de bienes separados y es el único dueño del inmueble",
          "Se encuentra casado bajo el régimen de sociedad conyugal"
        ]
      },
      {
        "clave": "nombres_otros_propietarios",
        "etiqueta": "Indica el nombre completo de las otras personas que son propietarias del bien inmueble",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "regimen_propiedad_promitente_vendedor",
          "valor_que_activa": "Es dueño del inmueble junto con otras personas"
        }
      },
      {
        "clave": "domicilio_inmueble",
        "etiqueta": "Determine el domicilio del bien inmueble que se venderá cuando se celebre el contrato definitivo de compraventa:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "modalidad_firma_contrato_definitivo",
        "etiqueta": "El contrato definitivo de compraventa se firmará:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "En una fecha específica",
          "En un plazo que comenzará a partir de la firma de la promesa"
        ]
      },
      {
        "clave": "fecha_firma_contrato_definitivo",
        "etiqueta": "¿En qué fecha se firmará el contrato definitivo de compraventa?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "modalidad_firma_contrato_definitivo",
          "valor_que_activa": "En una fecha específica"
        }
      },
      {
        "clave": "pago_seriedad_garantia",
        "etiqueta": "¿Se pagará alguna cantidad de dinero como seriedad de la garantía?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "monto_seriedad_garantia",
        "etiqueta": "¿Qué cantidad se pagará como seriedad de la garantía? (especifica el tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "pago_seriedad_garantia",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "tiene_gravamen",
        "etiqueta": "¿El bien inmueble que se venderá cuando se celebre el contrato definitivo de compraventa tiene alguna garantía, carga o gravamen?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "descripcion_gravamen",
        "etiqueta": "Indica qué garantía tiene el bien inmueble que se venderá:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tiene_gravamen",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "pena_convencional",
        "etiqueta": "En caso de que alguna de las partes incumpla cualquiera de sus obligaciones, ¿deberá pagar alguna pena convencional a la parte afectada?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "porcentaje_pena_convencional",
        "etiqueta": "¿Qué porcentaje del valor del bien inmueble que se desea vender se deberá pagar como pena convencional en caso de incumplimiento?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "pena_convencional",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "promesa-compraventa-inmueble": {
    "nombre": "Contrato de Promesa de Compraventa de Bien Inmueble",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_promitente_vendedor",
        "etiqueta": "La persona que tiene la intención de vender el bien inmueble es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_promitente_vendedor",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que tiene intención de vender el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_promitente_vendedor",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que tiene intención de vender el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_promitente_vendedor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_promitente_vendedor",
        "etiqueta": "¿Cuál es el domicilio de la persona que tiene intención de vender el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_promitente_comprador",
        "etiqueta": "La persona que tiene intención de comprar el bien inmueble es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_promitente_comprador",
        "etiqueta": "¿Cuál es el nombre completo de la persona que tiene intención de comprar el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_promitente_comprador",
        "etiqueta": "¿Cuál es el domicilio de la persona que tiene intención de comprar el bien inmueble?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "regimen_propiedad_promitente_vendedor",
        "etiqueta": "La persona que tiene intención de vender el bien inmueble:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Es dueño único",
          "Es dueño del bien del inmueble junto con otras personas",
          "Se encuentra casado bajo el régimen de bienes separados y es el único dueño del bien inmueble",
          "Se encuentra casado bajo el régimen de sociedad conyugal"
        ]
      },
      {
        "clave": "nombres_otros_propietarios",
        "etiqueta": "Indica el nombre completo de las otras personas que son propietarias del bien inmueble",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "regimen_propiedad_promitente_vendedor",
          "valor_que_activa": "Es dueño del bien del inmueble junto con otras personas"
        }
      },
      {
        "clave": "domicilio_inmueble",
        "etiqueta": "Determine el domicilio del bien inmueble que se venderá cuando se celebre el contrato definitivo de compraventa:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "modalidad_firma_contrato_definitivo",
        "etiqueta": "El contrato definitivo de compraventa se firmará:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "En una fecha específica",
          "En un plazo que comenzará a partir de la firma de la promesa"
        ]
      },
      {
        "clave": "fecha_firma_contrato_definitivo",
        "etiqueta": "¿En qué fecha se firmará el contrato definitivo de compraventa?",
        "tipo": "fecha",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "modalidad_firma_contrato_definitivo",
          "valor_que_activa": "En una fecha específica"
        }
      },
      {
        "clave": "pago_seriedad_garantia",
        "etiqueta": "¿Se pagará alguna cantidad de dinero como seriedad de la garantía?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "monto_seriedad_garantia",
        "etiqueta": "¿Qué cantidad se pagará como seriedad de la garantía? (especifica el tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "pago_seriedad_garantia",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "tiene_gravamen",
        "etiqueta": "¿El bien inmueble que se venderá cuando se celebre el contrato definitivo de compraventa tiene alguna garantía, carga o gravamen?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "descripcion_gravamen",
        "etiqueta": "Indica qué garantía tiene el bien inmueble que se venderá:",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tiene_gravamen",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "pena_convencional",
        "etiqueta": "En caso de que alguna de las partes incumpla cualquiera de sus obligaciones, ¿deberá pagar alguna pena convencional a la parte afectada?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "porcentaje_pena_convencional",
        "etiqueta": "¿Qué porcentaje del valor del bien inmueble que se desea vender se deberá pagar como pena convencional en caso de incumplimiento?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "pena_convencional",
          "valor_que_activa": "Sí"
        }
      }
    ]
  },
  "recibo-pago-negocios": {
    "nombre": "Recibo de Pago",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_deudor",
        "etiqueta": "La persona que entrega el dinero es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_deudor",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que entrega el dinero?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "representante_deudor",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que entrega el dinero?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_deudor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_deudor",
        "etiqueta": "¿Cuál es el domicilio de la persona que entrega el dinero?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_acreedor",
        "etiqueta": "La persona que recibe el dinero es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_acreedor",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibe el dinero?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "representante_acreedor",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que recibe el dinero?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_acreedor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el recibo:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el recibo:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "monto_pago",
        "etiqueta": "¿Cuánto dinero se entrega? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "concepto_pago",
        "etiqueta": "¿Por qué concepto se hace entrega y recepción de dicha cantidad?",
        "tipo": "parrafo",
        "obligatorio": true
      }
    ]
  },
  "recibo-pago-renta": {
    "nombre": "Recibo de Pago de Renta",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_arrendador",
        "etiqueta": "El arrendador, es decir la persona que recibe el dinero es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendador",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona moral que recibe el dinero?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_arrendador",
        "etiqueta": "¿Cuál es el nombre completo del representante de la persona que recibe el dinero?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_arrendador",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "tipo_arrendatario",
        "etiqueta": "El arrendatario, es decir la persona que entrega el dinero es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_arrendatario",
        "etiqueta": "¿Cuál es el nombre completo de la persona que entrega el dinero?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "periodo_renta",
        "etiqueta": "Indica el periodo que comprende el pago de la renta que se realiza:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_contrato_arrendamiento",
        "etiqueta": "¿Cuándo se celebró el contrato de arrendamiento correspondiente?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "monto_renta",
        "etiqueta": "¿Cuánto dinero se entregará? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "fecha_pago",
        "etiqueta": "¿En qué fecha se recibe la cantidad como pago de una renta?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "¿En qué lugar se recibe la cantidad como pago de la renta?",
        "tipo": "texto",
        "obligatorio": true
      }
    ]
  },
  "recibo-pago": {
    "nombre": "Recibo de Pago",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_deudor",
        "etiqueta": "La persona que entrega el dinero es: ¿moral o física?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_deudor",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que entrega el dinero?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_deudor",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que entrega el dinero?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_deudor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_deudor",
        "etiqueta": "¿Cuál es el domicilio de la persona que entrega el dinero?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_acreedor",
        "etiqueta": "La persona que recibe el dinero es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_acreedor",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que recibe el dinero?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_acreedor",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que recibe el dinero?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_acreedor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se firmará el recibo:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el recibo:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "monto_recibo",
        "etiqueta": "¿Cuánto dinero se entrega?",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "concepto_pago",
        "etiqueta": "¿Por qué concepto se hace entrega y recepción de dicha cantidad?",
        "tipo": "texto",
        "obligatorio": true
      }
    ]
  },
  "requerimiento-pago-negocios": {
    "nombre": "Requerimiento de Pago",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_deudor",
        "etiqueta": "La persona a quien se le exige el pago es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_deudor",
        "etiqueta": "¿Cuál es el nombre de la persona a quien se le exige el pago? (nombre completo o denominación social)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_deudor",
        "etiqueta": "¿Cuál es el nombre del representante de la persona moral a quien se le exige el pago?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_deudor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_deudor",
        "etiqueta": "¿Cuál es el domicilio de la persona a quien se le exige el pago?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_acreedor",
        "etiqueta": "La persona que exige el pago es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_acreedor",
        "etiqueta": "¿Cuál es el nombre completo de la persona que exige el pago?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_acreedor",
        "etiqueta": "¿Cuál es el nombre completo del representante de la persona moral que exige el pago?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_acreedor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_acreedor",
        "etiqueta": "¿Cuál es el domicilio de la persona que exige el pago?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_expedicion",
        "etiqueta": "Lugar en que se expide el Requerimiento de Pago:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firma el Requerimiento de Pago:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "origen_adeudo",
        "etiqueta": "Describe el origen o causa por la cual se exige el pago:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "monto_adeudo",
        "etiqueta": "¿A cuánto asciende la cantidad adeudada cuyo pago es requerido? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "intereses_exigidos",
        "etiqueta": "¿La cantidad adeudada generó intereses que también se exigen a través de esta carta?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes_anual",
        "etiqueta": "¿Cuál es la tasa de interés anual que se utilizó para calcular los intereses generados?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "intereses_exigidos",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "monto_intereses",
        "etiqueta": "¿A qué cantidad asciende el monto de intereses adeudados? (seleccionar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "intereses_exigidos",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "dias_plazo_pago",
        "etiqueta": "¿Cuántos días naturales, a partir de la recepción del requerimiento, tendrá la persona requerida para pagar el adeudo solicitado?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "forma_pago",
        "etiqueta": "Describe de qué forma se deberá realizar el pago:",
        "tipo": "parrafo",
        "obligatorio": true
      }
    ]
  },
  "requerimiento-pago": {
    "nombre": "Requerimiento de Pago",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_deudor",
        "etiqueta": "La persona a quien se le exige el pago es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_deudor",
        "etiqueta": "¿Cuál es el nombre de la persona a quien se le exige el pago? (nombre completo o denominación social)",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_deudor",
        "etiqueta": "¿Cuál es el nombre del representante de la persona moral a quien se le exige el pago?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_deudor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_deudor",
        "etiqueta": "¿Cuál es el domicilio de la persona a quien se le exige el pago?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_acreedor",
        "etiqueta": "La persona que exige el pago es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_acreedor",
        "etiqueta": "¿Cuál es el nombre completo de la persona que exige el pago?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_acreedor",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que exige el pago?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_acreedor",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_acreedor",
        "etiqueta": "¿Cuál es el domicilio de la persona que exige el pago?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_expedicion",
        "etiqueta": "Lugar en que se expide el Requerimiento de Pago:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firma el Requerimiento de Pago:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "origen_adeudo",
        "etiqueta": "Describe el origen o causa por la cual se exige el pago:",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "monto_adeudo",
        "etiqueta": "¿A cuánto asciende la cantidad adeudada cuyo pago es requerido? (especificar moneda)",
        "tipo": "moneda",
        "obligatorio": true
      },
      {
        "clave": "intereses_exigidos",
        "etiqueta": "¿La cantidad adeudada generó intereses que también se exigen a través de esta carta?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes_anual",
        "etiqueta": "¿Cuál es la tasa de interés anual que se utilizó para calcular los intereses generados?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "intereses_exigidos",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "monto_intereses",
        "etiqueta": "¿A qué cantidad asciende el monto de intereses adeudados? (especificar tipo de moneda)",
        "tipo": "moneda",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "intereses_exigidos",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "dias_plazo_pago",
        "etiqueta": "¿Cuántos días naturales, a partir de la recepción del requerimiento, tendrá la persona requerida para pagar el adeudo solicitado?",
        "tipo": "numero",
        "obligatorio": true
      },
      {
        "clave": "forma_pago",
        "etiqueta": "Describe de qué forma se deberá realizar el pago:",
        "tipo": "parrafo",
        "obligatorio": true
      }
    ]
  },
  "rescision-contrato-negocios": {
    "nombre": "Rescisión de Contrato",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_notificante",
        "etiqueta": "La persona que envía la notificación es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_notificante",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que envía la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_notificante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que envía la notificación?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_notificante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "descripcion_contrato",
        "etiqueta": "¿Qué contrato se desea dar por rescindido?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_contrato",
        "etiqueta": "¿En qué fecha se celebró el contrato que se desea dar por rescindido?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tipo_notificado",
        "etiqueta": "La persona que recibe la notificación es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_notificado",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibe la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_notificado",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibe la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "clausula_rescision",
        "etiqueta": "¿El contrato que se desea rescindir establece alguna disposición sobre la rescisión?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "nota_adicional",
        "etiqueta": "¿Deseas incluir alguna nota o información adicional a la notificación?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "texto_nota_adicional",
        "etiqueta": "Escribe la nota o información adicional que deseas incluir:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "nota_adicional",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "lugar_elaboracion",
        "etiqueta": "¿En qué ciudad se elabora la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_elaboracion",
        "etiqueta": "¿En qué fecha se elabora la notificación?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "rescision-contrato": {
    "nombre": "Rescisión de Contrato",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_notificante",
        "etiqueta": "La persona que envía la notificación es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_notificante",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la persona que envía la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nombre_representante_notificante",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que envía la notificación?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_notificante",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "descripcion_contrato",
        "etiqueta": "¿Qué contrato se desea dar por rescindido?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_contrato",
        "etiqueta": "¿En qué fecha se celebró el contrato que se desea dar por rescindido?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tipo_notificado",
        "etiqueta": "La persona que recibe la notificación es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_notificado",
        "etiqueta": "¿Cuál es el nombre completo de la persona que recibe la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "domicilio_notificado",
        "etiqueta": "¿Cuál es el domicilio de la persona que recibe la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "clausula_rescision",
        "etiqueta": "¿El contrato que se desea rescindir establece alguna disposición sobre la rescisión?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "nota_adicional",
        "etiqueta": "¿Deseas incluir alguna nota o información adicional a la notificación?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "texto_nota_adicional",
        "etiqueta": "Escribe la nota o información adicional que deseas incluir:",
        "tipo": "parrafo",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "nota_adicional",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "lugar_elaboracion",
        "etiqueta": "¿En qué ciudad se elabora la notificación?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_elaboracion",
        "etiqueta": "¿En qué fecha se elabora la notificación?",
        "tipo": "fecha",
        "obligatorio": true
      }
    ]
  },
  "suministro": {
    "nombre": "Contrato de Suministro",
    "campos": [
      {
        "clave": "estado_republica",
        "etiqueta": "Estado de la República:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Aguascalientes",
          "Baja California",
          "Baja California Sur",
          "Campeche",
          "Chiapas",
          "Chihuahua",
          "Ciudad de México",
          "Coahuila",
          "Colima",
          "Durango",
          "Estado de México",
          "Guanajuato",
          "Guerrero",
          "Hidalgo",
          "Jalisco",
          "Michoacán",
          "Morelos",
          "Nayarit",
          "Nuevo León",
          "Oaxaca",
          "Puebla",
          "Querétaro",
          "Quintana Roo",
          "San Luis Potosí",
          "Sinaloa",
          "Sonora",
          "Tabasco",
          "Tamaulipas",
          "Tlaxcala",
          "Veracruz",
          "Yucatán",
          "Zacatecas"
        ]
      },
      {
        "clave": "tipo_suministradora",
        "etiqueta": "La persona proveedora de los productos es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_suministradora",
        "etiqueta": "¿Cuál es el nombre completo (denominación social) de la empresa proveedora de los productos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "pais_constitucion_suministradora",
        "etiqueta": "¿En qué país se constituyó la empresa proveedora de los productos?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_suministradora",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "nombre_representante_suministradora",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la empresa proveedora de los productos?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_suministradora",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "caracter_representante_suministradora",
        "etiqueta": "El representante de la empresa proveedora de los productos es:",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Apoderado legal",
          "Funcionario con facultades suficientes"
        ],
        "depende_de": {
          "clave_padre": "tipo_suministradora",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_suministradora",
        "etiqueta": "¿Cuál es el domicilio de la persona proveedora de los productos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "tipo_suministrada",
        "etiqueta": "La persona que comprará los productos es: ¿física o moral?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Física",
          "Moral"
        ]
      },
      {
        "clave": "nombre_suministrada",
        "etiqueta": "¿Cuál es el nombre completo de la persona que comprará los productos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "nacionalidad_suministrada",
        "etiqueta": "¿Cuál es la nacionalidad de la persona que comprará los productos?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_suministrada",
          "valor_que_activa": "Física"
        }
      },
      {
        "clave": "nombre_representante_suministrada",
        "etiqueta": "¿Cuál es el nombre completo del representante o apoderado legal de la persona que comprará los productos?",
        "tipo": "texto",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_suministrada",
          "valor_que_activa": "Moral"
        }
      },
      {
        "clave": "domicilio_suministrada",
        "etiqueta": "¿Cuál es el domicilio de la persona que comprará los productos?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "lugar_firma",
        "etiqueta": "Lugar en que se celebrará el contrato:",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "fecha_firma",
        "etiqueta": "Fecha en que se firmará el contrato:",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "ciudad_tribunales",
        "etiqueta": "En caso de existir controversias derivadas del contrato, ¿ante los tribunales de qué ciudad se llevarán dichas controversias para su resolución?",
        "tipo": "texto",
        "obligatorio": true
      },
      {
        "clave": "descripcion_productos",
        "etiqueta": "¿Cuáles son los productos que se suministrarán?",
        "tipo": "parrafo",
        "obligatorio": true
      },
      {
        "clave": "exclusividad_suministrada_si",
        "etiqueta": "¿Contará la parte que comprará los productos con exclusividad para adquirir los mismos?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "exclusividad_suministradora_si",
        "etiqueta": "¿Contará la parte que proveerá los productos con exclusividad para vender sus productos a la persona que los comprará?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "intereses_si",
        "etiqueta": "¿Se generarán intereses en caso de que la persona que comprará los productos se retrase, o incumpla total o parcialmente, en los pagos que deba realizar a la persona proveedora de los productos?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "tasa_interes",
        "etiqueta": "¿Qué tasa de interés se aplicará al adeudo que tenga la persona que recibe los productos?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "intereses_si",
          "valor_que_activa": "Sí"
        }
      },
      {
        "clave": "fecha_inicio_vigencia",
        "etiqueta": "¿En qué fecha comenzará a surtir efectos el contrato?",
        "tipo": "fecha",
        "obligatorio": true
      },
      {
        "clave": "tipo_vigencia",
        "etiqueta": "El contrato se celebrará por: ¿un periodo determinado o un periodo indeterminado?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Por un periodo determinado",
          "Por un periodo indeterminado"
        ]
      },
      {
        "clave": "unidad_vigencia",
        "etiqueta": "El Contrato tendrá una vigencia de: ¿meses o años?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Meses",
          "Años"
        ],
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Por un periodo determinado"
        }
      },
      {
        "clave": "cantidad_vigencia",
        "etiqueta": "¿De cuántos meses será la vigencia del contrato?",
        "tipo": "numero",
        "obligatorio": true,
        "depende_de": {
          "clave_padre": "tipo_vigencia",
          "valor_que_activa": "Por un periodo determinado"
        }
      },
      {
        "clave": "terminacion_anticipada_si",
        "etiqueta": "¿Podrán las partes terminar anticipadamente el contrato mediante notificación previa enviada a la otra parte?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      },
      {
        "clave": "confidencialidad_si",
        "etiqueta": "¿Se compartirán información confidencial las personas que firman el contrato?",
        "tipo": "select",
        "obligatorio": true,
        "opciones": [
          "Sí",
          "No"
        ]
      }
    ]
  }
};
