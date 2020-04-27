const bannerRouter = {
	route:' null',
	name: null,
	title: 'Banner管理',
	type: 'folder',
	icon: 'iconfont icon-huiyuanguanli',
	filePath: 'views/admin/',
	order: null,
	inNav: true,
	level:2,
	children: [
	{
		route: '/banner/banner-type',
		name: null,
		title: 'Banner分类设置',
		type: 'folder', // 取 route 为默认加载页
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/Banner/BannerType',
		inNav: true,
	},
	{
		route: '/banner/banner',
		name: null,
		title: 'Banner设置',
		type: 'folder', // 取 route 为默认加载页
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/Banner/Banner',
		inNav: true,
	},

	],
}

export default bannerRouter
