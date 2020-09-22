import request from '@/utils/request'
//二开改造 - 登录
export function login(data) {
  return request({
    url: '/cms/user_login',
    method: 'post',
    data
  })
}
//二开改造 - 获取用户信息 登录同时给出
export function getInfo(data) {
  return request({
    url: '/cms/user_login',
    method: 'post',
    // params: { token }
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
