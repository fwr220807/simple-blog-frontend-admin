/*
* @Description: 拓展路由相关类型
* @Author: Wren Fan
* @Date: 2022-12-10 11:50:43
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-10 11:50:43
**/
import type { RouteMeta, RouteRecordRaw, RouteRecordName } from "vue-router";
// 此处扩展的路由类型
export interface ExpandRouteItemType {
  hidden?: boolean // 设置为 true 时，该路由不会在 sidebar 侧边栏显示
  meta?: RouteMetaType // meta
  children?: RouterType // 孩子
}

// 此处为路由拓展的 meta 类型
export interface ExpandMetaType {
  title: string // 路由的标题
  icon?: string // 用处存放路由的 uno-icon 值
  roles?: Array<string> // 该路由的权限
  affix?: boolean // 该路由是否粘滞在 tagsView 组件上
}

// & 将两个类型合并
export type RouteMetaType = RouteMeta & ExpandMetaType
export type RouteRowType = RouteRecordRaw & ExpandRouteItemType
export type RouterType = Array<RouteRowType>

