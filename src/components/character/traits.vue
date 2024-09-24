<script setup lang="ts">
import type { Trait } from '@/data/traits'
import { TRAITS } from '@/data/traits'
import { useCharacterStore } from '@/store/character'
import { getTrait } from '@/utils/get-trait'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()

const { currentCharacter: character } = storeToRefs(characterStore)

const traitSelection = ref(null)

const unusedTraits = computed(() => {
  return TRAITS.filter(trait => !character.value.traits.some(characterTrait => characterTrait.id === trait.id))
})

function addTrait(traitId: Trait) {
  const hasTrait = character.value.traits.find(
    characterTrait => characterTrait.id === traitId,
  )

  if (hasTrait)
    throw new Error(`Character already has trait ${traitId}`)

  const trait = getTrait(traitId)

  character.value.traits.unshift({
    id: trait.id,
    value: 0.5,
  })

  traitSelection.value = null
}
</script>

<template>
  <n-form :show-feedback="false" class="space-y-4 pt-4 pb-8 space-y-8">
    <div class="px-8">
      <n-form-item label="Charaktereigenschaft">
        <n-select
          v-model:value="traitSelection"
          placeholder="Charaktereigenschaft hinzufügen"
          :options="unusedTraits.sort((a, b) => a.name.localeCompare(b.name))"
          label-field="name"
          value-field="id"
          filterable
          @update:value="addTrait"
        />
      </n-form-item>
    </div>

    <template v-if="character.traits.length > 0">
      <n-divider />

      <div class="space-y-18 px-8">
        <character-trait
          v-for="trait of character.traits"
          :key="trait.id"
          v-model:character="character"
          v-model:trait-id="trait.id"
        />
      </div>
    </template>
  </n-form>
</template>
