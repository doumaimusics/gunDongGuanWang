import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from 'axios'

import './assets/css/public.css'   // 公共样式
import PublicFun from './assets/js/public.js'    // 公用方法

import './element-ui'   // 按需引入element-ui

router.beforeEach((to, from, next) => {   // 登录信息跳转
    if(to.matched.some(m => m.meta.requireAuth)){
        if(window.localStorage.token){
          next();
        } else if(to.path !== '/login'){
          let token = window.localStorage.token;
          if(token === 'null' || token === '' || token === undefined){
            next({
              path:'/login'
            })
          }
        } else {
          next()
        }
    } else {
        next();
    }
    window.scroll(0,0);   // 页面跳转回到顶部
    if(to.meta.title){   // 页面标题
        document.title = to.meta.title
    }
    // next()
})

//把如下代码加入main.js
import { post, fetch } from "../config/axios";   // 引入axios
Vue.prototype.$get = fetch;
Vue.prototype.$post = post;




Vue.prototype.$publicFun = PublicFun;  // 公用方法挂载全局
Vue.prototype.$axios = axios;    // 全局有引入axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
