<!--
* @Description: 面包屑组件
* @Author: Wren Fan
* @Date: 2022-12-08 16:05:12
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-08 16:05:12
-->

<script lang="ts" setup>
import type { RouteLocation, RouteLocationMatched } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'
import { ref, watch } from 'vue'

const route = useRoute()
// 判断当前匹配的的一个父路由是不是 dashboard
const isDashboard = (route: RouteLocationMatched) => {
  const name = route.name
  if (!name)
    return false

  return (name as string).trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
// 面包屑数据存储
const breadcrumbs = ref<Array<RouteLocationMatched>>([])
// 获取面包屑数据
const getBreadcrumb = () => {
  // 过滤 route.matched 的匹配数据，没有 meta 和 meta.title 的就过滤掉
  // 像只有 1 个子路由，父路由因为没有 meta 会被过滤掉
  let matched = route.matched.filter(item => item.meta && item.meta.title)
  const first = matched[0]

  if (!isDashboard(first))
    matched = [{ path: '/dashboard', meta: { title: 'dashboard' } } as any].concat(matched)

  breadcrumbs.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}
// 如果带了 params ，则将 params 带给下个转跳
const pathCompile = (path: string) => {
  const { params } = route
  const toPath = compile(path)

  return toPath(params)
}

const router = useRouter()
const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item
  // 这种情况适用于有多个子路由的情况，对应的父路由要设置 redirect 属性，否则到时候点击对应的父路由面包屑会无跳转
  if (redirect) {
    router.push(redirect as RouteLocation)
    return
  }
  // 感觉这里用不上，因为最里的面包屑无法点击跳转，前面的面包屑都会走上面 redirect 的路
  if (path)
    router.push(pathCompile(path))
}

// 检测路由变化，及时更新 breadcrumbs
watch(() => route.path, (path) => {
  if (path.startsWith('/redirect/'))
    return

  getBreadcrumb()
},
{ immediate: true })
</script>

<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="item, index in breadcrumbs" :key="item.path">
      <span v-if="(item.redirect === 'noredirect' || index === breadcrumbs.length - 1)">{{ item.meta.title }}</span>
      <a v-else @click="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="less" scoped>

</style>
