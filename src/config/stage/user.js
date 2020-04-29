const userRouter = {
	route:' null',
	name: null,
	title: '用户管理',
	type: 'folder',
	icon: 'el-icon-s-custom',
	filePath: 'views/User/',
	order: null,
	inNav: true,
	level:2,
	children: [
	{
		route: '/user/user-list',
		name: null,
		title: '用户列表',
		type: 'folder', // 取 route 为默认加载页
		icon: 'iconfont icon-huiyuanguanli',
		filePath: 'views/User/UserList',
		inNav: true,
	},

	],
}

export default userRouter
