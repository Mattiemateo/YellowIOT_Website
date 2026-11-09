// Centrale teamgegevens. Pas hier aan, dan klopt het overal (pagina's, JSON-LD, llms.txt).

export const site = {
  name: 'Team Yellow IoT',
  teamNumber: '25905',
  url: 'https://www.yellowiot.nl',
  email: 'team@yellowiot.nl',
  locale: 'nl_NL',
  robot: 'Porcupine',
  season: '2025–2026',
  members: 3,
  memberAge: 15,
  minJoinAge: 14,
  bunq: 'https://bunq.me/YellowIOT',
  linkedin: 'https://linkedin.com/company/yellow-iot',
  instagram: 'https://www.instagram.com/yellow.iot/',
  description:
    'Team Yellow IoT (#25905) is een FIRST Tech Challenge-roboticateam van drie jongeren van 15. Bekijk onze robot Porcupine, word sponsor of kom in het team.',
};

export const sponsors = ['Junior IOT', 'Café de Wetering', 'FabCreator', 'Inzicht door Paarden'];

// Laatste crowdfunding (zie /bedankt/)
export const crowdfunding = { goal: 100, raised: 303, supporters: 14 };

// Sponsorpakketten. Zet `price` op een tekst als "€ 250" zodra het team de bedragen heeft bepaald.
export const tiers = [
  {
    id: 'sensor',
    name: 'Sensor',
    tagline: 'je ziet ons groeien',
    price: null as string | null,
    perks: ['Naam op de website', 'Bedankpost op social media'],
  },
  {
    id: 'motor',
    name: 'Motor',
    tagline: 'jij geeft ons vaart',
    price: null as string | null,
    featured: true,
    perks: [
      'Logo op de website en shirts',
      'Adopteer een onderdeel: jouw naam op de onderdeelpagina',
      'Vermelding in het engineering portfolio',
    ],
  },
  {
    id: 'controller',
    name: 'Controller',
    tagline: 'jij stuurt ons de goede kant op',
    price: null as string | null,
    perks: ['Groot logo op de robot', 'Alles uit Motor', 'Demo of workshop bij jouw bedrijf'],
  },
];

export const nav = [
  { href: '/#robot', label: 'Porcupine', key: 'robot' },
  { href: '/#team', label: 'Team', key: 'team' },
  { href: '/doe-mee/', label: 'Doe mee', key: 'doe-mee' },
  { href: '/#contact', label: 'Contact', key: 'contact' },
];
