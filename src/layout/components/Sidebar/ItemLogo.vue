<script lang="ts" setup>
defineProps({
  meta: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <span><i v-if="meta.icon" :class="`${meta.icon}`" /></span>
</template>

<style lang="less" scoped>
</style>
