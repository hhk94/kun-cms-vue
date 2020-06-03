const articleRouter = {
	route:'null',
	name: null,
	title: '文章管理',
	type: 'folder',
	icon: 'el-icon-s-management',
	filePath: 'views/Article/',
	order: null,
	in_nav: true,
	level:1,
	children: [
	{
		route: '/article/article-list',
		name: null,
		title: '文章列表',
		type: 'folder', // 取 route 为默认加载页
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/Article/ArticleList',
		in_nav: true,
		need_login:true,
	},
	{
		route: '/article/article-add',
		name: null,
		title: '文章新增',
		type: 'folder', // 取 route 为默认加载页
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/Article/ArticleAdd',
		in_nav: true,
		need_login:true,
	},
	{
		route: '/article/article-edit',
		name: null,
		title: '文章修改',
		type: 'folder', // 取 route 为默认加载页
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/Article/ArticleEdit',
		in_nav: false,
		need_login:true,
	},

	],
}

export default articleRouter
