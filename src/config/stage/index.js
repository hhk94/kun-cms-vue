import bannerRouter from './banner.js'
import articleRouter from './article.js'
import userRouter from './user.js'

let homeRouter = [
	{
	title: '坤',
	type: 'view',
	name: Symbol('default'),
	route: '/home/default',
	filePath: 'views/Home/Default.vue',
	inNav: true,
	needLogin:true,
	icon: 'el-icon-info',
	order: 1,
	level:1
	},
	bannerRouter,
	articleRouter,
	userRouter
  
]



export default homeRouter
