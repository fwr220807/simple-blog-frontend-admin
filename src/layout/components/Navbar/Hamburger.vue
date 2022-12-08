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
  <div cursor-pointer text-20px px-15px select-none @click="$emit('toggleSidebar')">
    <span v-if="isActive">
      <i class="i-fluent:panel-right-expand-16-filled" />
    </span>
    <span v-else>
      <i class="i-fluent:panel-left-expand-16-filled" />
    </span>
  </div>
</template>

<style lang="less" scoped>

</style>
