import type { RouteRecordRaw } from "vue-router";
/*此处扩展的路由类型*/
export interface RouteItemType {
  hidden?: boolean // 设置为 true 时，该路由不会在 sidebar 侧边栏显示
  meta?: {
    title: string // 路由的标题
    icon?: string // 用处存放路由的 uno-icon 值
    activeMenu?: string // 还不知道干嘛用
    roles?: Array<string> // 该路由的权限
  }
  children?: RouterType // 孩子
}

// & 将两个类型合并
export type RouterRowType = RouteRecordRaw & RouteItemType
export type RouterType = Array<RouterRowType>

