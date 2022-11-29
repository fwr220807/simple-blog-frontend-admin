/*
* @Description:
* @Author: Wren Fan
* @Date: 2022-11-29 10:42:37
* @LastEditors: Wren Fan
* @LastEditTime: 2022-11-29 10:42:37
**/

// messages 具体内容地址在 vite.config 插件的 includes 中
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import { getLanguage } from '@/utils/cookies'

// 获取语言的逻辑是，先从 cookies 中获取，如果没有再从 navigator 获取，
// 与库中的 message 匹配，如果匹配则返回相应的语言，否则返回默认语言 en
export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage)
    return cookieLanguage
  // navigator.language 为浏览器用户界面的语言
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.includes(locale))
      return locale
  }

  return 'en'
}
