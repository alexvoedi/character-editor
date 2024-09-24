import type { Trait } from '@/data/traits'
import { TRAITS } from '@/data/traits'

export function getTrait(traitId: Trait) {
  const trait = TRAITS.find(trait => trait.id === traitId)

  if (!trait)
    throw new Error(`Trait with id ${traitId} not found`)

  return trait
}
