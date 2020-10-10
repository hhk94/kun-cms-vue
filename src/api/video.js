import _axios from '@/utils/request'

// import store from '@/store'

export default class Video {
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
	 * banner-type删除
	 * @param {int} id 为空表示新增
	 * @method delete
	 */
	static async banner_type_delete(data) {
		const groups =  await _axios({
			method: 'delete',
			url: 'cms/banner_type_delete',
			data,
			handleError: true,
		})
		return groups
	}

	/**
	 * 获取banner列表
	 * @method get
	 */
	static async video_list_get(params) {
		const groups =  await _axios({
			method: 'get',
			url: 'cms/video_list_get',
			params,
			handleError: true,
		})
		return groups
	}
	/**
	 * banner类别添加
	 * @param {string} id 存在id即进入修改
	 * @param {string} title title
	 * @param {string} jump_url 跳转url
	 * @param {int} video_img_id 图片id
	 * @method post
	 */
	static async video_add(data) {
		const groups =  await _axios({
			method: 'post',
			url: 'cms/video_add',
			data,
			handleError: true,
		})
		return groups
	}
  /**
   * banner类别添加
   * @param {string} id
   * @param {int} show 控制video显示 1：显示；2：隐藏
   * @method post
   */
  static async video_change_show(data) {
    const groups =  await _axios({
    method: 'post',
    url: 'cms/video_change_show',
    data,
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
