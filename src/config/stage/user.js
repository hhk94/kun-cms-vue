const userRouter = {
	route:' null',
	name: null,
	title: '用户管理',
	type: 'folder',
	icon: 'el-icon-s-custom',
	filePath: 'views/User/',
	order: null,
	inNav: true,
	level:1,
	children: [
	{
		route: '/user/user-list',
		name: null,
		title: '用户列表',
		type: 'folder', // 取 route 为默认加载页
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/User/UserList',
		inNav: true,
		needLogin:true,
	},
	{
		route: '/user/user-edit',
		name: null,
		title: '用户修改',
		type: 'folder', // 取 route 为默认加载页
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/User/UserEdit',
		inNav: true,
		needLogin:true,
	},

	],
}

export default userRouter
