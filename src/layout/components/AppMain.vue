<script lang="ts" setup>
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const toggleSidebar = appStore.toggleSidebar
</script>

<template>
  <div>
    appmain
    <button @click="toggleSidebar">
      侧边栏伸缩
    </button>
  </div>
</template>

<style lang="less" scoped>
</style>
