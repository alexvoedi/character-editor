import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

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
  {
    path: '/fractions',
    name: 'fractions',
    component: () => import('./pages/fractions/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }
