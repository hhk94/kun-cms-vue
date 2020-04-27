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
	
	
	
}