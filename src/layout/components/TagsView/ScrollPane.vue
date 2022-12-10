<!--
* @Description:
* @Author: Wren Fan
* @Date: 2022-12-10 17:25:39
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-10 17:25:39
-->
<script lang="ts" setup>
import { ElScrollbar } from 'element-plus'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { throttle } from 'lodash'

const emits = defineEmits(['scroll'])
// InstanceType<typeof ElScrollbar> 用于获取 ElScrollbar 子组件的暴露的对象类型
const scrollContainer = ref<InstanceType<typeof ElScrollbar> | null>(null)
// 插槽 slot 的 dom
const wrapRef = scrollContainer.value?.wrap$

// 控制 scroll 的回调函数
const handleScroll = (event: WheelEvent) => {
  const eventDelta = -event.deltaY * 40
  wrapRef && (wrapRef.scrollLeft += eventDelta / 4)
}

const emitScroll = throttle(() => {
  emits('scroll')
}, 300, { trailing: true })

onMounted(() => {
  // 为啥设置为 true 即捕获阶段的回调函数
  wrapRef?.addEventListener('scroll', emitScroll, true)
})
onBeforeUnmount(() => {
  wrapRef?.removeEventListener('scroll', emitScroll)
})
</script>

<template>
  <ElScrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.prevent="handleScroll">
    <slot />
  </ElScrollbar>
</template>

<style lang="less" scoped>

</style>
