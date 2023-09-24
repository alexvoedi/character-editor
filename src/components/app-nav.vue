<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'

const menuOptions: MenuOption[] = [
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'home',
        },
      },
      {
        default: () => 'Start',
      },
    ),
    key: 'home',
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'characters',
        },
      },
      {
        default: () => 'Charaktere',
      },
    ),
    key: 'characters',
  },
]
</script>

<template>
  <n-menu :options="menuOptions" />
</template>

<style>

</style>
