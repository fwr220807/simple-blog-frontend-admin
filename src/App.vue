<!--
* @Description: App 页面
* @Author: Wren Fan
* @Date: 2022-11-28 16:49:51
* @LastEditTime: 2022-11-28 16:49:51
* @LastEditors: Wren Fan
-->
<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getPageTitle } from '@/utils/getPageTitle'
const { t, locale } = useI18n()

const route = useRoute()
// 监听路由变化和语言的设置，动态设置网页 page 标题
watch([() => route.path, locale], () => {
  document.title = getPageTitle(t(`route.${route.meta.title}`))
})
</script>

<template>
  <router-view />
</template>

<style>

</style>
