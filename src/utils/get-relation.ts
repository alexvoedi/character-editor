import type { RelationStatus } from '@/data/relations'
import { RELATIONS } from '@/data/relations'

export function getRelation(relationStatus: RelationStatus) {
  const relation = RELATIONS.find(relation => relation.id === relationStatus)

  if (!relation)
    throw new Error(`Relation with id ${relationStatus} not found`)

  return relation
}
