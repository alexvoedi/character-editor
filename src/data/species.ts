const SPECIES = [
  {
    id: 'anuren',
    name: 'Anuren',
    description: 'Die Anuren sind Fuchs-Katze-Wolf-artige Wesen.',
    subspecies: [],
  },
  {
    id: 'dragon',
    name: 'Drachen',
    description: 'Drachen sind mächtige Wesen.',
  },
  {
    id: 'elv',
    name: 'Elfen',
    description: 'Elfen sind mystische Wesen.',
  },
  {
    id: 'human',
    name: 'Menschen',
    description: 'Der Mensch halt',
  },
  {
    id: 'shatari',
    name: 'Shatari',
    description: 'Die Shatari sind eine Rasse von Kriegern',
  },
  {
    id: 'voori',
    name: 'Voori',
    description: 'Das Vogelvolk',
  },
  {
    id: 'wydraken',
    name: 'Wydraken',
    description: 'Echsenmenschen',
  },
  {
    id: 'dwarfs',
    name: 'Zwerge',
    description: 'Zwerge sind kleine, aber kräftige Wesen.',
  },
] as const

type Species = typeof SPECIES[number]['id']

export { SPECIES, Species }
