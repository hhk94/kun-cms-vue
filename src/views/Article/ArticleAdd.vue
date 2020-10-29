<template>
  <div v-loading="loading" class="ArticleAdd">

    <div class="bot-body">
      <div class="input-body">
        <span class="name">标题：</span>
        <el-input
          v-model="ariticle_item.article_title"
          placeholder="请输入内容"
          clearable
        />
      </div>
      <!-- 分类标签 -->
      <div class="input-body">
        <span class="name">分类标签：</span>
        <div class="tag-body">
          <el-tag
            v-for="tag in article_type_list"
            :key="tag.id"
            closable
            :effect="select_group.indexOf(tag)!=-1?'dark':'light'"
            :disable-transitions="false"
            @click="article_type_select(tag)"
            @close="handleClose(tag)"
          >
            {{ tag.typename }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
      </div>
      <!-- 文章归属 -->
      <div class="input-body">
        <span class="name">文章归属：</span>
        <div class="tag-body">
          <el-tag
            v-for="tag in article_belong_list"
            :key="tag.id"
            closable
            type="success"
            :effect="select_group_belong.indexOf(tag)!=-1?'dark':'light'"
            :disable-transitions="false"
            @click="article_belong_select(tag)"
            @close="handleClose_belong(tag)"
          >
            {{ tag.english }}
          </el-tag>
          <el-input
            v-if="inputVisibleBelong"
            ref="saveBelongInput"
            v-model="inputValueBelong"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm_belong"
            @blur="handleInputConfirm_belong"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInputBelong">+ New Belong</el-button>
        </div>
      </div>

      <div class="input-body">
        <span class="name">cover：</span>
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
      </div>

      <mavon-editor
        ref="md"
        v-model="ariticle_item.article_content"
        style="height: 500px;z-index: 998;"
        @change="md_change"
        @save="md_save"

        @imgAdd="$imgAdd"
      />
      <div class="submit-body">
        <el-button type="primary" @click="md_save()">提交</el-button>
        <el-button type="danger" @click="clear()">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Article from '@/api/article'
export default {
  name: 'ArticleAdd',
  components: {
    mavonEditor
  },
  data() {
    return {
      // tags标签处理
      inputVisible: false,
      inputValue: '',
      select_group: [],
      article_type_list: [], // 文章分类列表数组
      // belong归属处理
      inputVisibleBelong: false,
      inputValueBelong: '',
      select_group_belong: [],
      article_belong_list: [],

      loading: false,
      ariticle_item: {
        article_id: '',
        article_title: '',
        article_input_id: '',
        article_type_id: '',
        article_belong_id: '',
        article_content: '',
        article_html: '',
        article_cover_img_id: ''
      },
      action_banner_url: 'cms/add_video_img',
      imageUrl: ''
    }
  },
  created() {},
  mounted() {
    this.get_date()
    this.article_type_list_get()
    this.article_belong_list_get()

    const set_userinfo = this.$store.state.user.set_userinfo
    this.ariticle_item.article_input_id = set_userinfo.app.id

    this.action_banner_url = window.g.baseURL + this.action_banner_url
  },

  methods: {
    handleAvatarSuccess(res, file) { // 头像上传回调
      this.imageUrl = URL.createObjectURL(file.raw)
      this.ariticle_item.article_cover_img_id = res.id
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
    // 图片添加 - 文本编辑器
    async $imgAdd(pos, $file) {
      console.log(pos, $file)
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file[]', $file)
      let result
      try {
        this.loading = true
        result = await Article.article_add_img(formdata)
      } catch (e) {
        // TODO handle the exception
        this.loading = false
      }
      if (result.state == window.g.SUCCESS_STATE) {
        this.loading = false
        console.log(result)
        this.$refs.md.$img2Url(pos, result.data)
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: result.msg,
          type: 'error'
        })
      }
    },

    // 富文本修改
    md_change(value, render) {
      // console.log(value)
      this.ariticle_item.article_html = render
    },
    // 提交验证
    check_article() {
      if (this.ariticle_item.article_type_id == '') {
        this.$notify({
          title: '提示',
          message: '请选择文章分类标签',
          type: 'error'
        })
        return false
      }
      if (this.ariticle_item.article_belong_id == '') {
        this.$notify({
          title: '提示',
          message: '请选择文章归属标签',
          type: 'error'
        })
        return false
      }
      if (this.ariticle_item.article_title == '') {
        this.$notify({
          title: '提示',
          message: '请填写文章标题',
          type: 'error'
        })
        return false
      }
      return true
    },
    // 保存
    async md_save() {
      console.log(this.ariticle_item)
      if (this.check_article()) {
        let result
        try {
          this.loading = true
          result = await Article.article_add(this.ariticle_item)
        } catch (e) {
          // TODO handle the exception
          this.loading = false
        }
        if (result.state == window.g.SUCCESS_STATE) {
          this.loading = false
          console.log(result)
          this.ariticle_item.article_id = result.data.id
          this.$message.success(result.msg)
        } else {
          this.loading = false
          this.$notify({
            title: '提示',
            message: result.msg,
            type: 'error'
          })
        }
      }
    },

    // 分类标签展示输入框----------------------------------------------------------------------
    // 删除tags标签
    handleClose(tag) { // tag标签点击关闭
      this.$confirm('此操作将永久删除该article-type, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.article_type_delete(tag)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除tags标签 - 请求
    async article_type_delete(tag) { // 文章分类删除请求
      const data = {
        id: tag.id
      }
      let result
      try {
        this.loading = true
        result = await Article.article_type_delete(data)
      } catch (e) {
        // TODO handle the exception
        this.loading = false
      }
      if (result.state == window.g.SUCCESS_STATE) {
        this.loading = false
        this.article_type_list.splice(this.article_type_list.indexOf(tag), 1)
        this.$notify({
          title: '提示',
          message: result.msg,
          type: 'success'
        })
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: result.msg,
          type: 'error'
        })
      }
    },
    // 选择分类标签
    article_type_select(tag) { // 分类标签选择
      this.select_group.splice(0, this.select_group.length)
      this.select_group.push(tag)
      this.ariticle_item.article_type_id = tag.id
    },
    showInput() { // tag-input输入框出现
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    async handleInputConfirm() { // tag-input输入框提交
      const inputValue = this.inputValue
      if (inputValue) {
        const data = {
          typename: inputValue
        }
        let result
        try {
          this.loading = true
          result = await Article.article_type_add(data)
        } catch (e) {
          // TODO handle the exception
          this.loading = false
        }
        if (result.state == window.g.SUCCESS_STATE) {
          this.loading = false
          this.$notify({
            title: '提示',
            message: result.msg,
            type: 'success'
          })
          this.article_type_list.push(result.data)
        } else {
          this.loading = false
          this.$notify({
            title: '提示',
            message: result.msg,
            type: 'error'
          })
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 归属展示输入框-------------------------------------------------------
    showInputBelong() { // belong-input输入框出现
      this.inputVisibleBelong = true
      this.$nextTick(() => {
        this.$refs.saveBelongInput.$refs.input.focus()
      })
    },
    async handleInputConfirm_belong() { // tag-input输入框提交
      const inputValue = this.inputValueBelong
      if (inputValue) {
        const data = {
          typename: inputValue
        }
        let result
        try {
          this.loading = true
          result = await Article.article_belong_add(data)
        } catch (e) {
          // TODO handle the exception
          this.loading = false
        }
        if (result.state == window.g.SUCCESS_STATE) {
          this.loading = false
          this.$notify({
            title: '提示',
            message: result.msg,
            type: 'success'
          })
          this.article_belong_list.push(result.data)
        } else {
          this.loading = false
          this.$notify({
            title: '提示',
            message: result.msg,
            type: 'error'
          })
        }
      }
      this.inputVisibleBelong = false
      this.inputValueBelong = ''
    },
    // 选择归属标签
    article_belong_select(tag) { // 分类标签选择
      console.log(tag)
      this.select_group_belong.splice(0, this.select_group_belong.length)
      this.select_group_belong.push(tag)
      this.ariticle_item.article_belong_id = tag.id
    },
    // 删除belong标签
    handleClose_belong(tag) { // tag标签点击关闭
      this.$confirm('此操作将永久删除该article-belong, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.article_belong_delete(tag)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除belong标签 - 请求
    async article_belong_delete(tag) { // 文章分类删除请求
      const data = {
        id: tag.id
      }
      let result
      try {
        this.loading = true
        result = await Article.article_belong_delete(data)
      } catch (e) {
        // TODO handle the exception
        this.loading = false
      }
      console.log(result)
      if (result.state === window.g.SUCCESS_STATE) {
        this.loading = false
        this.article_belong_list.splice(this.article_belong_list.indexOf(tag), 1)
        this.$notify({
          title: '提示',
          message: result.msg,
          type: 'success'
        })
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: result.msg,
          type: 'error'
        })
      }
    },
    // 获取当天时间戳------------------------------------------------------------------
    get_date() { // 默认标题为当前时间
      const myDate = new Date()
      this.ariticle_item.article_title = myDate.toLocaleString()
    },
    // 清空
    clear() {
      // ariticle_item:{
      // 	article_id:'',
      // 	article_title:'',
      // 	article_input_id:'',
      // 	article_type_id:'',
      // 	article_content:'',
      // 	article_html:'',
      // },
      // select_group:[],

      this.ariticle_item.article_id = ''
      this.ariticle_item.article_title = ''
      this.ariticle_item.article_type_id = ''
      this.ariticle_item.article_content = ''
      this.ariticle_item.article_html = ''
      this.select_group.splice(0, this.select_group.length)
    },
    // 获取type分类
    async article_type_list_get() { // 获取文章分类列表
      let result
      try {
        this.loading = true
        result = await Article.article_type_list_get()
      } catch (e) {
        // TODO handle the exception
        this.loading = false
      }
      if (result.state == window.g.SUCCESS_STATE) {
        this.loading = false
        this.article_type_list = result.data
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: '标签获取失败',
          type: 'error'
        })
      }
    },
    // 获取belong分类
    async article_belong_list_get() { // 获取文章分类列表
      let result
      try {
        this.loading = true
        result = await Article.article_belong_list_get()
      } catch (e) {
        // TODO handle the exception
        this.loading = false
      }
      if (result.state == window.g.SUCCESS_STATE) {
        this.loading = false
        this.article_belong_list = result.data
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: '标签获取失败',
          type: 'error'
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.ArticleAdd{
	padding: 20px;
	// border: 1px solid black;
	.bot-body{
		padding: 20px;
		// max-width: 800px;
		margin: 0 auto;
		.input-body{
			display: flex;
			justify-content: flex-start;
			margin-bottom: 20px;
			span.name{
				display: block;
				width: 80px;
				text-align: right;
				line-height: 40px;
			}
			.tag-body{
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				max-width: 700px;
				::v-deep .el-tag{
					margin-top: 4px;
				}
				.el-tag {
					margin-right: 10px;
					cursor: pointer;
				}
				.button-new-tag {
					margin-top: 4px;
					margin-left: 10px;
					height: 32px;
					line-height: 30px;
					padding-top: 0;
					padding-bottom: 0;
				}
				.input-new-tag {
					margin-top: 4px;
					width: 90px;
					margin-left: 10px;
					vertical-align: bottom;
				}
			}
		}
		.submit-body{
			margin-top: 20px;
		}
	}
}
::v-deep .markdown-body img{
	max-width: 100%;
	box-sizing: content-box;
	background-color: transparent;
	width: auto;
	height: auto;
	vertical-align: middle;
	border: 0;
	margin: 5px auto;
	padding-bottom: 20px;
	border-bottom: 1px solid #d9d9d9;
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
