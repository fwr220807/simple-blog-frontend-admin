<script lang="ts" setup>
import { useRouter } from 'vue-router'
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
    <router-link to="/posts/view/hello/gou">
      测试按钮
    </router-link>
    <router-view />
  </div>
</template>

<style lang="less" scoped>
</style>
