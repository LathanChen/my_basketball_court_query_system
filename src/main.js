import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { createRouter, createWebHistory  } from 'vue-router'
import 'element-plus/theme-chalk/index.css'
// 修改element组件为中文
import locale from 'element-plus/lib/locale/lang/zh-cn'
import indexPage from './components/indexPage.vue'
import infoPage from './components/infoPage.vue'
import HelloWorld from './components/HelloWorld.vue'
import adminLogin from './components/adminLogin.vue'
import inputInfo from './components/inputInfo.vue'
import { createStore } from 'vuex'
// 设置反向代理，前端请求默认发送到 http://localhost:8081
axios.defaults.baseURL = 'http://localhost:8081'
// axios.defaults.withCredentials = true
// 创建路由对象
const router = createRouter({
    // 使用History来管理路由历史记录，这样初始的网址中就不会出现#号，如http://localhost:8080/#/
    history: createWebHistory(),
    routes: [
      {
        path: '/indexpage',
        name: 'indexPage',
        component: indexPage
      },
      {
        path: '/hello',
        name: 'hello',
        component: HelloWorld
      },
      {
        path: '/infoPage',
        name: 'infoPage',
        component: infoPage
      },
      {
        path: '/adminLogin',
        name: 'adminLogin',
        component: adminLogin
      },
      {
        path: '/inputInfo',
        name: 'inputInfo',
        component: inputInfo
        }
    ]
  })
// 创建VueX仓库store实例
const store = createStore({
  state(){
    return{
      mylist:{}
  }}
})
// createApp是Vue3的新写法，通过这个写法，可以不使用nuew Vue将应用程序挂载到指定的DOM上
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, { locale: locale })
app.use(router)
app.use(store)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
// app.config.globalProperties.axios = axios;
app.config.productionTip = false
app.mount('#app')