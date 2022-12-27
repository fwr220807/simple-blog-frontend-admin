/*
* @Description: 存储全局状态
* @Author: Wren Fan
* @Date: 2022-11-29 10:01:57
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-27 17:18:00
**/
import { defineStore } from 'pinia'
import { getSidebarStatus, getSize, setLanguage, setSidebarStatus } from '@/utils/cookies'
import { getLocale } from '@/locales'
import { Device } from '@/constant/device'
import { getBlogInfoReq } from '@/api/app'
import type { ObjType } from '@/typings/common'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      // 当前设备
      device: Device.Desktop,
      // 侧边栏的关闭打开
      sidebar: {
        opened: getSidebarStatus() !== 'closed',
        withoutAnimation: false,
      },
      // 语言
      language: getLocale(),
      size: getSize() || 'medium',
      // 前端主站的网址
      website: '',
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
    // 获取博客主站相关信息，浏览记录等
    getBlogInfo() {
      return new Promise((resolve, reject) => {
        getBlogInfoReq().then((response: ObjType) => {
          const { data } = response
          const { website } = data
          this.$patch((state) => {
            state.website = website
            resolve(data)
          })
        }).catch((error: any) => {
          reject(error)
        })
      })
    },
  },
})
