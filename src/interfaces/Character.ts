import type { Trait } from '../enums/Trait'

export interface Character {
  id: string
  name: string
  age: number
  traits: Array<{
    id: Trait
    value: number
  }>
}
