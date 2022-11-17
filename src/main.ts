import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'

import '@unocss/reset/tailwind.css'

createApp(App).use(createPinia()).mount('#app')
