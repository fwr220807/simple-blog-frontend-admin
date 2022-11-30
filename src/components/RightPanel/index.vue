<!--
* @Description:
* @Author: Wren Fan
* @Date: 2022-11-30 10:04:25
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-30 10:04:25
-->

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSettingsStore } from '@/store/settings'

defineProps({
  buttonTop: {
    type: Number,
    default: 250,
  },
})
const settingsStore = useSettingsStore()
const theme = computed(() => settingsStore.theme)
const show = ref(false)
</script>

<template>
  <div class="handle-button text-#fff" :style="{ top: `${buttonTop}px`, backgroundColor: theme }" absolute right-0px w-48px h-48px lh-48px text-center z-99 cursor-pointer pointer-events-auto @click="(show = true)">
    <div text-24px lh-48px :class="show ? 'i-ep:close' : 'i-ep:setting'" />
  </div>
  <el-drawer v-model="show" title="设置" size="300px" destroy-on-close>
    <slot />
  </el-drawer>
</template>

<style lang="less" scoped>
.handle-button {
  border-radius: 6px 0 0 6px
}
</style>

