<template>
	<div class="article-type" v-loading="loading">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/default' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item >banner设置</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="bot-body">
			<div class="bot-item">
				<h1 class="title">添加banner</h1>
				<div class="input-body">
					<span>id:</span>
					<el-input
					placeholder=""
					disabled
					v-model="banner_item.id"
					>
					</el-input>
				</div>
				<div class="input-body">
					<span>分类名:</span>
					<el-input
					placeholder="请输入banner名"
					v-model="banner_item.banner_name"
					>
					</el-input>
				</div>
				<div class="input-body">
					<span>跳转路径:</span>
					<el-input
					placeholder="跳转路径"
					v-model="banner_item.jump_url"
					>
					</el-input>
				</div>
				<div class="input-body">
					<span>banner分类：</span>
					<el-select v-model="banner_item.banner_type_id" placeholder="请选择">
						<el-option
						v-for="item in banner_type_list"
						:key="item.id"
						:label="item.typename"
						:value="item.id">
						</el-option>
					</el-select>
				</div>
				<div class="input-body">
					<span class="avatar-des">banner：</span>
					<el-upload
					class="avatar-uploader"
					:action="action_banner_url"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
				
				<div class="submit-body">
					<el-button type="primary"  class="submit" @click="clear">清空</el-button>
					<el-button type="primary"  class="submit" @click="submit()">新增/修改</el-button>
				</div>
				
			</div>
			<div class="bot-item">
				<el-table
				:data="banner_list"
				border
				style="width: 100%">
				<el-table-column
				fixed
				prop="id"
				label="id"
				width="50">
				</el-table-column>
				<el-table-column
				prop="banner_name"
				label="banner名"
				width="200">
				</el-table-column>
				<el-table-column
				prop="jump_url"
				label="跳转路径"
				width="">
				</el-table-column>
				<el-table-column
				prop="banner_type"
				label="banner类别名"
				width="200">
				<template slot-scope="scope">
					
					<el-tag type="info">{{scope.row.banner_type.id}}.{{scope.row.banner_type.typename}}</el-tag>
				</template>
				</el-table-column>
				<el-table-column
				prop="banner_img_url"
				label="缩略图"
				width="100">
				<template slot-scope="scope">
					<img :src="scope.row.banner_img_url" alt="">
				</template>
				</el-table-column>
				<el-table-column
				fixed="right"
				label="操作"
				width="200">
				<template slot-scope="scope">
					<el-button type="primary" plain size="mini" @click="banner_edit(scope.row)">编辑</el-button>
					<el-button type="danger" plain size="mini">删除</el-button>
				</template>
				</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
import Config from '@/config'
import Banner from '@/kun/api/banner'
export default {
	name: 'BannerType',
	data() {
		return {
			loading:false,
			imageUrl:'',
			banner_list:[],
			banner_type_list:[],
			banner_item:{
				id:'',
				banner_name:'',
				jump_url:'',
				banner_type_id:'',
				banner_img_id:''
			},
			action_banner_url:'cms/add_banner_img'
			
		}
	},
	created() {},
	mounted() {
		this.action_banner_url = Config.baseURL + this.action_banner_url
		this.banner_list_get()
		this.banner_type_list_get()
	},


	methods: {
		handleAvatarSuccess(res, file) {//头像上传回调
			this.imageUrl = URL.createObjectURL(file.raw);
			this.banner_item.banner_img_id = res.id
		},
		beforeAvatarUpload(file) {//上传前判断
		const isJPG = file.type === 'image/jpeg';
		const isPNG = file.type === 'image/png';
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isJPG&&!isPNG) {
		this.$message.error('上传头像图片只能是 JPG 格式!');
		}
		if (!isLt2M) {
		this.$message.error('上传头像图片大小不能超过 2MB!');
		}
		return isJPG||isPNG && isLt2M;
		},
		async banner_type_list_get(){//分类列表
			let result 
			try {
				this.loading = true
				result = await Banner.banner_type_list_get()
			} catch (e) {
				this.loading = false
				console.log(e)
			}
			if(result.data.state==window.g.SUCCESS_STATE){
				this.loading = false
				console.log(result)
				this.banner_type_list = result.data.data
			}else{
				this.loading = false
				this.$notify({
					title: '提示',
					message: result.data.msg,
					type:'error'
				});
			}
		},
		async banner_list_get(){//banner列表
			let data = {
				banner_type_id:''
			}
			let result 
			try {
				this.loading = true
				result = await Banner.banner_list_get(data)
			} catch (e) {
				this.loading = false
				console.log(e)
			}
			if(result.data.state==window.g.SUCCESS_STATE){
				this.loading = false
				console.log(result)
				this.banner_list = result.data.data
			}else{
				this.loading = false
				this.$notify({
					title: '提示',
					message: result.data.msg,
					type:'error'
				});
			}
		},
		banner_edit(row){//修改
			this.banner_item.id =row.id
			this.banner_item.banner_name = row.banner_name
			this.banner_item.jump_url = row.jump_url
			this.banner_item.banner_type_id = row.banner_type_id
			this.banner_item.banner_img_id = row.banner_img_id
			this.imageUrl = row.banner_img_url
			this.$notify({
			title: '成功提示',
			message: '请去左侧提交修改',
			type: 'success'
			});
		},
		async submit(){
			console.log(this.banner_item)
			let result
			try {
				this.loading = true
				result = await Banner.banenr_add(this.banner_item)
			} catch (e) {
				this.loading = false
				console.log(e)
			}
			let type
			if(result.data.state==window.g.SUCCESS_STATE){
				type = 'success'
			}else{
				type = 'error'
			}
			this.loading = false
			this.$notify({
				title: '提示',
				message: result.data.msg,
				type:type
			});
			this.clear()
			this.banner_list_get()
		},
		clear(){
			this.banner_item.id = ''
			this.banner_item.banner_name = ''
			this.banner_item.jump_url = ''
			this.banner_item.banner_type_id = ''
			this.banner_item.banner_img_id = ''
			this.imageUrl = ''
		}
	},
	watch: {


	},
 
}
</script>

<style lang="scss" scoped>
.article-type{
	padding: 20px;
	// border: 1px solid black;
}
.bot-body{
	// display: flex;
	// justify-content: space-between;
	.bot-item{
		// background: red;
		width: 100%;
		// height: 500px;
		padding: 20px;
		box-sizing: border-box;
		.title{
			font-size: $title-fz;
			color: $word-color;
		}
		
		.input-body{
			margin: 0 auto;
			margin-top: 20px;
			display: flex;
			width: 500px;
			
			&:first-of-type{
				margin-top: 50px;
			}
			span{
				width: 100px;
				text-align: right;
				line-height: 40px;
				padding-right: 10px;
			}
			::v-deep .el-input,.el-select{
				width: 392px;
			}
		}
		.submit-body{
			width: 500px;
			margin: 20px auto;
			display: flex;
			justify-content: space-around;
		}
		.submit{
			
			width: 50%;
			
		}
	}
}
::v-deep .avatar-uploader .el-upload {
border: 1px dashed #d9d9d9;
border-radius: 6px;
cursor: pointer;
position: relative;
overflow: hidden;
width: 178px;
margin: 20px auto;
display: block;
}
::v-deep .avatar-uploader .el-upload:hover {
border-color: #409EFF;
}
::v-deep .avatar-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 178px;
height: 178px;
line-height: 178px;
text-align: center;
}
::v-deep .avatar {
width: 178px;
height: auto;
display: block;
position: relative;
}
.avatar-des{
	text-align: center;
	width: 100%;
}
</style>
