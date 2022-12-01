/*
* @Description: layout 配置
* @Author: Wren Fan
* @Date: 2022-11-29 23:13:39
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-29 23:13:39
**/

export interface LayoutSettings {
  // 控制 settings 面板的显示
  showSettings: boolean
  // 控制 tagsView 的显示
  showTagsView: boolean
  // 控制 sidebar logo 的显示
  showSidebarLogo: boolean
  // 如果为真, 则将 header 变为 fixed
  fixedHeader: boolean
  // 如果为真, 会根据主题改变 sidebar 的文字颜色
  sidebarTextTheme: boolean
}

const layoutSettings: LayoutSettings = {
  showSettings: true,
  showTagsView: true,
  fixedHeader: false,
  showSidebarLogo: true,
  sidebarTextTheme: true,
}

export default layoutSettings
