import type { Profession } from '@/data/professions'
import { PROFESSIONS } from '@/data/professions'

export function getProfession(professionId: Profession) {
  const profession = PROFESSIONS.find(profession => profession.id === professionId)

  if (!profession)
    throw new Error(`Profession with id ${professionId} not found`)

  return profession
}
