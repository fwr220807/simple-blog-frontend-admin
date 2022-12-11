<!--
* @Description: 侧边栏 item
* @Author: Wren Fan
* @Date: 2022-12-01 10:13:17
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-07 10:13:17
-->
<script lang="ts" setup>
import { resolve } from 'path'
import { computed, ref } from 'vue'
import ItemLink from './ItemLink.vue'
import ItemLogo from './ItemLogo.vue'
import type { RouteRowType, RouterType } from '@/typings/router'
import { isExternal } from '@/utils/validate'
import { useAppStore } from '@/store/app'

const props = defineProps<{
  item: RouteRowType
  isNest?: boolean
  basePath: string
}>()

// 从仓库提取侧边栏的打开关闭状态，用于控制侧边栏 el-sub-menu 标题的内容隐藏显示
// el-menu-item 不需要，因为 #title 插槽提供了类似的功能
const appStore = useAppStore()
const isCollapse = computed(() => appStore.sidebar.opened)

const onlyOneChild: any = ref(null)
// showSidebarItem 用于判断当前 route 是否直接自己或显示其 children（只有1个 children 的情况）
const showSidebarItem = (children: RouterType = [], parent: RouteRowType) => {
  const showingChildren = children.filter((item: RouteRowType) => {
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
            <template #title>
              <span m-l-10px class="item-title">{{ onlyOneChild.meta?.title }}</span>
            </template>
          </el-menu-item>
        </ItemLink>
      </template>
      <!-- 有多个  children route 的情况 -->
      <el-sub-menu v-else :index="resolvePath(item.path)">
        <template v-if="item.meta" #title>
          <ItemLogo :meta="item.meta" />
          <span v-if="isCollapse" m-l-10px class="item-title">{{ item.meta?.title }}</span>
        </template>
        <SidebarItem v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)" />
      </el-sub-menu>
    </template>
  </div>
</template>

<style lang="less" scoped>

</style>
