import { createApp } from 'vue'
// 先加载组件库基础变量与深色变量，再由站点样式覆盖为统一主题。
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/styles/base.css'
import './assets/styles/element.css'
import App from './App.vue'
import router from './router'
import reveal from './directives/reveal'

const app = createApp(App)
app.directive('reveal', reveal)
app.use(router)
app.mount('#app')
