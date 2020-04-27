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
	
	
}