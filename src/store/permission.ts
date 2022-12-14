/*
* @Description: 路由权限管理
* @Author: Wren Fan
* @Date: 2022-12-01 10:49:25
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-01 10:49:25
**/
import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '@/router'
import type { RouteRowType, RouterType } from '@/typings/router'
// 判断权限逻辑
const hasPermission = (roles: Array<string>, route: RouteRowType) => {
  if (route.meta && route.meta.roles)
    return roles.some(role => route.meta?.roles?.includes(role))
  else
    return true
}

// 根据 roles 递推过滤有权限的路由
export const filterAsyncRoutes = (routes: RouterType, roles: Array<string>): RouterType => {
  const res: RouterType = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children)
        tmp.children = filterAsyncRoutes(tmp.children, roles)

      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore('permission', {
  state: () => {
    return {
      routes: [] as RouterType,
      dynamicRoutes: [] as RouterType,
    }
  },
  actions: {
    // 根据权限数组筛选动态路由
    generateRoutes(roles: Array<string>) {
      return new Promise<RouterType>((resolve) => {
        const accessedRoutes = roles.includes('admin') ? asyncRoutes : filterAsyncRoutes(asyncRoutes, roles)

        this.dynamicRoutes = accessedRoutes
        this.routes = constantRoutes.concat(accessedRoutes)
        resolve(accessedRoutes)
      })
    },
  },
})
