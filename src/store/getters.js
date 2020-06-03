  
const getters = {
	token: state => state.Config.token,
	isCollapse:state =>state.Config.isCollapse,
	set_side_bar: state => state.Config.set_side_bar,
  // size: state => state.app.size,
  // device: state => state.app.device,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  // token: state => state.user.token,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // introduction: state => state.user.introduction,
  // roles: state => state.user.roles,
  // permission_routes: state => state.permission.routes,
  // errorLogs: state => state.errorLog.logs
}
export default getters