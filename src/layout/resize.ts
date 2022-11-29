/*
* @Description: 根绝大小变化重新布局
* @Author: Wren Fan
* @Date: 2022-11-29 12:54:45
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-29 12:54:45
**/
import { computed } from 'vue'
// import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()
// const WIDTH = 992

export const device = computed(() => appStore.device)
export const sidebar = computed(() => appStore.sidebar)

// const route = useRoute()
