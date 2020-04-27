<template>
	<section class="container">
		<router-view></router-view>
	</section>
</template>

<script>
export default {
  name: 'AppMain',
 
  
}
</script>

<style lang="scss" scoped>
.container {
	height: calc(100vh - 160px);
	// overflow: hidden;
	background: white;
}
</style>
