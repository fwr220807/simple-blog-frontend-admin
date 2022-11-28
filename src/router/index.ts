/*
* @Description: router 配置
* @Author: Wren Fan
* @Date: 2022-11-28 18:24:53
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-28 18:24:53
**/
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouterType } from '@/typings/router'

import Layout from '@/layout/Layout.vue'

const constantRoutes: RouterType = [
  {
    path: '/login',
    component: () => import('@/pages/login/login.vue'),
    hidden: true,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard/dashboard.vue'),
        // using el svg icon, the elSvgIcon first when at the same time using elSvgIcon and icon
        meta: { title: 'Dashboard', elSvgIcon: 'Fold' },
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
