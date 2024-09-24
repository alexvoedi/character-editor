import type { Character } from '@/interfaces/Character'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

interface Store {
  characters: Ref<Character[]>
}

export const useCharacterStore = defineStore('character', {
  state: (): Store => ({
    characters: useLocalStorage('characters', []),
  }),
  actions: {
    create() {
      const character: Character = {
        id: uuidv4(),
        name: '',
        sex: 'neutral',
        species: 'human',
        age: 1,
        description: '',
        professions: [],
        traits: [],
        languages: [],
        relations: [],
      }

      this.characters.push(character)
    },
    delete(id: string) {
      const index = this.characters.findIndex(character => character.id === id)

      if (index === -1)
        throw new Error(`Character with id ${id} not found`)

      this.characters.splice(index, 1)
    },
  },
  getters: {
    currentCharacter: (state) => {
      const { params } = useRoute()

      if (!params.id)
        throw new Error('Character id not provided')

      const character = state.characters.find(character => character.id === params.id)

      if (!character)
        throw new Error(`Character with id ${params.id} not found`)

      return character
    },
  },
})
