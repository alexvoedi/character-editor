import { defineStore } from 'pinia'
import { Character } from '../interfaces/Character'

interface Store {
  characters: Ref<Character[]>
}

export const useBaseStore = defineStore('base', {
  state: (): Store => ({
    characters: useLocalStorage('characters', []),
  }),

  actions: {},

  getters: {},
})
