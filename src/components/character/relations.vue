<script setup lang="ts">
import type { RelationStatus } from '@/data/relations'
import { RELATIONS } from '@/data/relations'
import { useCharacterStore } from '@/store/character'
import { getRelation } from '@/utils/get-relation'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()

const { currentCharacter: character } = storeToRefs(characterStore)

const relationSelection = ref(null)
const characterSelection = ref(null)

const unusedRelations = computed(() => {
  return RELATIONS.filter(relation => !character.value.relations.some(characterRelation => characterRelation.status === relation.id && !relation.multiple))
})

const unusedCharacters = computed(() => {
  return characterStore.characters.filter((otherCharacter) => {
    const isNotAlreadyRelated = !character.value.relations.some(relation => relation.id === otherCharacter.id)

    const isNotSelf = otherCharacter.id !== character.value.id

    return isNotAlreadyRelated && isNotSelf
  })
})

function addRelation(characterId: string, relationStatus: RelationStatus) {
  const relation = getRelation(relationStatus)

  if (!relation)
    throw new Error(`Relation ${relationStatus} not found`)

  const hasRelation = character.value.relations.find(
    characterRelation => characterRelation.status === relationStatus && !relation.multiple,
  )

  if (hasRelation)
    throw new Error(`Character already has relation ${relationStatus}`)

  character.value.relations.unshift({
    status: relationStatus,
    id: characterId,
    description: '',
  })

  characterSelection.value = null
  relationSelection.value = null
}
</script>

<template>
  <n-form :show-feedback="false" class="space-y-4 pt-4 pb-8 space-y-8">
    <div class="px-8 space-y-8">
      <n-form-item label="Charakter">
        <n-select
          v-model:value="characterSelection"
          placeholder="Beziehung hinzufügen"
          :options="unusedCharacters.map((character) => ({
            value: character.id,
            label: character.name,
          })).sort((a, b) => a.label.localeCompare(b.label))"
          filterable
        />
      </n-form-item>

      <n-form-item v-if="characterSelection" label="Beziehungsstatus">
        <n-select
          v-model:value="relationSelection"
          placeholder="Beziehung hinzufügen"
          :options="unusedRelations.sort((a, b) => a.name.localeCompare(b.name))"
          label-field="name"
          value-field="id"
          filterable
        />
      </n-form-item>

      <template v-if="characterSelection && relationSelection">
        <div class="flex justify-between">
          <div />
          <NButton type="primary" @click="addRelation(characterSelection, relationSelection)">
            Hinzufügen
          </NButton>
        </div>
      </template>
    </div>

    <template v-if="character.relations.length > 0">
      <n-divider />

      <div class="space-y-12 px-8">
        <character-relation
          v-for="(relation, index) of character.relations"
          :key="relation.status"
          v-model:character="character"
          v-model:relation="character.relations[index]"
        />
      </div>
    </template>
  </n-form>
</template>
