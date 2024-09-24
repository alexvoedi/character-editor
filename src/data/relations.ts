const RELATIONS = [
  {
    id: 'mother',
    name: 'Mutter',
    multiple: false,
    levels: [],
  },
  {
    id: 'father',
    name: 'Vater',
    multiple: false,
    levels: [],
  },
  {
    id: 'child',
    name: 'Kind',
    multiple: true,
    levels: [],
  },
  {
    id: 'brother',
    name: 'Bruder',
    multiple: true,
    levels: [],
  },
  {
    id: 'sister',
    name: 'Schwester',
    multiple: true,
    levels: [],
  },
  {
    id: 'friend',
    name: 'Freund',
    multiple: true,
    levels: ['good', 'best'],
  },
  {
    id: 'acquaintance',
    name: 'Bekannter',
    multiple: true,
    levels: ['good', 'best'],
  },
  {
    id: 'enemy',
    name: 'Feind',
    multiple: true,
    levels: [],
  },
] as const

type RelationStatus = typeof RELATIONS[number]['id']
type RelationLevels = typeof RELATIONS[number]['levels']

type RelationToLevelsMap = {
  [T in RelationStatus]: typeof RELATIONS[number]['levels']['length']
}

export { RelationLevels, RELATIONS, RelationStatus, RelationToLevelsMap }
