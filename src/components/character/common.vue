<script setup lang="ts">
import { SEX } from '@/data/sex'
import { SPECIES } from '@/data/species'
import { useCharacterStore } from '@/store/character'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()

const { currentCharacter: character } = storeToRefs(characterStore)
</script>

<template>
  <n-form :show-feedback="false" class="space-y-4 px-8 pt-4 pb-8">
    <n-form-item label="Name">
      <n-input v-model:value="character.name" type="text" placeholder="Name" />
    </n-form-item>

    <n-form-item label="Alter">
      <n-input-number v-model:value="character.age" placeholder="Alter" :min="0" :step="1" />
    </n-form-item>

    <n-grid :span="24" :x-gap="24">
      <n-form-item-gi :span="12" label="Geschlecht">
        <n-select
          v-model:value="character.sex" placeholder="Geschlecht" :options="SEX.map((sex) => ({
            label: sex.name,
            value: sex.id,
          }))"
        />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="Spezies" show-feedback :feedback="SPECIES.find((species) => species.id === character.species)?.description">
        <n-select
          v-model:value="character.species" placeholder="Spezies" :options="SPECIES.map((species) => ({
            label: species.name,
            value: species.id,
          }))"
        />
      </n-form-item-gi>
    </n-grid>

    <n-form-item label="Beschreibung" type="text" placeholder="Beschreibung">
      <n-input
        v-model:value="character.description"
        type="textarea"
        placeholder="Beschreibung"
      />
    </n-form-item>
  </n-form>
</template>
