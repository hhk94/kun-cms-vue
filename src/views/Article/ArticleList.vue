<template>
	<div class="ArticleAdd" v-loading="loading">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/default' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>文章列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="bot-body">
			<el-table
			:data="article_list"
			style="width: 100%"
			height="650">
			<el-table-column
			fixed
			prop="id"
			label="id"
			width="50">
			</el-table-column>
			<el-table-column
			prop="article_title"
			label="标题"
			width="">
			</el-table-column>
			<el-table-column
			prop="belong_article_type"
			label="类别"
			width="120">
			<template slot-scope="scope">
			<el-tag type="primary" >{{scope.row.belong_article_type.typename}}</el-tag>
			</template>
			</el-table-column>
			<el-table-column
			prop="belong_user"
			label="作者"
			width="200">
			<template slot-scope="scope">
			<el-tag type="info" >{{scope.row.belong_user.nick_name}}</el-tag>
			</template>
			</el-table-column>
			<el-table-column
			prop="has_comments_count"
			label="评论数"
			width="100">
			</el-table-column>
			<el-table-column
			fixed="right"
			label="操作"
			width="210">
			<template slot-scope="scope">
			<el-button
			@click.native.prevent="articleEdit(scope.row)"
			type="primary"
			size="small">
			编辑
			</el-button>
			<el-button
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
			</el-button>
			</template>
			</el-table-column>
			</el-table>
			<el-pagination
			background
			@current-change="handleCurrentChange"
			:current-page="page"
			layout="prev, pager, next"
			:total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import Article from '@/kun/api/article'
export default {
	name: 'ArticleList',
	data() {
		return {
			article_list:[],
			loading:false,
			page:1,
			size:10,
			total:5
		}
	},
	components: {
	},
	created() {},
	mounted() {
		this.article_list_get()
	},


	methods: {
		test(scrp){
			console.log(scrp)
		},
		articleEdit(row){//文章修改
			this.$router.push({path:'/article/article-edit',query:{article_id:row.id}})
		},
		show_blog(row){//去blog查看文章
			window.open(row.id)
		},
		articleDelete(row){
			this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				})
				.then(() => {
					this.article_delete(row)
				}).catch(() => {
					this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		async article_delete(row){
			let params = {
				id:row.id
			}
			let result
			try{
				this.loading = true
				result = await Article.article_delete(params)
			}catch(e){
				//TODO handle the exception
				this.loading = false
			}
			if(result.data.state==window.g.SUCCESS_STATE){
				this.loading = false
				this.$message.success(result.data.msg)
				this.article_list_get()
			}else{
				this.loading = false
				this.$notify({
					title: '提示',
					message: result.data.msg,
					type:'error'
				});
			}
		},
		handleCurrentChange(val) {
			this.page = val
			this.article_list_get()
		},
		async article_list_get(){
			let params = {
				size:this.size,
				page:this.page
			}
			let result
			try{
				this.loading = true
				result = await Article.article_list_get(params)
			}catch(e){
				//TODO handle the exception
				this.loading = false
			}
			if(result.data.state==window.g.SUCCESS_STATE){
				this.loading = false
				this.article_list = result.data.data.data
				this.total = result.data.total
			}else{
				this.loading = false
				this.$notify({
					title: '提示',
					message: result.data.msg,
					type:'error'
				});
			}
		},
		
	},
 
}
</script>

<style lang="scss" scoped>
.ArticleAdd{
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
