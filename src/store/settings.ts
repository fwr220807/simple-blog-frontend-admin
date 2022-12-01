/*
* @Description: settings
* @Author: Wren Fan
* @Date: 2022-11-29 23:05:02
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-29 23:05:02
**/

import { defineStore } from 'pinia'
import layoutSettings from '@/config/default/layout.config'
import { getTheme } from '@/utils/cookies'
import type { SettingsStateType } from '@/typings/store'
import { setProp } from '@/hooks/useCommon'

export const useSettingsStore = defineStore('settings', {
  state: () => {
    const state: SettingsStateType = {
      theme: getTheme() || '#1890ff',
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
    changeSetting(key: keyof SettingsStateType, value: boolean | string) {
      this.$patch((state) => {
        setProp(state, key, value)
      })
    },
  },
})
