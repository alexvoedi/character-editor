import type { Fraction } from '@/interfaces/Fraction'
import { defineStore } from 'pinia'

interface Store {
  fractions: Ref<Fraction[]>
}

export const useFractionStore = defineStore('fraction', {
  state: (): Store => ({
    fractions: useLocalStorage('fractions', []),
  }),
  actions: {},
  getters: {},
})
