<template>
	<div class="ArticleAdd" v-loading="loading">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/default' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>{{this.$route.meta.title}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="bot-body">
			<div class="example">
				<h1 class="title">示例</h1>
				<el-form ref="form_example" :model="form_example" label-width="80px">
					<el-form-item label="路由标题">
						<el-input
							placeholder="请输入内容"
							v-model="form_example.title"
							disabled
							clearable>
						</el-input>
					</el-form-item>
					<el-form-item label="路由名字">
						<el-input
							placeholder="请输入内容"
							v-model="form_example.router_name"
							disabled
							clearable>
						</el-input>
					</el-form-item>
					<el-form-item label="路由路径">
						<el-input
							placeholder="请输入内容"
							v-model="form_example.route"
							disabled
							clearable>
						</el-input>
					</el-form-item>
					<el-form-item label="路由图标">
						<el-input
							placeholder="请输入内容"
							v-model="form_example.icon"
							disabled
							clearable>
						</el-input>
					</el-form-item>
					<el-form-item label="文件路径">
						<el-input
							placeholder="请输入内容"
							v-model="form_example.file_path"
							disabled
							clearable>
						</el-input>
					</el-form-item>
					<el-form-item label="">
						<el-col :span="11">
							<el-form-item label="导航显示">
								<el-switch v-model="form_example.in_nav"
								active-value="1"
								inactive-value="0"
								disabled></el-switch>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="11">
							<el-form-item label="导航显示">
								<el-switch v-model="form_example.need_login"
								active-value="1"
								inactive-value="0"
								disabled></el-switch>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="路由等级">
						<el-input
						placeholder="请输入内容"
						v-model="form_example.level"
						disabled
						clearable>
						</el-input>
					</el-form-item>
					<el-form-item label="归属">
						<el-select v-model="form_example.pre_id" 
						disabled
						filterable placeholder="请选择">
						<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			
			<div class="example">
				<h1 class="title">新增</h1>
				<el-form ref="form_add" :model="form_add" label-width="80px" :rules="rules">
					<el-form-item label="路由标题" prop="title">
						<el-input
							placeholder="请输入内容"
							v-model="form_add.title"
							clearable>
						</el-input>
					</el-form-item>
					<el-form-item label="路由名字" prop="router_name">
						<el-input
							placeholder="请输入内容"
							v-model="form_add.router_name"
							clearable>
						</el-input>
					</el-form-item>
					<el-form-item label="路由路径" prop="route">
						<el-input
							placeholder="请输入内容"
							v-model="form_add.route"
							clearable>
						</el-input>
					</el-form-item>
					<el-form-item label="路由图标" prop="icon">
						<el-input
							placeholder="请输入内容"
							v-model="form_add.icon"
							clearable>
						</el-input>
					</el-form-item>
					<el-form-item label="文件路径" prop="file_path">
						<el-input
							placeholder="请输入内容"
							v-model="form_add.file_path"
							clearable>
						</el-input>
					</el-form-item>
					<el-form-item label="">
						<el-col :span="6">
							<el-form-item label="导航显示" prop="in_nav">
								<el-switch v-model="form_add.in_nav"
								></el-switch>
							</el-form-item>
						</el-col>
						<el-col class="line" :span="2">-</el-col>
						<el-col :span="16">
							<el-form-item label="需要登录" prop="need_login">
								<el-switch v-model="form_add.need_login"
								></el-switch>
							</el-form-item>
						</el-col>
					</el-form-item>
					<el-form-item label="路由等级" prop="level">
						<el-input
						placeholder="请输入内容"
						v-model="form_add.level"
						clearable>
						</el-input>
					</el-form-item>
					<el-form-item label="归属" prop="pre_id">
						<el-select v-model="form_add.pre_id" filterable placeholder="请选择">
						<el-option
						v-for="item in router_list"
						:key="item.value"
						:label="item.title"
						:value="item.id">
						</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit('form_add')">立即创建</el-button>
						<el-button @click="resetForm('form_add')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			
		</div>
	</div>
</template>

<script>
import Router from '@/kun/api/router'
export default {
	name: 'RouterAdd',
	data() {
		return {
			options: [{
						value: 0,
						label: 'Router管理'
			}, ],
			options2: [{
						value: 0,
						label: '1J路由无归属'
			}, ],
			loading:false,
			router_list:[{
				id: 0,
				title: '1J路由无归属'
			}],//文章分类列表数组
			form_example:{
				title:'Router新增',
				router_name:'RouterAdd',
				route:'/router/router-add',
				icon:'iconfont icon-huiyuanguanli',
				file_path:'views/Router/RouterAdd',
				in_nav:'1',
				need_login:true,
				level:'2',
				pre_id:0
			},
			form_add:{
				title:'',
				router_name:'',
				route:'',
				icon:'',
				file_path:'',
				in_nav:true,
				need_login:true,
				level:'',
				pre_id:''
			},
			rules: {
				title: [
					{ required: true, message: '请输入路由标题', trigger: 'blur' },
				],
				router_name: [
					{ required: true, message: '请输入路由名字', trigger: 'blur' }
				],
				route: [
					{  required: true, message: '请输入路由路径', trigger: 'blur' }
				],
				icon: [
					{  required: true, message: '请输入路由图标', trigger: 'blur' }
				],
				file_path: [
					{ required: true, message: '请输入文件路径', trigger: 'blur' }
				],
				in_nav: [
					{ required: true, message: '请选择是否导航显示', trigger: 'blur' }
				],
				need_login: [
					{ required: true, message: '请选择是否需要登录', trigger: 'blur' }
				],
				level: [
					{ required: true, message: '请填写路由等级', trigger: 'blur' }
				],
				pre_id: [
					{ required: true, message: '请选择归属', trigger: 'change' }
				]
			}
		}
	},
	components: {
	},
	created() {
	},
	mounted() {
		this.router_list_get()
	},


	methods: {
		submit(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
				console.log(this.form_add)
				this.router_add()
				} else {
				console.log('error submit!!');
				return false;
				}
			});
		},
		async router_add(){
			let result
			try{
				this.loading = true
				result = await Router.router_add(this.form_add)
			}catch(e){
				//TODO handle the exception
				this.loading = false
			}
			if(result.data.state==window.g.SUCCESS_STATE){
				this.loading = false
				this.$notify({
					title: '提示',
					message: result.data.msg+'请退出后查看',
					type:'error'
				});
				// this.$store.dispatch('Config/set_side_bar')
			}else{
				this.loading = false
				this.$notify({
					title: '提示',
					message: result.data.msg,
					type:'error'
				});
			}
		},
		
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		clear(){
			
			this.ariticle_item.article_id = ''
			this.ariticle_item.article_title = ''
			this.ariticle_item.article_type_id = ''
			this.ariticle_item.article_content = ''
			this.ariticle_item.article_html = ''
			this.select_group.splice(0,this.select_group.length)
		},
		async router_list_get(){//获取文章分类列表
			let params ={
				type:'select'
			}
			let result 
			try{
				this.loading = true
				result = await Router.router_list(params)
			}catch(e){
				//TODO handle the exception
				this.loading = false
			}
			if(result.data.state==window.g.SUCCESS_STATE){
				this.loading = false
				this.router_list = [...this.router_list,...result.data.data]
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
		
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		.example{
			width: 45%;
		}
		.title{
			font-size: $title-fz;
			color: $word-color;
			text-align: center;
			margin: 20px;
		}
		.submit-body{
			margin-top: 20px;
		}
	}
}
</style>
