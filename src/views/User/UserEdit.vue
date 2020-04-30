<template>
	<div class="UserEdit" v-loading="loading">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/default' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户信息修改</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="bot-body">
			<div class="bot-item">
				<h1 class="title">用户信息修改</h1>
				<div class="input-body">
					<span>id:</span>
					<el-input
					placeholder=""
					disabled
					v-model="user_item.id"
					>
					</el-input>
				</div>
				<div class="input-body">
					<span>账号:</span>
					<el-input
					placeholder=""
					disabled
					v-model="user_item.appid"
					>
					</el-input>
				</div>
				<div class="input-body">
					<span>昵称:</span>
					<el-input
					placeholder="请输入昵称"
					v-model="user_item.nick_name"
					>
					</el-input>
				</div>
				<div class="input-body">
					<span>新密码:</span>
					<el-input
					placeholder="新密码"
					v-model="user_item.new_psd"
					>
					</el-input>
				</div>
				
				<div class="input-body">
					<span class="avatar-des">头像：</span>
					<el-upload
					class="avatar-uploader"
					:action="action_avatar_url"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
				
				<div class="submit-body">
					<!-- <el-button type="primary"  class="submit" @click="clear">清空</el-button> -->
					<el-button type="primary"  class="submit" @click="submit()">修改</el-button>
				</div>
				
			</div>
			
			<el-dialog title="修改密码需要验证旧密码" :visible.sync="dialogFormVisible" center>
				<el-form >
					<el-form-item label="旧密码" >
						<el-input 
						v-model="user_item.psd"
						placeholder="请输入旧密码"
						autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="check_psd()">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import Config from '@/config'
import Admin from '@/kun/api/admin'

export default {
	name: 'UserEdit',
	data() {
		return {
			dialogFormVisible:false,
			loading:false,
			imageUrl:'',
			user_item:{
				id:'',
				avatar_img_id:'',
				appid:'',
				psd:'',
				new_psd:'',
				nick_name:''
			},
			action_avatar_url:'cms/add_user_avatar'
		}
	},
	created() {},
	mounted() {
		
		let id
		try{
			id = typeof this.$route.query.id =='undefined'?this.$store.getters.token.app.id:this.$route.query.id
			this.user_get(id)
		}catch(e){
			//TODO handle the exception
		}
		
		this.action_avatar_url = Config.baseURL + this.action_avatar_url
	},


	methods: {
		handleAvatarSuccess(res, file) {//头像上传回调
			this.imageUrl = URL.createObjectURL(file.raw);
			this.user_item.avatar_img_id = res.id
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
		async user_get(id){
			let params = {
				id:id
			}
			let result
			try{
				this.loading = true
				result = await Admin.user_get(params)
			}catch(e){
				//TODO handle the exception
				this.loading = false
			}
			if(result.data.state==window.g.SUCCESS_STATE){
				this.loading = false
				console.log(result)
				this.user_item.id = result.data.data.id
				this.user_item.appid = result.data.data.app_id
				this.user_item.nick_name = result.data.data.nick_name
				this.imageUrl = result.data.data.avatar_img_url
				
			}else{
				this.loading = false
				this.$notify({
					title: '提示',
					message: result.data.msg,
					type:'error'
				});
			}
		},
		submit(){
			console.log(this.user_item)
			if(this.user_item.new_psd){//如果输入新密码，需要验证旧密码
				this.dialogFormVisible = true
				return false;
			}
			this.user_change()
		},
		check_psd(){
			if(this.user_item.psd){//如果输入新密码，需要验证旧密码
				this.dialogFormVisible = false
				this.user_change()
			}else{
				this.$notify({
					title: '提示',
					message: '修改密码需要验证旧密码',
					type:'error'
				});
			}
		},
		async user_change(){
			let result
			try{
				this.loading = true
				result = await Admin.user_change(this.user_item)
			}catch(e){
				//TODO handle the exception
				this.loading = false
			}
			if(result.data.state==window.g.SUCCESS_STATE){
				this.loading = false
				console.log(result)
				console.log('result.data.change_psd'+result.data.change_psd)
				if(result.data.change_psd){
					
					this.$store.dispatch('Config/loginOut')
				}
				this.clear()
				this.$message.success(result.data.msg)
				
			}else{
				this.loading = false
				this.$notify({
					title: '提示',
					message: result.data.msg,
					type:'error'
				});
			}
			
		},
		clear(){
			this.user_item.psd =  ''
			this.user_item.new_psd =  ''
		},
	},
 
}
</script>

<style lang="scss" scoped>
.UserEdit{
	padding: 20px;
	// border: 1px solid black;
	.bot-body{
		padding: 20px;
		// max-width: 800px;
		margin: 0 auto;
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
