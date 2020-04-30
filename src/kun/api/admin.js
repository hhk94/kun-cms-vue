import _axios from '@/kun/plugins/axios'

// import store from '@/store'

export default class Admin {
	/**
	 * 用户登录
	 * @param {string} appid
	 * @param {string} appsecret
	 * @method post
	 */
	static async user_login(data) {
		const groups =  await _axios({
			method: 'post',
			url: 'cms/user_login',
			data,
			handleError: true,
		})
		return groups
	}
	/**
	 * 用户回复数排序
	 * @param {string} limit 默认10
	 * @method get
	 */
	static async user_list_get_by_count(params) {
		const groups =  await _axios({
			method: 'get',
			url: 'cms/user_list_get_by_count',
			params,
			handleError: true,
		})
		return groups
	}
	
	/**
	 * 获取用户列表
	 * @method get
	 */
	static async user_list_get(params) {
		const groups =  await _axios({
			method: 'get',
			url: 'cms/user_list_get',
			params,
			handleError: true,
		})
		return groups
	}
	/**
	 * 获取单个用户
	 * @method get
	 */
	static async user_get(params) {
		const groups =  await _axios({
			method: 'get',
			url: 'cms/user_get',
			params,
			handleError: true,
		})
		return groups
	}
	/**
	  * 方法说明 - 用户修改资料
	  * @param {int} id 数据库id
	  * @param {int} avatar_img_id 头像id
	  * @param {varchar} appid 账号
	  * @param {varchar} new_psd 新密码
	  * @param {varchar} psd 旧密码
	  * @param {varchar} nick_name 昵称
	  * @method post
	  */
	static async user_change(data) {
		const groups =  await _axios({
			method: 'post',
			url: 'cms/user_change',
			data,
			handleError: true,
		})
		return groups
	}
	
}