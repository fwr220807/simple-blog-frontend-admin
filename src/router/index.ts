/*
* @Description: router 配置
* @Author: Wren Fan
* @Date: 2022-11-28 18:24:53
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-28 18:24:53
**/
// 下面这个注释勿删！！！否则侧边栏的图标显示不出来
// @unocss-include
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouterType } from '@/typings/router'
import Layout from '@/layout/Layout.vue'
import { usePermissionStore } from '@/store/permission'

// 常量路由，任何用户都可以访问
// meta 的 title 属性存储的是 i18n 国际化配置的属性，具体设置在 @/locales
export const constantRoutes: RouterType = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/pages/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/pages/login/login.vue'),
    meta: { title: 'login' },
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
        name: 'dashboard',
        component: () => import('@/pages/dashboard/dashboard.vue'),

        meta: { title: 'dashboard', icon: 'i-ant-design:dashboard-filled', affix: true },
      },
    ],
  },
  {
    path: '/posts',
    component: Layout,
    redirect: '/posts/view',
    meta: { title: 'posts', icon: 'i-fluent:code-16-regular' },
    children: [
      {
        path: 'view',
        component: () => import('@/pages/posts/view.vue'),
        name: 'postsView',
        meta: { title: 'posts-view', icon: 'i-ic:sharp-remove-red-eye' },
      },
      {
        path: 'edit',
        component: () => import('@/pages/posts/edit.vue'),
        name: 'postsEdit',
        meta: { title: 'posts-edit', icon: 'i-tabler:edit' },
      },
      {
        path: 'category',
        component: () => import('@/pages/posts/category.vue'),
        name: 'postsCategory',
        meta: { title: 'posts-category', icon: 'i-ic:baseline-class' },
      },
    ],
  },
  {
    path: '/comments',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'comments',
        component: () => import('@/pages/comments/index.vue'),
        meta: { title: 'comments', icon: 'i-fluent:comment-multiple-28-filled' },
      },
    ],
  },
  {
    path: '/projects',
    component: Layout,
    redirect: '/projects/list',
    meta: { title: 'projects', icon: 'i-fluent-mdl2:test-beaker-solid' },
    children: [
      {
        path: 'list',
        name: 'projectsList',
        component: () => import('@/pages/projects/list.vue'),
        meta: { title: 'projects-list', icon: 'i-ic:sharp-remove-red-eye' },
      },
      {
        path: 'edit',
        name: 'projectsEdit',
        component: () => import('@/pages/projects/edit.vue'),
        meta: { title: 'projects-edit', icon: 'i-tabler:edit' },
      },
    ],
  },
  {
    path: '/friends',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'friends',
        component: () => import('@/pages/friends/index.vue'),
        meta: { title: 'friends', icon: 'i-ion:people' },
      },
    ],
  },
]
// 动态路由
export const asyncRoutes: RouterType = [
  {
    path: '/permission',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'permission',
        component: () => import('@/pages/permission/index.vue'),
        meta: { title: 'permission', roles: ['admin'], icon: 'i-fluent-mdl2:permissions-solid' },
      },
    ],
  },
  // 匹配 404 路由必须要放到最后
  { path: '/:pathMatch(.*)*', name: 'notFound404', redirect: '/404', hidden: true },
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
