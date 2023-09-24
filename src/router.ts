import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/characters',
    name: 'characters',
    component: () => import('./pages/characters/index.vue'),
  },
  {
    path: '/characters/:id',
    name: 'character',
    props: true,
    component: () => import('./pages/characters/character.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory('/character-editor/'),
  routes,
})

export { router }
