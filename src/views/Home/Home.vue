<template>
<div style="height:100%;">
	<el-container>
		<el-aside width="200px">
			<side-bar></side-bar>
		</el-aside>
		<el-container>
			<el-header>Header</el-header>
			<el-main style="">
				<app-main></app-main>
			</el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</el-container>
</div>
</template>

<script>

import {AppMain,SideBar} from '@/components/layout'
export default {
  name: 'Home',
  components:{
		AppMain,
		SideBar
  },
  data() {
    return {
     
    }
  },
  created() {},
  mounted() {
   
  },
  
  
  methods: {
  
  },
  watch: {
    
    
  },
 
}
</script>

<style lang="scss" scoped>
.el-header, .el-footer {
	background-color: #B3C0D1;
	color: #333;
	text-align: center;
	line-height: 60px;
}

.el-aside {
	background-color: #D3DCE6;
	color: #333;
	text-align: center;
	line-height: 200px;
}

.el-main {
	background-color: #E9EEF3;
	color: #333;
	text-align: center;
	line-height: 160px;
}
</style>
