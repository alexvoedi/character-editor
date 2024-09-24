<script setup lang="ts">
const selectedTab = ref('common')
</script>

<template>
  <n-h1>Charaktereditor</n-h1>

  <n-card
    class="space-y-6 p-0"
    content-class="p-0!"
  >
    <n-tabs
      v-model:value="selectedTab"
      type="line"
      default-value="common"
      size="large"
      justify-content="space-evenly"
    >
      <n-tab-pane name="common" tab="Allgemein">
        <character-common />
      </n-tab-pane>

      <n-tab-pane name="traits" tab="Eigenschaften">
        <character-traits />
      </n-tab-pane>

      <n-tab-pane name="professions" tab="Professionen">
        <character-professions />
      </n-tab-pane>

      <n-tab-pane name="languages" tab="Sprachen">
        <character-languages />
      </n-tab-pane>

      <n-tab-pane name="relations" tab="Beziehungen">
        <character-relations />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<style>
.sticky-card {
  height: 500px;
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
