/*
* @Description: 项目入口
* @Author: Wren Fan
* @Date: 2022-11-25 16:35:17
* @LastEditTime: 2022-11-28 16:35:17
* @LastEditors: Wren Fan
**/
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/vite-plugin-vue-i18n/messages'
import App from './App.vue'
import { router } from '@/router/index'
import '@unocss/reset/tailwind.css'
import '@/styles/index.css'
import 'uno.css'
import './permission' // 导入全局路由守卫，控制页面路由权限

// 语言国际化，messages 具体内容地址在 vite.config 插件的 includes 中
const i18n = createI18n({
  locale: 'zh-CN',
  messages,
})

const app = createApp(App)
  .use(createPinia())

app.use(i18n)
  .use(router).mount('#app')
