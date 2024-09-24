const PROFESSIONS = [
  {
    id: 'alchemist',
    name: 'Alchemist',
    description: 'Alchemisten sind Meister der Herstellung von Tränken.',
    levels: [
      {
        name: 'Novize',
        description: 'Ein Alchemist in Ausbildung',
      },
      {
        name: 'Lehrling',
        description: 'Ein Alchemist in Ausbildung',
      },
      {
        name: 'Geselle',
        description: 'Ein Alchemist, der die Grundlagen beherrscht',
      },
      {
        name: 'Experte',
        description: 'Ein Alchemist, der die Grundlagen beherrscht',
      },
      {
        name: 'Meister',
        description: 'Ein Alchemist, der die Kunst der Tränke beherrscht',
      },
    ],
  },
] as const

type Profession = typeof PROFESSIONS[number]['id']
type ProfessionLevels = typeof PROFESSIONS[number]['levels']

type ProfessionToLevelMap = {
  [T in Profession]: typeof PROFESSIONS[number]['levels']['length']
}

export { Profession, ProfessionLevels, PROFESSIONS, ProfessionToLevelMap }
