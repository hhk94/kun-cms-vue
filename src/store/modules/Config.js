import homeRouter,{add_router} from '@/config/stage' // 引入舞台配置
import store from '@/store'
import Util from '@/kun/utils/util.js'
import router from '@/router'
import { Storage } from '@/kun/utils/storage'//本地缓存配置
var storage = new Storage();
import { Token } from '@/kun/utils/token'//token配置
var tokens = new Token();
let side_active = storage.get_storage('SIDE_ACTIVE')?storage.get_storage('SIDE_ACTIVE'):'';
let token = tokens.get_token()?tokens.get_token():'';
let set_side_bar = storage.get_storage('SIT_SIDE_BAR')?storage.get_storage('SIT_SIDE_BAR'):'';
const state = {
	side_active:side_active,
	token:token,
	isCollapse:false,
	set_side_bar:set_side_bar
}

const mutations = {
	TOKEN: (state, token) => {
		state.token = token
	},
	SIDE_ACTIVE: (state, path) => {
		state.side_active = path
	},
	ISCOLLAPSE: (state, isCollapse) => {
		state.isCollapse = isCollapse
	},
	SIT_SIDE_BAR: (state, set_side_bar) => {
		state.set_side_bar = set_side_bar
	},
}

const homeRouter1 = []
function deepTravel(config, fuc) {
	
  if (Array.isArray(config)) {
    config.forEach(subConfig => {
      deepTravel(subConfig, fuc)
    })
  } else if (config.children&&config.children.length!=0) {
    config.children.forEach(subConfig => {
      deepTravel(subConfig, fuc)
    })
  } else {
	// console.log(config)
    fuc(config)
  }
}
const actions = {
	set_token({ commit },params) {//登录获取token
		console.log('store')
		tokens.set_token(params)
		commit('TOKEN', params)
		store.dispatch('Config/set_side_bar')
	},
	set_side_active({ commit },path){//设置side-nav默认激活
		let data = {
			name:'SIDE_ACTIVE',
			value:path
		}
		storage.set_storage(data)
		commit('SIDE_ACTIVE', path)
	},
	loginOut({ commit }){//退出
		tokens.remove_token()
		commit('TOKEN', '')
		commit('SIT_SIDE_BAR', [])
		storage.remove_storage('SIT_SIDE_BAR')
		router.options.routes[0].children.length = 0
	},
	sideCollapse({ commit },isCollapse){//设置左侧导航回收 - 有bug
		commit('ISCOLLAPSE', isCollapse)
	},
	async set_side_bar({ commit }){//配置路由
		if(store.getters.set_side_bar.length!=0){
			console.log('不为空')
			//存在
		}else{
			console.log('空')
			add_router(homeRouter).then(return_router=>{
				
				// console.log(return_router)
				// let data = {
				// 	type:'sessionStorage',
				// 	name:'SIT_SIDE_BAR',
				// 	value:return_router
				// }
				// storage.set_storage(data)
				commit('SIT_SIDE_BAR', return_router)
				deepTravel(return_router, viewConfig => {
					// 构造舞台view路由
					const viewRouter = {}
					viewRouter.path = viewConfig.route|| Util.getRandomStr(6)
					// viewRouter.name =Symbol(viewConfig.name)  ||Util.getRandomStr(6)
					viewRouter.name =viewConfig.name  ||Util.getRandomStr(6)
					viewRouter.component = () => import(`@/${viewConfig.filePath}`)
					viewRouter.meta = {
					title: viewConfig.title,
					icon: viewConfig.icon,
					type: viewConfig.type,
					needLogin:viewConfig.need_login,
					}
					homeRouter1.push(viewRouter)
				})
				// router.options.routes[0].children.splice(0,router.options.routes[0].children.length)
				
				router.options.routes[0].children = homeRouter1
				console.log('router.options.routes')
				console.log(router.options.routes)
				router.addRoutes(router.options.routes)
				router.addRoutes([{
					redirect: '/404',
					path: '*',
				}])
				console.log(router.options.routes)
			})
		}
	
		
	},
	
	
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}