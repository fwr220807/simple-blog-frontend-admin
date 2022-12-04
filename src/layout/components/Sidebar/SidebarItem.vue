<!--
* @Description: 侧边栏 item
* @Author: Wren Fan
* @Date: 2022-12-01 10:13:17
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-01 10:13:17
-->
<script lang="ts" setup>
import { resolve } from 'path'
import { ref } from 'vue'
import ItemLink from './ItemLink.vue'
import ItemLogo from './ItemLogo.vue'
import type { RouteItemType } from '@/typings/router'
import { isExternal } from '@/utils/validate'

const props = defineProps({
  // route Item
  item: { type: Object, required: true },
  // 用于判断是不是子Item
  isNest: { type: Boolean, default: false },
  // 基础路径，用于拼接？
  basePath: { type: String, default: '' },
})

const onlyOneChild: any = ref(null)
// showSidebarItem 用于判断当前 route 是否直接自己或显示其 children（只有1个 children 的情况）
const showSidebarItem = (children = [], parent: RouteItemType) => {
  const showingChildren = children.filter((item: RouteItemType) => {
    if (item.hidden) {
      return false
    }
    else {
      onlyOneChild.value = item
      return true
    }
  })

  if (showingChildren.length === 1)
    return true
  if (showingChildren.length === 0) {
    // 如果没有子元素，则把父亲 parent 赋值给 onlyOneChild
    onlyOneChild.value = { ...parent, path: '', noChildren: true }
    return true
  }

  return false
}

const resolvePath = (routePath: string) => {
  // 如果是当前 route 的 path 是外部链接，则不处理直接返回
  if (isExternal(routePath))
    return routePath
  //  如果子 route 父亲的 path 是外部链接，则返回父亲传入的 basePath
  if (isExternal(props.basePath))
    return props.basePath
  // 如果都不是，则返回拼接好的路径
  return resolve(props.basePath, routePath)
}
</script>

<template>
  <div>
    <template v-if="!item.hidden">
      <!-- 只有一个或 0 个 children route 的情况 -->
      <template v-if="showSidebarItem(item.children, item)">
        <ItemLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
          <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
            <ItemLogo :meta="onlyOneChild.meta" />
            <!-- 具名插槽 #title 等价于 v-slot="title" -->
            <template #title>
              {{ onlyOneChild.meta?.title }}
            </template>
          </el-menu-item>
        </ItemLink>
      </template>
      <!-- 有多个  children route 的情况 -->
      <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
        <template v-if="item.meta" #title>
          <ItemLogo :meta="item.meta" />
          <span>{{ item.meta.title }}</span>
        </template>
        <SidebarItem v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)" />
      </el-sub-menu>
    </template>
  </div>
</template>

<style lang="less" scoped>

</style>
