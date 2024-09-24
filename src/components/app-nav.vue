<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'

function renderIcon(icon: string) {
  return () => h('n-icon', {
    class: icon,
  })
}

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
    icon: renderIcon('ico-mdi-home'),
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
    icon: renderIcon('ico-mdi-account-group'),
  },
  {
    label: () => h(
      RouterLink,
      {
        to: {
          name: 'fractions',
        },
      },
      {
        default: () => 'Fraktionen',
      },
    ),
    key: 'fractions',
    icon: renderIcon('ico-mdi-format-section'),
  },
]
</script>

<template>
  <div class="flex items-center justify-center pt-8">
    <n-h2>Story Creator</n-h2>
  </div>
  <n-menu :options="menuOptions" />
</template>
