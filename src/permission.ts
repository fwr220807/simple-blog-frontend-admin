/*
* @Description: 全局路由守卫配置 + 权限管理
* @Author: Wren Fan
* @Date: 2022-12-01 15:51:37
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-01 15:51:37
**/
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from './utils/cookies'
import { useUserStore } from './store/user'
import { usePermissionStore } from './store/permission'
import { getPageTitle } from '@/utils/getPageTitle'
import router from '@/router'
import type { RouterRowType } from '@/typings/router'

const whiteList = ['/login', '/404', '/401']
router.beforeEach(async (to, from, next) => {
  // 进度条开始加载
  NProgress.start()

  // 设置 page 标题
  document.title = getPageTitle(to.meta.title as string)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    }
    else {
      const userStore = useUserStore()
      const permissionStore = usePermissionStore()
      const hasRoles = userStore.roles && userStore.roles.length > 0
      // hasRoles 值意味着是否已经加载了权限路由
      if (hasRoles) {
        next()
      }
      else {
        // 获取计算权限路由
        try {
          await userStore.getInfo()
          const roles = userStore.roles

          const accessRoutes = await permissionStore.generateRoutes(roles)

          accessRoutes.forEach((route: RouterRowType) => {
            router.addRoute(route)
          })
        }
        catch (error) {
          await userStore.resetToken()
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  }
  else {
    // 无 token
    if (whiteList.includes(to.path)) {
      next()
    }
    else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
