/*
* @Description: router 配置
* @Author: Wren Fan
* @Date: 2022-11-28 18:24:53
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-28 18:24:53
**/
// @unocss-include
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouterType } from '@/typings/router'

import Layout from '@/layout/Layout.vue'
import { usePermissionStore } from '@/store/permission'

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
    component: () => import('@/pages/404.vue'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/pages/401.vue'),
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
        meta: { title: 'Dashboard', icon: 'i-ant-design:dashboard-filled' },
      },
    ],
  },
  {
    path: '/posts',
    component: Layout,
    redirect: '/posts/view',
    meta: { title: 'Posts', icon: 'i-fluent:code-16-regular' },
    children: [
      {
        path: 'view',
        component: () => import('@/pages/posts/view.vue'),
        name: 'View',
        meta: { title: 'View', icon: 'i-ic:sharp-remove-red-eye' },
      },
      {
        path: 'edit',
        component: () => import('@/pages/posts/edit.vue'),
        name: 'Edit',
        meta: { title: 'Edit', icon: 'i-tabler:edit' },
      },
      {
        path: 'category',
        component: () => import('@/pages/posts/category.vue'),
        name: 'Category',
        meta: { title: 'Category', icon: 'i-ic:baseline-class' },
      },
    ],
  },
  {
    path: '/comments',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Comments',
        component: () => import('@/pages/comments/index.vue'),
        meta: { title: 'Comments', icon: 'i-fluent:comment-multiple-28-filled' },
      },
    ],
  },
  {
    path: '/projects',
    component: Layout,
    redirect: '/projects/list',
    meta: { title: 'Projects', icon: 'i-fluent-mdl2:test-beaker-solid' },
    children: [
      {
        path: 'list',
        name: 'ProjectsList',
        component: () => import('@/pages/projects/list.vue'),
        meta: { title: 'ProjectsList', icon: 'i-ic:sharp-remove-red-eye' },
      },
      {
        path: 'edit',
        name: 'ProjectsEdit',
        component: () => import('@/pages/projects/edit.vue'),
        meta: { title: 'ProjectsEdit', icon: 'i-tabler:edit' },
      },
    ],
  },
  {
    path: '/friends',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Friends',
        component: () => import('@/pages/friends/index.vue'),
        meta: { title: 'Friends', icon: 'i-ion:people' },
      },
    ],
  },
]

export const asyncRoutes: RouterType = [
  {
    path: '/permission',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Permission',
        component: () => import('@/pages/permission/index.vue'),
        meta: { title: 'Permission', roles: ['admin'], icon: 'i-fluent-mdl2:permissions-solid' },
      },
    ],
  },
  // 匹配 404 路由必须要放到最后
  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})
// 用于退出登录后清除动态添加的路由
export const resetRouter = () => {
  const permissionStore = usePermissionStore()
  const dynamicRoutesNameArr = permissionStore.dynamicRoutes.map(majorRoute => majorRoute.name as string)
  dynamicRoutesNameArr.forEach((name) => {
    if (router.hasRoute(name))
      router.removeRoute(name)
  })
}

export default router
