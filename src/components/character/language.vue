<script setup lang="ts">
import { type Language, LANGUAGE_LEVELS } from '@/data/languages'
import { useCharacterStore } from '@/store/character'
import { getLanguage } from '@/utils/get-language'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()

const { currentCharacter: character } = storeToRefs(characterStore)

const languageId = defineModel<Language>('languageId', { required: true })

function removeLanguage(languageId: Language) {
  const language = getLanguage(languageId)

  const index = character.value.languages.findIndex(
    characterLanguage => characterLanguage.id === language.id,
  )

  if (index === -1)
    throw new Error(`Character does not have language ${languageId}`)

  character.value.languages.splice(index, 1)
}

const language = computed(() => getLanguage(languageId.value))

const characterLanguage = computed(() => {
  const language = character.value.languages.find(characterLanguage => characterLanguage.id === languageId.value)

  if (!language)
    throw new Error(`Character does not have language ${languageId.value}`)

  return language
})
</script>

<template>
  <div class="space-y-4">
    <div>
      <div class="flex items-center gap-4">
        <h3 class="font-bold text-lg">
          {{ language.name }}
        </h3>

        <n-button quaternary circle size="small" @click="removeLanguage(languageId)">
          <template #icon>
            <n-icon class="ico-mdi-delete text-sm" />
          </template>
        </n-button>
      </div>

      <div class="text-sm">
        {{ language.description }}
      </div>
    </div>

    <div>
      <div class="px-16">
        <n-slider
          v-model:value="characterLanguage.level"
          :marks="LANGUAGE_LEVELS.reduce((acc, level, index) => {
            acc[index] = level.name
            return acc
          }, {} as Record<number, string>)"
          :tooltip="false"
          :min="0"
          :max="LANGUAGE_LEVELS.length - 1"
        />
      </div>

      <div>
        {{ LANGUAGE_LEVELS[characterLanguage.level].description }}
      </div>
    </div>
  </div>
</template>
