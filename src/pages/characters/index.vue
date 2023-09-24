<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { NButton } from 'naive-ui'
import { useBaseStore } from '../../store/base'
import { NEW_CHARACTER } from '@/data/new-character'
import type { Character } from '@/interfaces/Character'

const store = useBaseStore()
const router = useRouter()

function createCharacter() {
  const character = structuredClone(NEW_CHARACTER)

  character.id = uuidv4()

  store.characters.push(character)

  router.push({ name: 'character', params: { id: character.id } })
}

function deleteCharacter(id: string) {
  const index = store.characters.findIndex(character => character.id === id)

  if (index === -1)
    throw new Error(`Character with id ${id} not found`)

  store.characters.splice(index, 1)
}

const columns = ref([
  {
    title: 'Name',
    key: 'name',
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
                deleteCharacter(character.id)
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
  <n-card title="Charaktere">
    <template #header-extra>
      <NButton @click="createCharacter()">
        Erstellen
      </NButton>
    </template>

    <n-data-table :columns="columns" :data="store.characters" />
  </n-card>
</template>

<style>
</style>
