<template>
  <div v-loading="loading" class="article-type">
    <div class="bot-body">
      <div class="bot-item">
        <h1 class="title">添加视频</h1>

        <el-form ref="ruleForm" :model="video_item" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="id">
            <el-input v-model="video_item.id" disabled />
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="video_item.title" />
          </el-form-item>
          <el-form-item label="跳转路径" prop="jump_url">
            <el-input v-model="video_item.jump_url" />
          </el-form-item>
          <el-form-item label="cover" prop="video_img_id">
            <el-upload
              class="avatar-uploader"
              :action="action_banner_url"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >

              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
import Video from '@/api/video'
export default {
  name: 'AddVideo',
  data() {
    return {
      loading: false,
      imageUrl: '',
      video_item: {
        id: '',
        title: '',
        jump_url: '',
        video_img_id: ''
      },
      action_banner_url: 'cms/add_video_img',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        jump_url: [
          { required: true, message: '请填写跳转路径', trigger: 'blur' }
        ],
        video_img_id: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      }

    }
  },
  mounted() {
    this.action_banner_url = window.g.baseURL + this.action_banner_url
  },

  methods: {
    handleAvatarSuccess(res, file) { // 头像上传回调
      this.imageUrl = URL.createObjectURL(file.raw)
      this.video_item.video_img_id = res.id
    },
    beforeAvatarUpload(file) { // 上传前判断
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG || isPNG && isLt2M
    },
    async submit() {
      let result
      try {
        this.loading = true
        result = await Video.video_add(this.video_item)
      } catch (e) {
        this.loading = false
        console.log(e)
      }
      if (result.state == window.g.SUCCESS_STATE) {
        this.loading = false
        this.$message.success(result.msg)
        this.resetForm('ruleForm')
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: result.msg,
          type: 'error'
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.imageUrl = ''
    }
  }

}
</script>

<style lang="scss" scoped>
.article-type{
	padding: 20px;
	// border: 1px solid black;
}
.demo-ruleForm{
  width: 700px;
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
			font-size:16px;
			color: #3963bc;
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
