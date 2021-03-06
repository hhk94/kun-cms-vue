import _axios from '@/utils/request'
// import store from '@/store'

export default class Article {
	/**
	 * 获取article-type文章分类列表
	 * @method get
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

	/**
	 * article-type文章分类删除
	 * @method delete
	 */
	static async article_type_delete(data) {
		const groups =  await _axios({
			method: 'delete',
			url: 'cms/article_type_delete',
			data,
			handleError: true,
		})
		return groups
	}
	/**
	 * article-type新增
	 * @method post
	 */
	static async article_type_add(data) {
		const groups =  await _axios({
			method: 'post',
			url: 'cms/article_type_add',
			data,
			handleError: true,
		})
		return groups
	}
	/**
	 * article-图片上传
	 * @params file
	 * @method post
	 */
	static async article_add_img(data) {
		const groups =  await _axios({
			method: 'post',
			url: 'cms/article_add_img',
			data,
			handleError: true,
		})
		return groups
	}
	/**
	 * article-上传
	* @param article_id
	* @param article_title
	* @param article_type_id
	* @param article_content
	* @param article_html
	* @param article_input_id
	 * @method post
	 */
	static async article_add(data) {
		const groups =  await _axios({
			method: 'post',
			url: 'cms/article_add',
			data,
			handleError: true,
		})
		return groups
	}

	/**
	 * 获取article文章列表
	 * @param page
	 * @param size
	 * @method get
	 */
	static async article_list_get(params) {
		const groups =  await _axios({
			method: 'get',
			url: 'cms/article_list_get',
			params,
			handleError: true,
		})
		return groups
	}
	/**
	 * 获取article文章列表
	 * @param id
	 * @method get
	 */
	static async article_get(params) {
		const groups =  await _axios({
			method: 'get',
			url: 'cms/article_get',
			params,
			handleError: true,
		})
		return groups
	}

	/**
	 * article文章删除
	 * @method delete
	 */
	static async article_delete(data) {
		const groups =  await _axios({
			method: 'delete',
			url: 'cms/article_delete',
			data,
			handleError: true,
		})
		return groups
	}


  /**
   * article-belong新增
   * @method post
   */
  static async article_belong_add(data) {
  	const groups =  await _axios({
  		method: 'post',
  		url: 'cms/article_belong_add',
  		data,
  		handleError: true,
  	})
  	return groups
  }
  /**
   * 获取article-belong文章归属列表
   * @method get
   */
  static async article_belong_list_get(data) {
  	const groups =  await _axios({
  		method: 'get',
  		url: 'cms/article_belong_list_get',
  		data,
  		handleError: true,
  	})
  	return groups
  }

  /**
   * article-belong文章归属删除
   * @method delete
   */
  static async article_belong_delete(data) {
  	const groups =  await _axios({
  		method: 'delete',
  		url: 'cms/article_belong_delete',
  		data,
  		handleError: true,
  	})
  	return groups
  }
  /**
   * belong_get_type按照归属获取分类
   * @method get
   */
  static async belong_get_type(){
    const groups =  await _axios({
    	method: 'get',
    	url: 'cms/belong_get_type',
    	handleError: true,
    })
    return groups
  }
  
  /**
   * change_type_belong该别分类归属
   * @method post
   */
  static async change_type_belong(data){
    const groups =  await _axios({
    	method: 'post',
    	url: 'cms/change_type_belong',
      data,
    	handleError: true,
    })
    return groups
  }
}
