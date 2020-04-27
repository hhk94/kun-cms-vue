import store from '@/store'
import { Storage } from '@/kun/utils/storage'
var storage = new Storage();
let side_active = storage.get_storage('SIDE_ACTIVE')?storage.get_storage('SIDE_ACTIVE'):'';
let token = storage.get_storage('USER_INFO')?storage.get_storage('USER_INFO'):'';
const state = {
	side_active:side_active,
	token:token,
}

const mutations = {
	TOKEN: (state, token) => {
		state.token = token
	},
	SIDE_ACTIVE: (state, path) => {
		state.side_active = path
	},
	
}

const actions = {
	set_token({ commit },params) {//登录获取token
		console.log('store')
		if(!store.getters.token){
			let data = {
				name:'USER_INFO',
				value:params,
				expires:3600000
			}
			storage.set_storage(data)
			console.log(params)
			commit('TOKEN', params)
		}
	},
	set_side_active({ commit },path){//设置side-nav默认激活
		
		let data = {
			name:'SIDE_ACTIVE',
			value:path
		}
		storage.set_storage(data)
		commit('SIDE_ACTIVE', path)
	}
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}