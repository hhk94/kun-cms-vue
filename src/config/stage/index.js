import bannerRouter from './banner.js'
import articleRouter from './article.js'
import userRouter from './user.js'
import cmsRouter from './cms_router.js'
import config from '@/config/index.js'//引入配置
import Router from '@/kun/api/router.js'//api
let homeRouter = [
	{
	title: '坤',
	type: 'view',
	name: 'default',
	route: '/home/default',
	filePath: 'views/Home/Default.vue',
	in_nav: true,
	need_login:true,
	icon: 'el-icon-info',
	order: 1,
	level:1
	},
	{
		title: '404',
		type: 'view',
		name: '404',
		route: '/404',
		filePath: 'views/error-page/404.vue',
		in_nav: false,
		icon: 'iconfont icon-rizhiguanli',
	},
	// bannerRouter,
	// articleRouter,
	// userRouter,
	cmsRouter
]
export default homeRouter

//根据config.is_local_router来配置 路由是本地还是后台配置
export async function add_router(homeRouter){
	let set_side_bar
	switch (config.is_local_router){
		case true:
			set_side_bar = [...bannerRouter,...articleRouter,...userRouter]
			break;
		case false:{
			let params = {
				type:'router'
			}
			let result
			try {
				result = await Router.router_list(params)
			} catch (e) {
				console.log(e)
			}
			if(result.data.state==window.g.SUCCESS_STATE){
				
				set_side_bar = result.data.data
			}else{
				this.$notify({
					title: '提示',
					message: result.data.msg,
					type:'error'
				});
			}
			break;
		}
			
	}
	return homeRouter = [...homeRouter,...set_side_bar]
}