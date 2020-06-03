const adminRouter = {
  route: null,
  name: null,
  title: '权限管理',
  type: 'folder',
  icon: 'iconfont icon-huiyuanguanli',
  filePath: 'views/admin/',
  order: null,
  in_nav: true,
  permission: ['超级管理员独有权限'],
  children: [
    {
      route: '/admin/user/list',
      name: null,
      title: '用户管理',
      type: 'folder', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'views/admin/user/',
      in_nav: true,
      children: [
        {
          title: '用户列表',
          type: 'view',
          name: Symbol('userList'),
          route: '/admin/user/list',
          filePath: 'views/admin/user/UserList.vue',
          in_nav: true,
          icon: 'iconfont icon-huiyuanguanli',
          permission: ['超级管理员独有权限'],
        },
        {
          title: '添加用户',
          type: 'view',
          in_nav: true,
          route: '/admin/user/add',
          icon: 'iconfont icon-add',
          name:Symbol('userAdd') ,
          filePath: 'views/admin/user/UserAdd.vue',
          permission: ['超级管理员独有权限'],
        },
      ],
    },
    {
      route: '/admin/group/list',
      name: null,
      title: '分组管理',
      type: 'tab', // 取 route 为默认加载页
      icon: null,
      filePath: 'views/admin/group',
      in_nav: true,
      children: [
        {
          route: '/admin/group/list',
          type: 'view',
          name: Symbol('groupList'),
          in_nav: true,
          filePath: 'views/admin/group/GroupList.vue',
          title: '分组列表',
          icon: 'iconfont icon-huiyuanguanli',
          permission: ['超级管理员独有权限'],
        },
        {
          route: '/admin/group/add',
          type: 'view',
          name: Symbol('groupAdd'),
          filePath: 'views/admin/group/GroupAdd.vue',
          in_nav: true,
          title: '添加分组',
          icon: 'iconfont icon-add',
          permission: ['超级管理员独有权限'],
        },
      ],
    },
  ],
}

export default adminRouter
