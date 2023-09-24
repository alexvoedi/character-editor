<script setup lang="ts">
import { useBaseStore } from '../../store/base'
import { TRAITS } from '@/data/traits'
import type { Trait } from '@/enums/Trait'

const props = defineProps<{
  id: string
}>()

const store = useBaseStore()

const traitSelection = ref(null)

const character = computed(() => {
  const result = store.characters.find(character => character.id === props.id)

  if (!result)
    throw new Error(`Character with id ${props.id} not found`)

  return result
})

function getTrait(traitId: string) {
  const trait = TRAITS.find(trait => trait.id === traitId)

  if (!trait)
    throw new Error(`Trait with id ${traitId} not found`)

  return trait
}

const unusedTraits = computed(() => {
  return TRAITS.filter(trait => !character.value.traits.find(characterTrait => characterTrait.id === trait.id))
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
    value: 50,
  })

  traitSelection.value = null
}

function removeTrait(traitId: Trait) {
  const trait = getTrait(traitId)

  const index = character.value.traits.findIndex(
    characterTrait => characterTrait.id === trait.id,
  )

  if (index === -1)
    throw new Error(`Character does not have trait ${traitId}`)

  character.value.traits.splice(index, 1)
}
</script>

<template>
  <n-card title="Charaktereditor">
    <n-form-item label="Name">
      <n-input v-model:value="character.name" type="text" placeholder="Name" />
    </n-form-item>

    <n-form-item label="Alter">
      <n-input-number v-model:value="character.age" placeholder="Alter" :min="0" :step="1" />
    </n-form-item>

    <div class="space-y-4">
      <n-h4>Eigenschaften</n-h4>

      <n-select
        v-model:value="traitSelection"
        placeholder="Charaktereigenschaft hinzufügen"
        :options="unusedTraits.sort((a, b) => a.name.localeCompare(b.name))"
        label-field="name"
        value-field="id"
        filterable
        @update:value="addTrait"
      />

      <div>
        <div v-for="trait of character.traits" :key="trait.id" class="pb-8">
          <div class="flex items-center gap-3">
            <h5 class="font-bold">
              {{ getTrait(trait.id).name }}
            </h5>

            <n-button quaternary circle size="small" @click="removeTrait(trait.id)">
              <template #icon>
                <n-icon class="ico-mdi-delete text-sm" />
              </template>
            </n-button>
          </div>

          <div class="text-xs">
            {{ getTrait(trait.id).description }}
          </div>

          <div class="px-8">
            <n-slider
              v-model:value="trait.value" :marks="{
                0: 'Trifft nicht zu',
                25: '',
                50: 'Trifft teilweise zu',
                75: '',
                100: 'Trifft zu',
              }" :step="12.5" :format-tooltip="(value: number) => `${value}%`" :min="0" :max="100"
            />
          </div>
        </div>
      </div>
    </div>
  </n-card>
</template>

<style>
</style>
