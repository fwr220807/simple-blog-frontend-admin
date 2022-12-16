<script lang="ts" setup name="dashboard">
import { computed, onMounted, reactive, ref } from 'vue'
import { useUserStore } from '@/store/user'
import { hitokotoReq } from '@/api/dashboard'

const state = reactive({
  hitokoto: '',
})
const userStore = useUserStore()
const username = computed(() => userStore.username)
const a = ref(1)

onMounted(async () => {
  const data = await hitokotoReq()
  state.hitokoto = data.hitokoto
})
</script>

<template>
  <div>
    dashboard
    {{ state.hitokoto }}
    <input type="text">
    <button @click="a++">
      a
    </button>
    {{ a }}
  </div>
</template>

<style lang="less" scoped>

</style>
