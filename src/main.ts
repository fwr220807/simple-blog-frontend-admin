import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from '@/router/index'

import '@unocss/reset/tailwind.css'

createApp(App).use(createPinia()).use(router).mount('#app')
