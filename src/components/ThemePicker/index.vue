<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useSettingsStore } from '@/store/settings'

const emits = defineEmits(['change'])

const chalk = ref('')
const settingsStore = useSettingsStore()
const theme = ref(settingsStore.theme)

watch(theme, (value) => {
  emits('change', value)
})
</script>

<template>
  <el-color-picker v-model="theme" :predefine="['#409EFF', '#1890ff', '#304156', '#212121', '#11a983', '#13c2c2', '#6959CD', '#f5222d']" popper-class="theme-picker-dropdown" />
</template>

<!-- 不能使用 scoped 属性，因为使用 scoped 后检查发现没有给主容器打上动态属性 -->
<style lang="less">
.el-color-picker .el-color-picker__trigger {
  height: 26px;
  width: 26px;
  padding: 2px;
}

.theme-picker-dropdown {
  top: 164px !important;
  right: 20px!important;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
