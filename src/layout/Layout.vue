<!--
* @Description: App 布局入口
* @Author: Wren Fan
* @Date: 2022-11-28 18:22:58
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-28 18:22:58
-->
<script lang="ts" setup>
import { computed } from 'vue'
import { AppMain, Navbar, Sidebar } from './components'

const classObj = {
  num: 1,
}
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <Sidebar class="sidebar-container" />
    <Navbar class="navbar-container" />
    <AppMain class="app-main-container" />
  </div>
</template>

<style lang="less" scoped>

</style>
