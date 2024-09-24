<script setup lang="ts">
import type { Profession } from '@/data/professions'
import { PROFESSIONS } from '@/data/professions'
import { useCharacterStore } from '@/store/character'
import { getProfession } from '@/utils/get-profession'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()

const { currentCharacter: character } = storeToRefs(characterStore)

const professionSelection = ref(null)

const unusedProfessions = computed(() => {
  return PROFESSIONS.filter(profession => !character.value.professions.some(characterProfession => characterProfession.id === profession.id))
})

function addProfession(professionId: Profession) {
  const hasProfession = character.value.professions.find(
    characterProfession => characterProfession.id === professionId,
  )

  if (hasProfession)
    throw new Error(`Character already has profession ${professionId}`)

  const profession = getProfession(professionId)

  character.value.professions.unshift({
    id: profession.id,
    level: 0,
  })

  professionSelection.value = null
}
</script>

<template>
  <n-form :show-feedback="false" class="space-y-4 pt-4 pb-8 space-y-8">
    <div class="px-8">
      <n-form-item label="Charaktereigenschaft">
        <n-select
          v-model:value="professionSelection"
          placeholder="Profession hinzufügen"
          :options="unusedProfessions.sort((a, b) => a.name.localeCompare(b.name))"
          label-field="name"
          value-field="id"
          filterable
          @update:value="addProfession"
        />
      </n-form-item>
    </div>

    <template v-if="character.professions.length > 0">
      <n-divider />

      <div class="space-y-12 px-8">
        <character-profession
          v-for="profession of character.professions"
          :key="profession.id"
          v-model:character="character"
          v-model:profession-id="profession.id"
        />
      </div>
    </template>
  </n-form>
</template>
