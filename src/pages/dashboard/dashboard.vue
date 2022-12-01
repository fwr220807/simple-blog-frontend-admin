<script lang="ts" setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const username = computed(() => userStore.username)
</script>

<template>
  <div>dashboard</div>
</template>

<style lang="less" scoped>

</style>
