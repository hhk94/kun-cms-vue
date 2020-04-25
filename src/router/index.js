import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
// import store from '../store'
// import Util from '@/lin/utils/util'

Vue.use(Router)



const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0,
  }),
  // base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  // 登录验证
  // if (isLoginRequired(to.name) && !store.state.logined) {
  //   next({ path: '/login' })
  //   return
  // }

  // TODO: tab 模式重复点击验证

  // 权限验证
  // if (store && store.state && store.getters) {
  //   const { permissions, user } = store.getters
  //   if (to.path !== '/about' && !Util.hasPermission(permissions, to.meta, user)) {
  //     Vue.prototype.$notify({
  //       title: '无权限',
  //       dangerouslyUseHTMLString: true,
  //       message: '<strong class="my-notify">您无此页面的权限哟</strong>',
  //     })
  //     next({ path: '/about' })
  //     return
  //   }
  // }

  // 路由发生变化重新计时
  // Vue.prototype.$_lin_jump()

  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  next()
})

export default router
