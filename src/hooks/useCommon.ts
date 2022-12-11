/*
* @Description: 通用工具库
* @Author: Wren Fan
* @Date: 2022-11-28 10:35:26
* @LastEditTime: 2022-11-28 10:35:26
* @LastEditors: Wren Fan
**/

import { onBeforeUnmount } from 'vue'

// 返回一个睡眠后的数
export const useSleep = (time: number): Promise<null> => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(null)
    }, time)
  })
}
/**
 * @description 自动清理监听器, 请在 onMounted 中使用
 * */
export const useEventListener = (targetEl: HTMLElement, eventName: keyof HTMLElementEventMap, handler: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined) => {
  targetEl.addEventListener(eventName, handler, options)

  onBeforeUnmount(() => {
    targetEl.removeEventListener(eventName, handler)
  })
}

// 为 obj[key] 的形式提供类型检查
export const setProp = <T, K extends keyof T>(obj: T, key: K, value: T[K]) => obj[key] = value
