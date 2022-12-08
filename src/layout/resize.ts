/*
* @Description: 根据页面大小变化计算设置 appStore.device 值并重新布局
* @Author: Wren Fan
* @Date: 2022-11-29 12:54:45
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-7 12:54:45
**/
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/app'
import { Device } from '@/constant/device'

const WIDTH = 992 // refer to Bootstrap's responsive design

export const resize = () => {
  const appStore = useAppStore()
  const device = computed(() => appStore.device)
  const sidebar = computed(() => appStore.sidebar)

  const useIsMobile = () => {
    const isMobile = ref(false)

    const isMobileHandler = () => {
      const rect = document.body.getBoundingClientRect()
      isMobile.value = rect.width - 1 < WIDTH
    }
    isMobileHandler()

    window.addEventListener('resize', isMobileHandler)
    onBeforeUnmount(() => {
      window.removeEventListener('resize', isMobileHandler)
    })

    return isMobile
  }
  // 检测路由变化，如果是切换路由是是手机模式，则自动将 sidebar 关闭
  const route = useRoute()
  watch(() => route.name, () => {
    if (appStore.device === Device.Mobile && appStore.sidebar.opened)
      appStore.closeSidebar(false)
  })

  const isMobile = useIsMobile()
  watch(isMobile, (value) => {
    if (value) {
      appStore.toggleDevice(Device.Mobile)
      appStore.closeSidebar(true)
    }
    else {
      appStore.toggleDevice(Device.Desktop)
    }
  }, { immediate: true })

  return {
    device,
    sidebar,
  }
}

export default resize
