<template>
	<div class="UserEdit" v-loading="loading">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/default' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户信息修改</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="bot-body">
			
		</div>
	</div>
</template>

<script>
import Admin from '@/kun/api/admin'
export default {
	name: 'UserEdit',
	data() {
		return {
			loading:false,
		}
	},
	created() {},
	mounted() {
	},


	methods: {
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
		
	}
}
</style>
