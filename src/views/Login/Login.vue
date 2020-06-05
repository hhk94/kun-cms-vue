<template>
	<div class="login">
	<div class="team-name hidden-sm-and-down"><img src="@/assets/img/login/kun4.png" alt="logo" /></div>
	<div class="form-box" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
	<div class="title"><h1 title="Lin">Kun CMS</h1></div>
	<form class="login-form" autocomplete="off" @submit.prevent="throttleLogin()">
	<div class="form-item nickname">
	<span class="icon account-icon"></span>
	<input type="text" v-model="form.username" autocomplete="off" placeholder="请填写用户名" />
	</div>
	<div class="form-item password">
	<span class="icon secret-icon"></span>
	<input type="password" v-model="form.password" autocomplete="off" placeholder="请填写用户登录密码" />
	</div>
	<button class="submit-btn" type="submit">登录</button>
	</form>
	</div>
	</div>
</template>

<script>

import Admin from '@/kun/api/admin'
import Utils from '@/kun/utils/util'
import Config from '@/config'

export default {
  name: 'login',
  data() {
    return {
      loading: false, // 加载动画
      wait: 2000, // 2000ms之内不能重复发起请求
      throttleLogin: null, // 节流登录
      form: {
        username: 'hk',
        password: '20120942',
      },
    }
  },
  methods: {
	async login() {
		const { username, password } = this.form
		let data = {
			appid:username,
			appsecret:password
		}
		let result
		try {
			this.loading = true
			result = await Admin.user_login(data)
			
		} catch (e) {
			this.loading = false
			console.log(e)
		}
		if(result.data.state==window.g.SUCCESS_STATE){
			this.loading = false
			this.$message.success('登录成功')
			this.$store.dispatch('Config/set_token',result.data.data)
			
			this.$router.push(Config.defaultRoute)
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
	created() {
		console.log('login.router')
		console.log(this.$router)
		// 节流登录
		this.throttleLogin = Utils.throttle(this.login, this.wait)
	},
  components: {},
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-size: auto;
  background: #1b2c5f url('../../assets/img/login/login-ba.png') no-repeat center center;

  .team-name {
    position: fixed;
    left: 40px;
    top: 50%;
    width: 50px;
    transform: translateY(-50%);
  }

  .form-box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 445px;

    .title {
      height: 37px;
      font-size: 30px;
      line-height: 37px;
      margin-bottom: 15%;

      h1 {
        padding-left: 74px;
        box-sizing: border-box;
        text-align: left;
        color: #8c98ae;
      }
    }

    .login-form {
      width: 100%;

      .form-item {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding-bottom: 13px;
        margin-bottom: 34px;

        input {
          width: 100%;
          height: 100%;
          background: transparent;
          color: #c4c9d2;
          font-size: 14px;
          padding-left: 74px;
          box-sizing: border-box;
        }
      }

      .form-item.nickname {
        background: url('../../assets/img/login/nickname.png') no-repeat;
        background-size: 100% auto;
        background-position: left bottom;
      }

      .form-item.password {
        background: url('../../assets/img/login/password.png') no-repeat;
        background-size: 100% auto;
        background-position: left bottom;
      }

      .submit-btn {
        width: 100%;
        height: 70px;
        color: #c4c9d2;
        font-size: 16px;
        text-align: left;
        box-sizing: border-box;
        padding: 0 10px;
        padding-left: 74px;
        background: url('../../assets/img/login/login-btn.png') no-repeat;
        background-size: 90% auto;
        background-position: center bottom;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>
