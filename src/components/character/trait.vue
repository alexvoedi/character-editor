<script setup lang="ts">
import type { Trait } from '@/data/traits'
import { useCharacterStore } from '@/store/character'
import { getTrait } from '@/utils/get-trait'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()

const { currentCharacter: character } = storeToRefs(characterStore)

const traitId = defineModel<Trait>('traitId', { required: true })

function removeTrait(traitId: Trait) {
  const trait = getTrait(traitId)

  const index = character.value.traits.findIndex(
    characterTrait => characterTrait.id === trait.id,
  )

  if (index === -1)
    throw new Error(`Character does not have trait ${traitId}`)

  character.value.traits.splice(index, 1)
}

const trait = computed(() => getTrait(traitId.value))

const characterTrait = computed(() => {
  const trait = character.value.traits.find(characterTrait => characterTrait.id === traitId.value)

  if (!trait)
    throw new Error(`Character does not have trait ${traitId.value}`)

  return trait
})
</script>

<template>
  <div class="space-y-4">
    <div>
      <div class="flex items-center gap-4">
        <h3 class="font-bold text-lg">
          {{ trait.name }}
        </h3>

        <n-button quaternary circle size="small" @click="removeTrait(traitId)">
          <template #icon>
            <n-icon class="ico-mdi-delete text-sm" />
          </template>
        </n-button>
      </div>

      <div class="text-sm">
        {{ trait.description }}
      </div>
    </div>

    <div class="px-16">
      <n-slider
        v-model:value="characterTrait.value"
        :marks="trait.levels"
        step="mark"
        :tooltip="false"
        :min="0"
        :max="1"
      />
    </div>
  </div>
</template>
