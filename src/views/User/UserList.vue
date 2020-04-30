<template>
	<div class="UserList" v-loading="loading">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/default' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="bot-body">
			<el-table
			:data="user_list"
			style="width: 100%"
			height="650">
			<el-table-column
			fixed
			prop="id"
			label="id"
			width="50">
			</el-table-column>
			<el-table-column
			prop="app_id"
			label="账号"
			width="">
			</el-table-column>
			<el-table-column
			prop="nick_name"
			label="昵称"
			width="">
			</el-table-column>
			<el-table-column
			prop="scope"
			label="权限"
			width="">
			</el-table-column>
			<el-table-column
			prop="scope_description"
			label="权限说明"
			width="">
			</el-table-column>
			<el-table-column
			prop="has_comments_count"
			label="评论数"
			width="100">
			</el-table-column>
			<el-table-column
			prop="avatar_img_url"
			label="头像"
			width="120">
				<template slot-scope="scope">
					<img :src="scope.row.avatar_img_url" alt="">
				</template>
			</el-table-column>
			<el-table-column
			fixed="right"
			label="操作"
			width="210">
				<template slot-scope="scope">
					<el-button
					@click.native.prevent="userEdit(scope.row)"
					type="primary"
					size="small">
					编辑
					</el-button>
					<!-- <el-button
					@click.native.prevent="show_blog(scope.row)"
					type="primary"
					size="small">
					查看
					</el-button>
					<el-button
					@click.native.prevent="articleDelete(scope.row)"
					type="danger"
					size="small">
					移除
					</el-button> -->
				</template>
			</el-table-column>
			</el-table>
			<el-pagination
			background
			@current-change="handleCurrentChange"
			:current-page="page"
			:page-size="size"
			layout="prev, pager, next"
			:total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import Admin from '@/kun/api/admin'
export default {
	name: 'UserList',
	data() {
		return {
			loading:false,
			user_list:[],//文章分类列表数组
			page:1,
			size:10,
			total:5
		}
	},
	created() {},
	mounted() {
		this.user_list_get()
	},


	methods: {
		userEdit(row){
			this.$router.push({path:'/user/user-edit',query:{id:row.id}})
		},
		handleCurrentChange(val) {
			this.page = val
			this.user_list_get()
		},
		async user_list_get(){
			let params = {
				size:this.size,
				page:this.page
			}
			let result
			try{
				this.loading = true
				result = await Admin.user_list_get(params)
			}catch(e){
				//TODO handle the exception
				this.loading = false
			}
			if(result.data.state==window.g.SUCCESS_STATE){
				this.loading = false
				this.user_list = result.data.data.data
				this.total = result.data.total
				
			}else{
				this.loading = false
				this.$notify({
					title: '提示',
					message: result.data.msg,
					type:'error'
				});
			}
		}
	},
 
}
</script>

<style lang="scss" scoped>
.UserList{
	padding: 20px;
	// border: 1px solid black;
	.bot-body{
		padding: 20px;
		// max-width: 800px;
		margin: 0 auto;
		
	}
}
::v-deep .el-pagination{
	width: fit-content;
	margin: 20px auto 0 auto;
}
</style>
