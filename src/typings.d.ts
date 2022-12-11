/*
* @Description: 此处用于拓展插件内置的类型（非拓展新类型，拓展新类型在 typings 文件夹）
* @Author: Wren Fan
* @Date: 2022-12-11 11:05:32
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-11 11:05:32
**/
import 'vue-router'

declare module 'vue-router' {
    interface RouteLocationPathRaw {
        fullPath?: string
    }

    interface RouteMeta {
        activeMenu?: string
    }
}

