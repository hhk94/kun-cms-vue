const articleRouter = {
  route:' null',
  name: null,
  title: '文章管理',
  type: 'folder',
  icon: 'iconfont icon-huiyuanguanli',
  filePath: 'views/admin/',
  order: null,
  inNav: true,
  level:2,
  children: [
    {
      route: '/article/article-type',
      name: null,
      title: '文章分类设置',
      type: 'folder', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'views/Article/ArticleType',
      inNav: true,
     
    },
    
  ],
}

export default articleRouter
