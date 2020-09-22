import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { Storage } from '@/utils/storage'
var storage = new Storage();
//Y用于刷新
let SET_USERINFO = storage.get_storage('USER_INFO')?storage.get_storage('USER_INFO'):'';
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    set_userinfo:SET_USERINFO
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // get user info - 二开改造
  SET_USERINFO:(state, set_userinfo) => {
    state.set_userinfo = set_userinfo
  },
}

const actions = {
  // user login - 二开改造
  login({ commit }, userInfo) {
    const { appid, appsecret } = userInfo
    return new Promise((resolve, reject) => {
      login({ appid: appid.trim(), appsecret: appsecret }).then(response => {
        const { data } = response
        //把管理员相关数据存入userinfo
        userInfo.app = data.app
        commit('SET_TOKEN', data.token)
        commit('SET_USERINFO', userInfo)
        userInfo.app = data.app
        let params = {
        	name:'USER_INFO',
        	value:userInfo,
        	expires:3600000
        }
        storage.set_storage(params)

        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  
  // get user info - 二开改造
  getInfo({ commit, state }) {
    const { appid, appsecret } = state.set_userinfo
    // console.log(state.set_userinfo)
    return new Promise((resolve, reject) => {
      getInfo({ appid: appid.trim(), appsecret: appsecret }).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { nick_name, avatar_img_url } = data.app

        commit('SET_NAME', nick_name)
        commit('SET_AVATAR', avatar_img_url)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
