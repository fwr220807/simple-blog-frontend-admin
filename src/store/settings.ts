/*
* @Description: settings
* @Author: Wren Fan
* @Date: 2022-11-29 23:05:02
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-29 23:05:02
**/

import { defineStore } from 'pinia'
import layoutSettings from '@/config/default/layout'

interface SettingsState {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}

function setProp<T, K extends keyof T, M extends T[K]>(obj: T, key: K, value: M) {
  return obj[key] = value
}

export const useSettingsStore = defineStore('settings', {
  state: () => {
    const state: SettingsState = {
      theme: 'primary',
      fixedHeader: layoutSettings.fixedHeader,
      showSettings: layoutSettings.showSettings,
      showTagsView: layoutSettings.showTagsView,
      showSidebarLogo: layoutSettings.showSidebarLogo,
      sidebarTextTheme: layoutSettings.sidebarTextTheme,
    }

    return state
  },
  actions: {
    // 传入键值对，修改对应的 setting 值
    changeSetting(key: keyof SettingsState, value: boolean | string) {
      this.$patch((state) => {
        setProp(state, key, value)
      })
    },
  },
})
