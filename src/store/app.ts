/*
* @Description: 存储全局状态
* @Author: Wren Fan
* @Date: 2022-11-29 10:01:57
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-29 10:01:57
**/
import { defineStore } from 'pinia'
import { getSidebarStatus, getSize, setLanguage, setSidebarStatus } from '@/utils/cookies'
import { getLocale } from '@/locales'
import { Device } from '@/constant/device'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      device: Device.Desktop,
      sidebar: {
        opened: getSidebarStatus() !== 'closed',
        withoutAnimation: false,
      },
      language: getLocale(),
      size: getSize() || 'medium',
    }
  },
  actions: {
    toggleSidebar() {
      this.$patch((state) => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened)
          setSidebarStatus('opened')
        else
          setSidebarStatus('closed')
      })
    },
    closeSidebar(withoutAnimation: boolean) {
      this.$patch((state) => {
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
        setSidebarStatus('closed')
      })
    },
    toggleDevice(device: Device) {
      this.$patch((state) => {
        state.device = device
      })
    },
    toggleLanguage() {
      this.$patch((state) => {
        // 切换仓库的语言
        state.language = state.language === 'zh-CN' ? 'en' : 'zh-CN'

        // 修改对应的 cookies
        setLanguage(state.language)
      })
    },
  },
})
