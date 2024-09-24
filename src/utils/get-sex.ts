import type { Sex } from '@/data/sex'
import { SEX } from '@/data/sex'

export function getSex(sexId: Sex) {
  const sex = SEX.find(sex => sex.id === sexId)

  if (!sex)
    throw new Error(`Sex with id ${sexId} not found`)

  return sex
}
