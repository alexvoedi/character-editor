import type { Species } from '@/data/species'
import { SPECIES } from '@/data/species'

export function getSpecies(speciesId: Species) {
  const species = SPECIES.find(species => species.id === speciesId)

  if (!species)
    throw new Error(`Species with id ${speciesId} not found`)

  return species
}
