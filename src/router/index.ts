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

export const constantRoutes: RouterType = [
  // ** 这个 /redirect 路由还不知道干啥用的
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/pages/redirect.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/pages/login/login.vue'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
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
        meta: { title: 'Dashboard' },
      },
    ],
  },
]

export const asyncRoutes: RouterType = []

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
