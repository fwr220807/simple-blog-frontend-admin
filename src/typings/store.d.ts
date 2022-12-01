import { RouterType } from "@typings/router"

/*
* @Description: store 仓库的需要用到的类型
* @Author: Wren Fan
* @Date: 2022-12-01 11:23:16
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-01 11:23:16
**/
export interface SettingsStateType {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}

export interface PermissionStateType {
  routes: RouterType
  dynamicRoutes: RouterType
}
