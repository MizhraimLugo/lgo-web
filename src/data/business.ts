// Fuente única de verdad para datos del negocio (NAP).
// Cambiar aquí actualiza header, footer, contacto y schema en todas las páginas.

export const business = {
  brand: 'Grupo LGO',
  legalName: 'Grupo LGO',
  description:
    'Ecosistema empresarial mexicano. Integramos firmas consultoras complementarias bajo un mismo criterio para resolver lo que tu empresa necesita, desde Guadalajara, Jalisco.',
  tagline: 'Resolver problemas y dar tranquilidad.',
  url: 'https://lgo.mx',
  email: 'contacto@lgo.mx',
  phone: '+52 33 3233 6337',
  phoneE164: '+523332336337',
  whatsapp: '523332336337',
  whatsappUrl: 'https://wa.me/523332336337',
  address: {
    street: 'Lorenzana 781',
    neighborhood: 'Jardines del Bosque',
    postalCode: '44520',
    locality: 'Guadalajara',
    region: 'Jalisco',
    regionCode: 'JAL',
    country: 'México',
    countryCode: 'MX',
    full: 'Lorenzana 781, Jardines del Bosque, 44520 Guadalajara, Jal.'
  },
  geo: {
    latitude: 20.6657,
    longitude: -103.3754
  },
  hours: {
    label: 'Lunes a viernes, 9:00 a 18:00',
    openingHoursSpec: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      }
    ]
  },
  social: {
    instagram: '',
    linkedin: '',
    facebook: ''
  }
} as const;

export type Business = typeof business;
