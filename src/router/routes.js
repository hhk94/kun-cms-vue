import homeRouter from './home-router'

const routes = [
	{
		path: '/home',
		name: 'Home',
		redirect: '/home/default',
		component: () => import('@/views/Home/Home'),
		children: [...homeRouter],
	},
	{
		path: '/',
		name: 'login',
		
		redirect: '/login',
	},
	{
		path: '/login',
		name: 'login',
		meta:{
			needLogin:false
		},
		component: () => import('@/views/Login/Login'),
	},
	
	// {
	// 	redirect: '/404',
	// 	path: '*',
	// }
]

export default routes
