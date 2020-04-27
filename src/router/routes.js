import homeRouter from './home-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    // redirect: '/about',
    component: () => import('@/views/Home/Home'),
    children: [...homeRouter],
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
