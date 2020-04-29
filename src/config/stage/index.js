import bannerRouter from './banner.js'
import articleRouter from './article.js'
import userRouter from './user.js'
// import bookConfig from './book' // 引入图书管理路由文件
// import pluginsConfig from './plugins'
// import Utils from '@/lin/utils/util'	

let homeRouter = [
	{
	title: '坤',
	type: 'view',
	name: Symbol('default'),
	route: '/home/default',
	filePath: 'views/Home/Default.vue',
	inNav: true,
	icon: 'el-icon-info',
	order: 1,
	level:1
	},
	// {
	// title: '林间有风',
	// type: 'view',
	// name: Symbol('about'),
	// route: '/about',
	// filePath: 'views/about/About.vue',
	// inNav: true,
	// icon: 'iconfont icon-iconset0103',
	// level: 1,
	// },
	// {
	// title: '日志管理',
	// type: 'view',
	// name: Symbol('log'),
	// route:'null',
	// filePath: 'views/log/Log.vue',
	// inNav: true,
	// icon: 'iconfont icon-rizhiguanli',
	// level: 2,
	// children: [
	// 	{
	// 	route: '/admin/user/list',
	// 	name: null,
	// 	title: '用户管理',
	// 	type: 'folder', // 取 route 为默认加载页
	// 	icon: 'iconfont icon-huiyuanguanli',
	// 	filePath: 'views/admin/user/',
	// 	inNav: true,

	// 	},
	// ],
	// },
	bannerRouter,
	articleRouter,
	userRouter
  
]



export default homeRouter
