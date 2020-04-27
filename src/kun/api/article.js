import _axios from '@/kun/plugins/axios'

// import store from '@/store'

export default class Article {
	/**
	 * 用户登录
	 * @param {string} appid
	 * @param {string} appsecret
	 * @method post
	 */
	static async article_type_list_get(data) {
		const groups =  await _axios({
			method: 'get',
			url: 'cms/article_type_list_get',
			data,
			handleError: true,
		})
		return groups
	}
	
	
	
}