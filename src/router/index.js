import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/banner',
    component: Layout,
    name: 'Banner',
    redirect: '/banner/item',
    meta: { title: 'Banner相关', icon: 'wenzhang-copy' },
    children: [
      {
        path: 'item',
        name: 'BannerItem',
        component: () => import('@/views/Banner/Banner'),
        meta: { title: 'banner', icon: 'form' }
      },
      {
        path: 'type',
        name: 'BannerType',
        component: () => import('@/views/Banner/BannerType'),
        meta: { title: 'banner类别', icon: 'form' },
      },
    ]
  },
  {
    path: '/article',
    component: Layout,
    name: 'Article',
    redirect: '/article/article-list',
    meta: { title: '文章相关', icon: 'wenzhang-copy' },
    children: [
      {
        path: 'article-add',
        name: 'ArticleAdd',
        component: () => import('@/views/Article/ArticleAdd'),
        meta: { title: '文章新增', icon: 'form',noCache:true }
      },
      {
        path: 'article-edit/:article_id',
        name: 'ArticleEdit',
        component: () => import('@/views/Article/ArticleEdit'),
        meta: { title: '文章修改', icon: 'form',noCache:true,noVisit:true },
        hidden: true
      },
      {
        path: 'article-list',
        name: 'ArticleList',
        component: () => import('@/views/Article/ArticleList'),
        meta: { title: '文章列表', icon: 'table',noCache:true }
      },
    ]
  },
  {
    path: '/belong',
    component: Layout,
    redirect: '/belong/index',
    meta: { title: '文章归属', icon: 'wenzhang-copy' },
    children: [
      {
        path: 'index',
        name: 'Belong',
        component: () => import('@/views/Belong/Belong'),
        meta: { title: '文章归属首页', icon: 'form' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'User',
    redirect: '/user/user-list',
    meta: { title: '用户相关', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'user-edit',
        name: 'UserEdit',
        component: () => import('@/views/User/UserEdit'),
        meta: { title: '用户资料修改', icon: 'form' },

      },
      {
        path: 'user-list',
        name: 'UserList',
        component: () => import('@/views/User/UserList'),
        meta: { title: '用户列表', icon: 'table' }
      },
    ]
  },


  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },


  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
