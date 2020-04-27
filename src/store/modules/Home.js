import store from '@/store'
import { Storage } from '@/kun/utils/storage'
var storage = new Storage();
let token = storage.get_storage('USER_INFO')?storage.get_storage('USER_INFO'):'';
const state = {
	token:token,
	login_show:false
}

const mutations = {
	TOKEN: (state, token) => {
		state.token = token
	},
	LOGIN_SHOW: (state, show) => {
		state.login_show = show
	},
	
}

const actions = {
  //进入页面的common-token
	set_token({ commit },params) {
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
	set_login_show({ commit },show){
		commit('LOGIN_SHOW', show)
		console.log('show',show)
	}
	
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}