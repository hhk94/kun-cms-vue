<template>
	<section class="header">
		<div class="bar-top">
			<i 
			:class="{'el-icon-s-unfold':true,'rotate':!this.isCollapse}"
			@click="routate()"
			></i>
			<div class="center" >
				<div class="padding-body">
					<div class="title">坤</div>
					<el-dropdown>
						<span class="el-dropdown-link">
							<div class="avatar"><img :src="this.$store.getters.token.app.avatar_img_url" alt=""></div>
						</span>
						<el-dropdown-menu slot="dropdown" class="user-box">
							<div class="user-info">
								<div class="avatar1" >
									<img :src="this.$store.getters.token.app.avatar_img_url" alt="">
									<label class="mask" @click="change_user">
										<i class="el-icon-edit"></i>
									</label>
								</div>
								<div class="text">
									<div class="username">{{this.$store.getters.token.app.nick_name}}</div>
									<div class="desc">{{this.$store.getters.token.app.scope_description}}</div>
								</div>
								<img src="@/assets/img/header/corner.png" alt="" class="corner">
							</div>
							<ul class="dropdown-box">
								<li @click="change_user">
									<i class="el-icon-unlock"></i>
									<span>修改密码</span>
								</li>
								<li @click="login_out">
									<i class="el-icon-unlock"></i>
									<span>退出登录</span>
								</li>
							</ul>
						</el-dropdown-menu>
					</el-dropdown>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'AppMain',
	data(){
		return{
			isCollapse:false
		}
	},
	methods:{
		routate(){
			this.isCollapse = !this.isCollapse
			this.$store.dispatch('Config/sideCollapse',this.isCollapse)
		},
		login_out(){
			this.$store.dispatch('Config/loginOut')
			this.$router.push('/')
		},
		change_user(){
			this.$router.push('/user/user-edit')
		}
	}
  
}
</script>

<style lang="scss" scoped>
.header {
	height: 60px;
	// overflow: hidden;
	background: #eef4f9;
	.bar-top{
		align-items: center;
		padding: 0 20px;
		height: 45px;
		background-color: white;
		display: flex;
		justify-content: flex-start;
		i{
			line-height: 45px;
			font-size: $title-fz;
			transition: all 0.3s;
			&.rotate{
				transform: rotate(-180deg);
			}
		}
		.center{
			width: 100%;
			height: 30px;
			.padding-body{
				padding-left: 10px;
				line-height: 30px;
				display: flex;
				justify-content: space-between;
				.title{
					color: #3963bc;
					font-size: $title-fz;
				}
				.avatar{
					width: 30px;
				}
				
			}
			
		}
	}
}
.user-box {
    width: 326px;
    background-color: none;
    background: transparent;
    margin-bottom: 0;
    padding-bottom: 0;
    border: none;
	.user-info{
		background-image: url('~@/assets/img/header/user-bg.png');
		background-size: 100% 100%;
		-webkit-transform: translateY(-10px);
		transform: translateY(-10px);
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-direction: row;
		flex-direction: row;
		padding: 35px 20px 25px 30px;
		z-index: 100;
		position: relative;
		.avatar1{
			width: 80px;
			height: 80px;
			border-radius: 50%;
			cursor: pointer;
			overflow: hidden;
			position: relative;
			.mask{
				opacity: 0;
				-webkit-transition: all .2s;
				transition: all .2s;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,.3);
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				-webkit-box-pack: center;
				-ms-flex-pack: center;
				justify-content: center;
				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
				cursor: pointer;
				color: #fff;
			}
			&:hover{
				.mask{
					opacity: 1;
				}
			}
		}
		.text{
			margin-left: 20px;
			color: #fff;
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-ms-flex-direction: column;
			flex-direction: column;
			-webkit-box-pack: center;
			-ms-flex-pack: center;
			justify-content: center;
			.username{
				margin-bottom: 10px;
				font-size: 16px;
			}
			.desc{
				font-size: 14px;
				color: #dee2e6;
			}
		}
		.corner{
			position: absolute;
			right: 12px;
			top: -9px;
			width: 27px;
			height: 10px;
		}
	}
	.dropdown-box{
		height: 122px;
		padding-left: 35px;
		color: #596c8e;
		font-size: $title-fz;
		background: #fff;
		margin-top: -10px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		li{	
			cursor: pointer;
			margin-top: 20px;
			i{
				margin-right: 10px;
			}
		}
		li+li{
			margin-bottom: 20px;
		}
	}
}

</style>
