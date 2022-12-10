/*
* @Description: store 仓库的需要用到的类型
* @Author: Wren Fan
* @Date: 2022-12-01 11:23:16
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-01 11:23:16
**/
import type { RouteMetaType } from "@/typings/router"
import type { RouteRecordName, LocationQuery } from "vue-router"

export interface SettingsStateType {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}

export interface TagType {
  fullPath: string
  path: string
  name: RouteRecordName | null | undefined
  meta: RouteMetaType
  title?: string // 把 meta 里的 title 提取出来
  query?: LocationQuery
}
