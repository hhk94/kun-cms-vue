<template>
	<section class="container">
		<transition name="el-zoom-in-center">
			<router-view></router-view>
		</transition>
	</section>
</template>

<script>
export default {
  name: 'AppMain',
 
  
}
</script>

<style lang="scss" scoped>
.container {
	min-height: calc(100vh - 160px);
	// overflow: hidden;
	background: white;
}
</style>
