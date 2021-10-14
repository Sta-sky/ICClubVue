import {createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementPlus from "element-plus"
import 'element-plus/dist/index.css'
import store from './store/index'


let app = createApp(App)
// Vue.prototype 替换为 config.globalProperties
// app.config.globalProperties.$emitter = emitter
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')

