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
      // {
      //   path: '/indexpage',
      //   // name是唯一的，不能取相同的名字
      //   // name: 'indexPage',
      //   component: indexPage
      // },
      {
        path: '/',
        name: 'index',
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
        path: '/Login',
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


// async方法
// router.beforeEach((to, from, next) => {
//   const excludedComponents = ['index', 'infoPage']
//   const token = localStorage.getItem('token')
//   console.log(token)
//   if (to.name !== 'adminLogin' && !excludedComponents.includes(to.name) && !token) {
//     next({name:'adminLogin'})
//   } 
//   else {
//     axios.get(`/api/token/${token}`).then((response) => {
//       if (response.data){
//         next()
//       }})
//       .catch(error => {
//         console.log(error)
//         next({name:'adminLogin'})
//       })
//     }
//   })

// 创建路由守卫，验证token，并使用async和await方式发送axios请求
// next(): 不会触发 beforeEach
// next('/xxx') 或者 next({ path: '/xxx' }) 跳到不同的地址都会再次执行 router.beforeEach 钩子函数。
router.beforeEach((to, from, next) => {
  const excludedComponents = ['index', 'infoPage']
  // 如果没有token且访问的是不需要token的组件，放行
  if (excludedComponents.includes(to.name)) {
        next()
      } 
  // if (to.path != '/login' && !token) {
  //   next({
  //     path: '/login'
  //   })
  // } 
  // 有token的情况下
  else {
    let token = localStorage.getItem('token')
    // console.log(token)
    // 如果访问的是登录页面，清除token并允许访问
    if (to.path == '/Login') {
      localStorage.removeItem('token');
      console.log(`token:${token}`)
      next()
    } else {     //如果访问的是其他页面，或者没有token,发送请求交给Java后台判定
      // console.log(token)
      axios.get(`/api/token/${token}`).then((response) => {
              if (response.data){
                // console.log(token)
                next()
              }
              // token认证未通过，转到登录界面
            else {
              // next(vm =>{
              //   vm.msg.value = "有效期已过，请重新登录"
              // })
              next({
                path: '/login',
                query: { data:"您没有权限，请登录" }
              })
            }})
    }
  }
})

// 创建VueX仓库store实例
const store = createStore({
  state(){
    return{
      indexform:{
      },
      mylist:{
      },
      guestNum:{
      },
  }}
})

// ----------------------------解决inputinfo页面缩放窗口时报ResizeObserver loop limit exceeded错误信息的问题----------------------------
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}
// ----------------------------解决inputinfo页面缩放窗口时报ResizeObserver loop limit exceeded错误信息的问题----------------------------

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