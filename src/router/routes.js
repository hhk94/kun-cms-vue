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
		component: () => import('@/views/Login/Login'),
	},
	{
		path: '/test',
		name: 'test',
		component: () => import('@/views/Home/Home'),
	},
	{
		redirect: '/404',
		path: '*',
	}
]

export default routes
