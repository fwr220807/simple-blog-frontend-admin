import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouterType } from '@/typings/router'

const constantRoutes: RouterType = [
  {
    path: '/login',
    component: () => import('@/pages/login/index.vue'),
    hidden: true,
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
