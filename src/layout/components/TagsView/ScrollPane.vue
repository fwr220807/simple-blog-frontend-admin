<!--
* @Description:
* @Author: Wren Fan
* @Date: 2022-12-10 17:25:39
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-10 17:25:39
-->
<script lang="ts" setup>
import { ElScrollbar } from 'element-plus'
import type { ComponentPublicInstance } from 'vue'
import { onMounted, ref } from 'vue'
import { throttle } from 'lodash'
import { useEventListener } from '@/hooks/useCommon'

const emits = defineEmits(['scroll'])

// InstanceType<typeof ElScrollbar> 用于获取 ElScrollbar 子组件的暴露的对象类型
const scrollContainer = ref<InstanceType<typeof ElScrollbar> | null>(null)

// 控制 scroll 的回调函数
const handleScroll = (event: WheelEvent) => {
  const eventDelta = -event.deltaY * 40
  const scrollWrapper = scrollContainer.value?.wrap$
  scrollWrapper && (scrollWrapper.scrollLeft += eventDelta / 4)
}

const emitScroll = throttle(() => {
  emits('scroll')
}, 300, { trailing: true })

onMounted(() => {
  // 为啥设置为 true 即捕获阶段的回调函数
  const scrollWrapper = scrollContainer.value?.wrap$
  scrollWrapper && useEventListener(scrollWrapper, 'scroll', emitScroll, true)
})

const tagSpacing = 4
const moveToTarget = (currentTag: ComponentPublicInstance, tagList: ComponentPublicInstance[]) => {
  const scrollWrapper = scrollContainer.value?.wrap$ as HTMLDivElement
  const wrapperOffsetWidth = scrollWrapper.offsetWidth

  let firstTag = null
  let lastTag = null

  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    scrollContainer.value?.setScrollLeft(0)
  }
  else if (lastTag === currentTag) {
    scrollContainer.value?.setScrollLeft(scrollWrapper.scrollWidth - wrapperOffsetWidth)
  }
  else {
    const currenIndex = tagList.findIndex(item => item === currentTag)
    const prevTag = tagList[currenIndex - 1].$el
    const nextTag = tagList[currenIndex + 1].$el

    const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + tagSpacing
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagSpacing

    if (afterNextTagOffsetLeft > scrollWrapper.scrollLeft + wrapperOffsetWidth)
      scrollContainer.value?.setScrollLeft(afterNextTagOffsetLeft - wrapperOffsetWidth)
    else if (beforePrevTagOffsetLeft < scrollWrapper.scrollLeft)
      scrollContainer.value?.setScrollLeft(beforePrevTagOffsetLeft)
  }
}

defineExpose({
  /** @description 移动到当前的 tag */
  moveToTarget,
})
</script>

<template>
  <ElScrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.prevent="handleScroll">
    <slot />
  </ElScrollbar>
</template>

<style lang="less" scoped>

</style>
