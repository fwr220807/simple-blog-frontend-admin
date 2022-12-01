/*
* @Description: 通用工具库
* @Author: Wren Fan
* @Date: 2022-11-28 10:35:26
* @LastEditTime: 2022-11-28 10:35:26
* @LastEditors: Wren Fan
**/
// 返回一个睡眠后的数
export const useSleep = (time: number): Promise<null> => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(null)
    }, time)
  })
}
// 为 obj[key] 的形式提供类型检查
export const setProp = <T, K extends keyof T>(obj: T, key: K, value: T[K]) => obj[key] = value

