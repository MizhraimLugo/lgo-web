// Sectores con experiencia. Compartidos entre /abogados/ y /contadores/
// porque el conocimiento sectorial es transversal: la misma empresa de tequila
// necesita tanto cumplimiento ante el CRT (legal) como reportes mensuales (contable).

export type Sector = {
  slug: string;
  name: string;
  detail: string;
};

export const sectores: Sector[] = [
  {
    slug: 'tequileras',
    name: 'Tequileras y bebidas alcohólicas',
    detail:
      'Permisos CRT y COFEPRIS, exportación, contratos de maquila, protección de denominación de origen, planeación fiscal de un sector con IEPS y obligaciones especiales.'
  },
  {
    slug: 'restaurantes',
    name: 'Restaurantes y hospitalidad',
    detail:
      'Constitución de sociedades, licencias de funcionamiento, contratos con personal de propinas, cumplimiento fiscal y manejo de cuentas con alta operación en efectivo y tarjeta.'
  },
  {
    slug: 'constructoras',
    name: 'Constructoras y desarrolladoras',
    detail:
      'Contratos de obra, fideicomisos inmobiliarios, régimen fiscal de la construcción, estructuración de proyectos residenciales y comerciales y reconocimiento contable de obra en proceso.'
  },
  {
    slug: 'profesionistas',
    name: 'Profesionistas independientes',
    detail:
      'Régimen fiscal óptimo, contratos de honorarios, protección de marca personal y declaración anual de personas físicas con actividad profesional para médicos, arquitectos, consultores y otros.'
  },
  {
    slug: 'comercio',
    name: 'Comercio local y emprendimiento',
    detail:
      'Formalización, apertura de negocios, contratos con proveedores, cumplimiento fiscal y planeación contable para PyMEs en etapa de crecimiento.'
  },
  {
    slug: 'condominios',
    name: 'Administradoras de condominios',
    detail:
      'Reglamentos, asambleas, contratos de administración, cuotas de mantenimiento, representación ante propietarios e instituciones y contabilidad específica del régimen.'
  }
];
