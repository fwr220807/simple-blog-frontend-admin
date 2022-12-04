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
import Logo from './SidebarLogo.vue'
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
    <Logo v-if="showLogo" :collapse="false" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu default-active="1" :collapse="isCollapse" background-color="#fff" text-color="#333" active-text-color="#123456" :collapse-transition="false">
        <SidebarItem v-for="route in permissionStore.routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="less" scoped>
</style>
