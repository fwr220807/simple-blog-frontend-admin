<!--
* @Description: Card 组件，应用于 dashboard 页面
* @Author: Wren Fan
* @Date: 2022-12-26 18:28:56
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-26 18:28:56
-->
<script lang="ts" setup>
interface CardProps {
  title: string
  value: number
  icon: string
  actions?: {
    name: string
    onClick: () => void
    primary?: boolean
    showBadge?: boolean
  }[]
}
const props = defineProps<CardProps>()
</script>

<template>
  <el-col :span="6" mb-10px>
    <el-card shadow="hover">
      <el-row>
        <el-col :span="12" flex flex-col>
          <span text-gray-5>{{ title }}</span>
          <span mt-12px>{{ value }}</span>
        </el-col>
        <el-col :span="12" flex flex-row-reverse>
          <span text-6 text-gray-6 flex items-center><i :class="icon" /></span>
        </el-col>
      </el-row>
      <el-row v-if="actions" mt-20px>
        <el-button v-for="action in actions" :key="action.name" :text="!action.primary" :type="action.primary ? 'primary' : 'default'" round @click="action.onClick">
          {{ action.name }}
        </el-button>
      </el-row>
    </el-card>
  </el-col>
</template>

<style lang="less" scoped>
// 覆盖回 unocss 的按钮清除样式
.el-button {
  background-color: var(--el-button-bg-color);
}
</style>
