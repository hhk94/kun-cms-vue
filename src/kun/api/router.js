import _axios from '@/kun/plugins/axios'

// import store from '@/store'

export default class Router {
	/**
	 * banner类别添加
	* @param {varchar} route 路由路径
	* @param {varchar} name 路由名
	* @param {varchar} title 路由标题
	* @param {varchar} icon 路由图标
	* @param {varchar} file_path 文件路径
	* @param {int} in_nav 是否显示
	* @param {int} level 路由等级
	* @param {int} pre_id 上级id
	 * @method post
	 */
	static async router_add(data) {
		const groups =  await _axios({
			method: 'post',
			url: 'cms/router_add',
			data,
			handleError: true,
		})
		return groups
	}

	/**
	 * 获取router列表
	 * @method get
	 * @param {string} type router路由形式
	 * @param {string} type list列表形式
	 * @param {string} type select下拉框形式
	 */
	static async router_list(params) {
		const groups =  await _axios({
			method: 'get',
			url: 'cms/router_list',
			params,
			handleError: true,
		})
		return groups
	}
	
	/**
	 * banner删除
	 * @param {int} id 为空表示新增
	 * @method delete
	 */
	static async banner_item_delete(data) {
		const groups =  await _axios({
			method: 'delete',
			url: 'cms/banner_item_delete',
			data,
			handleError: true,
		})
		return groups
	}
}