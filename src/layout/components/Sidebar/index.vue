<!--
* @Description: Sidebar component
* @Author: Wren Fan
* @Date: 2022-11-28 23:16:48
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-28 23:16:48
-->
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import { useSettingsStore } from '@/store/settings'
import { useAppStore } from '@/store/app'
import { usePermissionStore } from '@/store/permission'

const settingsStore = useSettingsStore()
const showLogo = computed(() => settingsStore.showSidebarLogo)

const appStore = useAppStore()
const isCollapse = computed(() => appStore.sidebar.opened)
const route = useRoute()
const activeMenu = computed(() => {
  const { meta, path } = route
  // activeMenu 还不知道干嘛用
  if (meta.activeMenu)
    return meta.activeMenu

  return path
})

const permissionStore = usePermissionStore()
</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    <el-scrollbar wrap-class="scrollbar-wrapper" view-style="height: 100%">
      <!-- 侧边栏的 Logo -->
      <SidebarLogo v-if="showLogo" :collapse="!isCollapse" bg-white />
      <!-- 侧边栏 -->
      <el-menu class="el-menu-vertical" :default-active="activeMenu" :collapse="!isCollapse" background-color="#fff" text-color="#333" active-text-color="#123456" :collapse-transition="false">
        <SidebarItem v-for="routeItem in permissionStore.routes" :key="routeItem.path" :item="routeItem" :base-path="routeItem.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="less" scoped>
.el-menu-vertical {
  width: 100%;
  height: calc(100%-54px);
  user-select: none;
  // 清除 el-menu 的样式
  border-right:0px;
}
</style>
