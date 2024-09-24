import type { Language, LanguageToLevelMap } from '@/data/languages'
import type { Profession, ProfessionToLevelMap } from '@/data/professions'
import type { RelationStatus, RelationToLevelsMap } from '@/data/relations'
import type { Sex } from '@/data/sex'
import type { Species } from '@/data/species'
import type { Range } from '@/types/utils'
import type { Trait, TraitToValuesMap } from '../data/traits'

export interface CharacterTrait<T extends Trait> {
  id: Trait
  value: TraitToValuesMap[T]
}

export interface CharacterProfession<T extends Profession> {
  id: Profession
  level: Range<0, ProfessionToLevelMap[T]>
}

export interface CharacterLanguage<T extends Language> {
  id: Language
  level: Range<0, LanguageToLevelMap[T]>
}

export interface CharacterRelation<T extends RelationStatus> {
  id: string
  status: RelationStatus
  description: string
  level?: Range<0, RelationToLevelsMap[T]>
}

export type AttributeKey = Profession | Trait | Language | RelationStatus

export interface AttributeList {
  professions: CharacterProfession<Profession>[]
  traits: CharacterTrait<Trait>[]
  languages: CharacterLanguage<Language>[]
  relations: CharacterRelation<RelationStatus>[]
}

export type Character = {
  id: string
  name: string
  sex: Sex
  age: number
  species: Species
  description: string
} & AttributeList
