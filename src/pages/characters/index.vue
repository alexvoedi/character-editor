<script setup lang="ts">
import type { Character } from '@/interfaces/Character'
import { useCharacterStore } from '@/store/character'
import { getSex } from '@/utils/get-sex'
import { getSpecies } from '@/utils/get-species'
import { NButton } from 'naive-ui'

const router = useRouter()
const characterStore = useCharacterStore()

const columns = ref([
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Spezies',
    key: 'species',
    render(character: Character) {
      const species = getSpecies(character.species)
      return species.name
    },
  },
  {
    title: 'Geschlecht',
    key: 'sex',
    render(character: Character) {
      const sex = getSex(character.sex)
      return sex.name
    },
  },
  {
    title: 'Alter',
    key: 'age',
  },
  {
    title: 'Actions',
    key: 'actions',
    render(character: Character) {
      return h(
        'div',
        {
          class: 'space-x-4',
        },
        [
          h(
            NButton,
            {
              strong: true,
              quaternary: true,
              size: 'small',
              circle: true,
              onClick() {
                router.push({ name: 'character', params: { id: character.id } })
              },
            },
            {
              default: () => h(
                'span',
                {
                  class: 'ico-mdi-pencil',
                },
                {
                  default: () => '',
                },
              ),
            },
          ),
          h(
            NButton,
            {
              strong: true,
              quaternary: true,
              size: 'small',
              circle: true,
              type: 'error',
              onClick() {
                characterStore.delete(character.id)
              },
            },
            {
              default: () => h(
                'span',
                {
                  class: 'ico-mdi-delete',
                },
                {
                  default: () => '',
                },
              ),
            },
          ),

        ],
      )
    },
  },
])
</script>

<template>
  <n-card title="Charaktere" content-class="p-0!">
    <template #header-extra>
      <NButton @click="characterStore.create()">
        Erstellen
      </NButton>
    </template>

    <n-data-table :columns="columns" :data="characterStore.characters" />
  </n-card>
</template>
