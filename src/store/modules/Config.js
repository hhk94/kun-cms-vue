// import store from '@/store'
import { Storage } from '@/kun/utils/storage'
var storage = new Storage();
let side_active = storage.get_storage('SIDE_ACTIVE')?storage.get_storage('SIDE_ACTIVE'):'';
const state = {
	side_active:side_active
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
  
	set_side_active({ commit },path){
		
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