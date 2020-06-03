//路由配置文件路由
const cmsRouter = {
	route:' null',
	name: null,
	title: 'Router管理',
	icon: 'el-icon-s-ticket',
	filePath: '',
	in_nav: true,
	level:1,
	children: [
	{
		route: '/router/router-add',
		name: 'router-add',
		title: 'Router新增',
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/Router/RouterAdd',
		in_nav: true,
		need_login:true,
	},

	],
}

export default cmsRouter
