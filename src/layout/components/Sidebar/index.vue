<!--
* @Description: Sidebar component
* @Author: Wren Fan
* @Date: 2022-11-28 23:16:48
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-28 23:16:48
-->
<script lang="ts" setup>
import { computed, ref } from 'vue'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import { useSettingsStore } from '@/store/settings'
import { useAppStore } from '@/store/app'
import { usePermissionStore } from '@/store/permission'

const settingsStore = useSettingsStore()
const showLogo = computed(() => settingsStore.showSidebarLogo)

const appStore = useAppStore()
const isCollapse = computed(() => appStore.sidebar.opened)

const permissionStore = usePermissionStore()
</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    <el-scrollbar wrap-class="scrollbar-wrapper" view-style="height: 100%">
      <SidebarLogo v-if="showLogo" :collapse="!isCollapse" bg-white />
      <el-menu class="el-menu-vertical" default-active="1" :collapse="!isCollapse" background-color="#fff" text-color="#333" active-text-color="#123456" :collapse-transition="false">
        <SidebarItem v-for="route in permissionStore.routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="less" scoped>
.el-menu-vertical {
  width: 100%;
  height: 100%;
  user-select: none;
  // 清除 el-menu 的样式
  border-right:0px;
}
</style>
