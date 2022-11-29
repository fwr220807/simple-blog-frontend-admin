/*
* @Description: 存储全局状态
* @Author: Wren Fan
* @Date: 2022-11-29 10:01:57
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-29 10:01:57
**/
import { defineStore } from 'pinia'
import { getSidebarStatus, getSize, setSidebarStatus } from '@/utils/cookies'
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
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if (this.sidebar.opened)
        setSidebarStatus('opened')
      else
        setSidebarStatus('closed')
    },
    closeSidebar(withoutAnimation: boolean) {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
      setSidebarStatus('closed')
    },
  },
})
