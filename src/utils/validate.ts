/*
* @Description: 存放正则验证的函数
* @Author: Wren Fan
* @Date: 2022-12-02 17:15:38
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-02 17:15:38
**/

/**
 * 判断字符串 path 是不是外部链接，是则返回 true，否则返回 false
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}
