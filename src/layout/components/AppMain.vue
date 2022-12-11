<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
const toggleSidebar = appStore.toggleSidebar

const { locale } = useI18n()

const handleLocale = (lo: string) => {
  locale.value = lo
}
</script>

<template>
  <div>
    appmain
    <button @click="toggleSidebar">
      侧边栏伸缩
    </button>
    <br>
    <button class="bg-pink" @click="handleLocale('zh-CN')">
      切换成中文
    </button>
    <button class="bg-yellow" @click="handleLocale('en')">
      切换成英文
    </button>
    <br>
    <router-link to="/posts/view/hello/gou">
      测试按钮
    </router-link>
    <router-view />
  </div>
</template>

<style lang="less" scoped>
</style>
