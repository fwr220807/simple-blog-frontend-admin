<script lang="ts" setup name="friends">
import { computed, ref } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const username = computed(() => userStore.username)
const a = ref(1)
</script>

<template>
  <div>
    friends-index
    <button @click="a++">
      a
    </button>
    {{ a }}
  </div>
</template>

<style lang="less" scoped>

</style>
