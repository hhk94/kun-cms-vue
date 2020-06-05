import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'
import { Token } from '@/kun/utils/token'
import { Notification } from 'element-ui';


var tokens = new Token()
Vue.use(Router)



const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0,
  }),
  // base: process.env.BASE_URL,
  routes,
})
// var getLastUrl=(str,yourStr)=>str.slice(str.lastIndexOf(yourStr))

router.beforeEach((to, from, next) => {
	console.log(to)
	console.log(from)
	// let lastUrl = getLastUrl(window.location.href,'/');
	// console.log(lastUrl)
	// 登录验证
	console.log('store.getters.set_side_bar')
	console.log(store.getters.set_side_bar)
	console.log(routes)
	if(to.path!='/login'){
		store.dispatch('Config/set_side_bar')
	}
	if(to.meta.needLogin){
		
		if (!store.getters.token&&!tokens.get_token()) {
			Notification({
				title: '警告',
				message: '请先登录CMS',
				position: 'top-right',
				type:'error'
			});
			next({ path: '/' })
			return;
			
		}
	}else{
		next();
	}
	
	//处理side导航默认激活按钮
	store.dispatch('Config/set_side_active',to.path)
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

  // 路由发生变化重新计时 - 长时间未操作 退出到登录页
  Vue.prototype.$_kun_jump()

  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  next()
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
