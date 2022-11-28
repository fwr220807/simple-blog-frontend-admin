<!--
* @Description: Sidebar component
* @Author: Wren Fan
* @Date: 2022-11-28 23:16:48
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-28 23:16:48
-->
<script lang="ts" setup>
import Logo from './Logo.vue'
const showLogo = false
</script>

<template>
  <div :class="{ 'has-logo': showLogo }">
    sidebar
    <!-- <Logo :collapse="false" /> -->
  </div>
</template>

<style lang="less" scoped>
</style>
