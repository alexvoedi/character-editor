<script setup lang="ts">
import type { Profession } from '@/data/professions'
import { useCharacterStore } from '@/store/character'
import { getProfession } from '@/utils/get-profession'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()

const { currentCharacter: character } = storeToRefs(characterStore)

const professionId = defineModel<Profession>('professionId', { required: true })

function removeProfession(professionId: Profession) {
  const profession = getProfession(professionId)

  const index = character.value.professions.findIndex(
    characterProfession => characterProfession.id === profession.id,
  )

  if (index === -1)
    throw new Error(`Character does not have profession ${professionId}`)

  character.value.professions.splice(index, 1)
}

const profession = computed(() => getProfession(professionId.value))

const characterProfession = computed(() => {
  const profession = character.value.professions.find(characterProfession => characterProfession.id === professionId.value)

  if (!profession)
    throw new Error(`Character does not have profession ${professionId.value}`)

  return profession
})
</script>

<template>
  <div class="space-y-4">
    <div>
      <div class="flex items-center gap-4">
        <h3 class="font-bold text-lg">
          {{ profession.name }}
        </h3>

        <n-button quaternary circle size="small" @click="removeProfession(professionId)">
          <template #icon>
            <n-icon class="ico-mdi-delete text-sm" />
          </template>
        </n-button>
      </div>

      <div class="text-sm">
        {{ profession.description }}
      </div>
    </div>

    <div>
      <div class="px-16">
        <n-slider
          v-model:value="characterProfession.level"
          :marks="profession.levels.reduce((acc, level, index) => {
            acc[index] = level.name
            return acc
          }, {} as Record<number, string>)"
          :tooltip="false"
          :min="0"
          :max="profession.levels.length - 1"
        />
      </div>

      <div>
        {{ profession.levels[characterProfession.level].description }}
      </div>
    </div>
  </div>
</template>
