/*
* @Description: 项目入口
* @Author: Wren Fan
* @Date: 2022-11-25 16:35:17
* @LastEditTime: 2022-11-25 16:35:17
* @LastEditors: Wren Fan
**/
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from '@/router/index'

import '@unocss/reset/tailwind.css'
import 'uno.css'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
