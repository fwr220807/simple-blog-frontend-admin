import type { RouteRecordRaw } from "vue-router";
/*此处扩展的路由类型*/
export interface RouteItemType {
  hidden?: boolean
  meta?: {
    title: string
  }
  children?: RouterType
}

// & 将两个类型合并
export type RouterRowType = RouteRecordRaw & RouteItemType
export type RouterType = Array<RouterRowType>

