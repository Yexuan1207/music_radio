import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './style/index.scss'
import './utils/rem'
import { createPinia } from 'pinia'
import GlobalComponents from './utils/global'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
import * as utils from './utils'
app.config.globalProperties.$utils = utils


const pinia = createPinia()

app.use(GlobalComponents)
app.use(pinia)
app.use(router)
app.mount('#app')
