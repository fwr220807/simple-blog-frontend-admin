<!--
* @Description: 根据 to 的值来判断使用 router-link 组件或 a 标签
* @Author: Wren Fan
* @Date: 2022-12-02 17:12:25
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-02 17:12:25
-->
<script lang="ts" setup>
import { isExternal } from '@/utils/validate'
defineProps({
  to: { type: String, required: true },
})
</script>

<template>
  <!-- 根据判断是否是外链切换不同的标签和行为 -->
  <div>
    <a v-if="isExternal(to)" v-bind="$attrs" :href="to" rel="noopener" target="_blank">
      <slot />
    </a>
    <router-link v-else v-bind="$props">
      <slot />
    </router-link>
  </div>
</template>

<style lang="less" scoped>

</style>
