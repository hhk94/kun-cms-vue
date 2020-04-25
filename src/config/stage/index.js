// import adminConfig from './admin'
// import bookConfig from './book' // 引入图书管理路由文件
// import pluginsConfig from './plugins'
// import Utils from '@/lin/utils/util'

let homeRouter = [
  {
    title: '林间有风',
    type: 'view',
    name: Symbol('about'),
    route: '/about',
    filePath: 'views/about/About.vue',
    inNav: true,
    icon: 'iconfont icon-iconset0103',
    order: 1,
  },
  {
    title: '日志管理',
    type: 'view',
    name: Symbol('log'),
    route: '/log',
    filePath: 'views/log/Log.vue',
    inNav: true,
    icon: 'iconfont icon-rizhiguanli',
    order: 2,
    permission: ['查询所有日志'],
  },
  {
    title: '个人中心',
    type: 'view',
    name: Symbol('center'),
    route: '/center',
    filePath: 'views/center/Center.vue',
    inNav: false,
    icon: 'iconfont icon-rizhiguanli',
  },
  {
    title: '404',
    type: 'view',
    name: Symbol('404'),
    route: '/404',
    filePath: 'views/error-page/404.vue',
    inNav: false,
    icon: 'iconfont icon-rizhiguanli',
  },
  
]



export default homeRouter
