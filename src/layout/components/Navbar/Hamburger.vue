<script lang="ts" setup>
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggleSidebar'])
</script>

<template>
  <div cursor-pointer text-20px @click="$emit('toggleSidebar')">
    <span v-if="isActive">
      <i class="i-fluent:panel-right-expand-16-filled" />
    </span>
    <span v-else>
      <i class="i-fluent:panel-left-expand-16-filled" />
    </span>
    {{ isActive }}
  </div>
</template>

<style lang="less" scoped>

</style>
