const articleRouter = {
	route:'null',
	name: null,
	title: '文章管理',
	type: 'folder',
	icon: 'iconfont icon-huiyuanguanli',
	filePath: 'views/Article/',
	order: null,
	inNav: true,
	level:2,
	children: [
	{
		route: '/article/article-list',
		name: null,
		title: '文章列表',
		type: 'folder', // 取 route 为默认加载页
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/Article/ArticleList',
		inNav: true,
	},
	{
		route: '/article/article-add',
		name: null,
		title: '文章新增',
		type: 'folder', // 取 route 为默认加载页
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/Article/ArticleAdd',
		inNav: true,
	},
	{
		route: '/article/article-edit',
		name: null,
		title: '文章修改',
		type: 'folder', // 取 route 为默认加载页
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/Article/ArticleEdit',
		inNav: false,
	},

	],
}

export default articleRouter
