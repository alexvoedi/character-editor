<script setup lang="ts">
import { darkTheme } from 'naive-ui'

const theme = ref(darkTheme)
</script>

<template>
  <n-config-provider :theme="theme" abstract>
    <n-layout has-sider class="h-full">
      <n-layout-sider content-style="padding: 12px;">
        <app-nav />
      </n-layout-sider>

      <n-scrollbar trigger="none">
        <main class="h-full w-full overflow-y-auto">
          <div class="p-8 container mx-auto">
            <router-view />
          </div>
        </main>
      </n-scrollbar>
    </n-layout>
  </n-config-provider>
</template>

<style>
html, body, #app {
  background-color: rgb(16, 16, 20);
  color: rgba(255, 255, 255, 0.82);
  height: 100vh;
  overflow: hidden;
}
</style>
