const SEX = [
  {
    id: 'male',
    name: 'Männlich',
  },
  {
    id: 'female',
    name: 'Weiblich',
  },
  {
    id: 'neutral',
    name: 'Neutral',
  },
] as const

type Sex = typeof SEX[number]['id']

export { SEX, Sex }
