<script lang="ts" setup>
defineProps({
  meta: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <i v-if="meta.icon" :class="`${meta.icon}`" />
</template>

