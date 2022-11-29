<!--
* @Description: App 布局入口
* @Author: Wren Fan
* @Date: 2022-11-28 18:22:58
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-28 18:22:58
-->
<script lang="ts" setup>
import { computed } from 'vue'
import { device, sidebar } from './resize'
import { AppMain, Navbar, Sidebar } from './components'
import { Device } from '@/constant/device'
import { useAppStore } from '@/store/app'

const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    mobile: device.value === Device.Mobile,
    withoutAnimation: sidebar.value.withoutAnimation,
  }
})

const appStore = useAppStore()
// 关闭 Sidebar
const handleClickOutside = () => {
  appStore.closeSidebar(false)
}
</script>

<template>
  <div :class="classObj" class="app-wrapper" flex h-full w-full>
    <div v-if="classObj.mobile && sidebar.opened"
         class="drawer-bg"
         @click="handleClickOutside"
    />
    <Sidebar class="sidebar-container" h-full w-full />
    <div class="main-container" h-full w-full>
      <Navbar />
      <AppMain />
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-wrapper {
  .sidebar-container {
    width: 210px;
    background-color: pink;
  }

  .main-container {
    flex: 1;
    background-color: aquamarine;
  }
}
</style>
