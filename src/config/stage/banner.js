const bannerRouter = {
	route:' null',
	name: null,
	title: 'Banner管理',
	type: 'folder',
	icon: 'el-icon-s-ticket',
	filePath: 'views/admin/',
	order: null,
	in_nav: true,
	level:1,
	children: [
	{
		route: '/banner/banner-type',
		name: null,
		title: 'Banner分类设置',
		type: 'folder', // 取 route 为默认加载页
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/Banner/BannerType',
		in_nav: true,
		need_login:true,
	},
	{
		route: '/banner/banner',
		name: null,
		title: 'Banner设置',
		type: 'folder', // 取 route 为默认加载页
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/Banner/Banner',
		in_nav: true,
		need_login:true,
	},

	],
}

export default bannerRouter
