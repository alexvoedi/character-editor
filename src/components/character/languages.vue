<script setup lang="ts">
import type { Language } from '@/data/languages'
import { LANGUAGES } from '@/data/languages'
import { useCharacterStore } from '@/store/character'
import { getLanguage } from '@/utils/get-language'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()

const { currentCharacter: character } = storeToRefs(characterStore)

const languageSelection = ref(null)

const unusedLanguages = computed(() => {
  return LANGUAGES.filter(language => !character.value.languages.some(characterLanguage => characterLanguage.id === language.id))
})

function addLanguage(languageId: Language) {
  const hasLanguage = character.value.languages.find(
    characterLanguage => characterLanguage.id === languageId,
  )

  if (hasLanguage)
    throw new Error(`Character already has trait ${languageId}`)

  const language = getLanguage(languageId)

  character.value.languages.unshift({
    id: language.id,
    level: 0,
  })

  languageSelection.value = null
}
</script>

<template>
  <n-form :show-feedback="false" class="space-y-4 pt-4 pb-8 space-y-8">
    <div class="px-8">
      <n-form-item label="Charaktereigenschaft">
        <n-select
          v-model:value="languageSelection"
          placeholder="Sprache hinzufügen"
          :options="unusedLanguages.sort((a, b) => a.name.localeCompare(b.name))"
          label-field="name"
          value-field="id"
          filterable
          @update:value="addLanguage"
        />
      </n-form-item>
    </div>

    <template v-if="character.languages.length > 0">
      <n-divider />

      <div class="space-y-12 px-8">
        <character-language
          v-for="language of character.languages"
          :key="language.id"
          v-model:character="character"
          v-model:language-id="language.id"
        />
      </div>
    </template>
  </n-form>
</template>
