<script setup lang="ts">
import { useFractionStore } from '@/store/fraction'

const fractionStore = useFractionStore()

function createFraction() {
  // implement
}

const columns = ref([])
</script>

<template>
  <n-card title="Fraktionen" content-class="p-0!">
    <template #header-extra>
      <NButton @click="createFraction()">
        Erstellen
      </NButton>
    </template>

    <n-data-table :columns="columns" :data="fractionStore.fractions" />
  </n-card>
</template>
