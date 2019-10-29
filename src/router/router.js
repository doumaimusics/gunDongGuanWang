import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/*
vue - router≥ 3.0 版本回调形式以及改成promise api的形式了， 返回的是一个promise， 如果没有捕获到错误， 控制台始终会出现如图的警告， 针对于路由跳转相同的地址， 目前的解决方案: this.$router.push('/location').catch(err => {
  console.log(err)
})
或者如下代码
*/
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

// requireAuth 判断是否需要登录
export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path:'/',
            redirect: {
                name:'index'
            }
        },
        {
            path:'/login',
            name:'login',
            component: () => import('@/views/main/login/login'),
            meta: {
                title: '登录/注册',
                requireAuth:false
            }
        },
        {   //首页
            path:'/index',
            name:'index',
            component: () => import('@/views/main/index/index'),
            meta: { 
                title:'首页',
                requireAuth:false    
            }
        },
        {
            path:'/selProgramme',
            name: 'selProgramme',
            component: () => import('@/views/main/seleProgramme/selProgramme'),
            meta: { 
                title:'选择方案',
                requireAuth:true
             }
        }
    ]
})

