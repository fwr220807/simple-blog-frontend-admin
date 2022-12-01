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
import Logo from './Logo.vue'
import { useSettingsStore } from '@/store/settings'
import { useAppStore } from '@/store/app'

const settingsStore = useSettingsStore()
const showLogo = computed(() => settingsStore.showSidebarLogo)

const appStore = useAppStore()
const isCollapse = computed(() => appStore.sidebar.opened)
</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="false" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="1" :collapse="isCollapse" background-color="#fff" text-color="#333" active-text-color="#123456" :collapse-transition="false">
        <SidebarItem />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="less" scoped>
</style>
