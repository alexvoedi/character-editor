<script setup lang="ts">
import type { RelationStatus } from '@/data/relations'
import type { CharacterRelation } from '@/interfaces/Character'
import { useCharacterStore } from '@/store/character'
import { getRelation } from '@/utils/get-relation'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()

const { currentCharacter: character } = storeToRefs(characterStore)

const relation = defineModel<CharacterRelation<RelationStatus>>('relation', { required: true })

const relationCharacter = computed(() => {
  const relationCharacter = characterStore.characters.find(character => character.id === relation.value.id)

  if (!relationCharacter)
    throw new Error(`Character ${relation.value.id} not found`)

  return relationCharacter
})

function removeRelation(relationStatus: RelationStatus) {
  const index = character.value.relations.findIndex(
    characterRelation => characterRelation.status === relationStatus,
  )

  if (index === -1)
    throw new Error(`Character does not have relation ${relationStatus}`)

  character.value.relations.splice(index, 1)
}

const rel = computed(() => getRelation(relation.value.status))
</script>

<template>
  <div class="space-y-4">
    <div>
      <div class="flex items-center gap-4">
        <h3 class="font-bold text-lg">
          {{ relationCharacter.name }}
        </h3>

        <n-button quaternary circle size="small" @click="removeRelation(relation.status)">
          <template #icon>
            <n-icon class="ico-mdi-delete text-sm" />
          </template>
        </n-button>
      </div>
    </div>

    <div>
      Status: {{ rel.name }}
    </div>

    <div class="space-y-12">
      <div class="px-16">
        <n-slider
          v-model:value="relation.level"
          :marks="rel.levels.reduce((acc, level, index) => {
            acc[index] = level
            return acc
          }, {} as Record<number, string>)"
          :tooltip="false"
          :min="0"
          :max="rel.levels.length - 1"
        />
      </div>

      <div>
        <n-input
          v-model:value="relation.description"
          type="textarea"
          placeholder="Beschreibung"
          autosize
        />
      </div>
    </div>
  </div>
</template>
