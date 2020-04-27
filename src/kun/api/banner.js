import _axios from '@/kun/plugins/axios'

// import store from '@/store'

export default class Banner {
	/**
	 * 获取banner类别列表
	 * @method get
	 */
	static async banner_type_list_get() {
		const groups =  await _axios({
			method: 'get',
			url: 'cms/banner_type_list_get',
			handleError: true,
		})
		return groups
	}
	/**
	 * banner类别添加
	 * @param {int} id 为空表示新增
	 * @param {string} typename
	 * @method post
	 */
	static async banenr_type_add(data) {
		const groups =  await _axios({
			method: 'post',
			url: 'cms/banenr_type_add',
			data,
			handleError: true,
		})
		return groups
	}
	/**
	 * 获取banner列表
	 * @method get
	 */
	static async banner_list_get(params) {
		const groups =  await _axios({
			method: 'get',
			url: 'cms/banner_list_get',
			params,
			handleError: true,
		})
		return groups
	}
	/**
	 * banner类别添加
	 * @param {string} id 存在id即进入修改
	 * @param {string} banner_name banner名称
	 * @param {string} banner_type_id banner类别
	 * @param {string} jump_url 跳转url
	 * @param {int} banner_img_id 图片id
	 * @method post
	 */
	static async banenr_add(data) {
		const groups =  await _axios({
			method: 'post',
			url: 'cms/banenr_add',
			data,
			handleError: true,
		})
		return groups
	}
	
	
}