<template>
	<section class="side-bar">
		<div class="logo"><img src="@/assets/img/logo/cms-logo1.png" alt=""></div>
		<swiper class="swiper" :options="swiperOption">
		<swiper-slide >
			<el-row class="tac">
			<el-col >
			<el-menu
			:default-active="this.$store.state.Config.side_active"
			class="el-menu-vertical-demo"
			@select="menuSelect"
			:router='true'
			background-color="#192a5e"
			text-color="rgb(196, 201, 210)"
			active-text-color="white">
			<div 
			v-for="item of groups"
			:key="item.key"
			class="item-body">
				<el-menu-item
				v-if="item.level==1"
				:index="item.route">
					<i :class="item.icon"></i>
					<span slot="title">{{item.title}}</span>
				</el-menu-item>
				
				<el-submenu 
				v-if="item.level==2"
				:index="item.route">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>{{item.title}}</span>
					</template>
					<el-menu-item-group>
						<el-menu-item 
						class="sec-nav"
						v-for="item2 of item.children"
						:key="item2.route"
						:index="item2.route">{{item2.title}}</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</div>
			</el-menu>
			</el-col>
			</el-row>
		</swiper-slide>
		<div class="swiper-scrollbar" slot="scrollbar"></div>
		</swiper>
	</section>
</template>

<script>
import stageConfig from '@/config/stage' // 引入舞台配置
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
	name: 'SideBar',
	components: {
		Swiper,
		SwiperSlide
	},
	data() {
		return {
			swiperOption: {
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: true,
				scrollbar: {
					el: '.swiper-scrollbar'
				},
				mousewheel: true
			},
			groups:[]
		}
	},
	mounted() {
		this.init()
	},
	methods:{
		menuSelect(key, keyPath){//side导航选中
			console.log(key, keyPath);
			// this.$store.dispatch('Config/set_side_active',key)
		},
		init() {
			function deepTravel(config, fuc) {
				if (Array.isArray(config)) {
					config.forEach(subConfig => {
						deepTravel(subConfig, fuc)
					})
				} else {
					fuc(config)
				}
			}
			deepTravel(stageConfig, viewConfig => {
				// 构造舞台view路由
				const viewRouter = {}
				viewRouter.route = viewConfig.route
				viewRouter.title = viewConfig.title
				viewRouter.level = viewConfig.level
				viewRouter.icon = viewConfig.icon
				viewRouter.key = Math.random()
				if(viewConfig.children){
					viewRouter.children = viewConfig.children
				}
				this.groups.push(viewRouter)
			})
		}
	}
}
</script>

<style scoped="scoped" lang="scss">
.side-bar{
	width: 200px;
	overflow: hidden;
	height: 100vh;
	background-color:$side-bg-color ;
	.logo{
		height: 60px;
		// background-color: #B3C0D1;
		color: white;
		display: flex;
		justify-content: center;
		img{
			width: 60px;
		}
	}
	
	.item-body{
		width: 200px;
		text-align: left;
		.sec-nav{
			font-size: 12px;
			position: relative;
			&::after{
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 20px;
				content: '';
				width: 4px;
				height: 4px;
				border-radius: 50%;
				border: 1px solid $side-default-color;
			}
		}
		::v-deep.is-active{
			background-color: $side-active-bg-color!important;
		}
	}
}
::v-deep .swiper{
	height: calc(100vh - 60px);
	color: white;
	overflow: hidden;
	.swiper-slide{
		height: auto;
	}
}
.el-menu-vertical-demo>li{
	// width: 200px;
}
</style>
