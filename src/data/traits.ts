const TRAITS = [
  {
    id: 'courage',
    name: 'Mut',
    description: 'Wie mutig der Charakter ist',
    levels: {
      0: 'ängstlich',
      0.5: 'ausgeglichen',
      1: 'mutig',
    },
  },
  {
    id: 'generosity',
    name: 'Großzügigkeit',
    description: 'Beschreibt, wie bereitwillig der Charakter seine Ressourcen oder Zeit teilt. Sie gibt Aufschluss darüber, ob der Charakter eher zurückhaltend oder sehr freigebig ist.',
    levels: {
      0: 'geizig',
      0.25: 'sparsam',
      0.5: 'ausgeglichen',
      0.75: 'freigiebig',
      1: 'großzügig',
    },
  },
] as const

type Trait = typeof TRAITS[number]['id']
type TraitValues = typeof TRAITS[number]['levels']

type TraitToValuesMap = {
  [T in Trait]: keyof Extract<typeof TRAITS[number], { id: T }>['levels']
}

export { Trait, TRAITS, TraitToValuesMap, TraitValues }
