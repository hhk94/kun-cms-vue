<template>
  <div v-loading="loading" class="article-type">
    <div class="bot-body">
      <div class="bot-item">
        <h1 class="title">添加banner类别</h1>
        <div class="input-body">
          <span>id:</span>
          <el-input
            v-model="type_item.id"
            placeholder=""
            disabled
          />

        </div>
        <div class="input-body">
          <span>分类名:</span>
          <el-input
            v-model="type_item.typename"
            placeholder="请输入类名"
          />

        </div>
        <div class="submit-body">
          <el-button type="primary" class="submit" @click="clear">清空</el-button>
          <el-button type="primary" class="submit" @click="add_banner_type">新增/修改</el-button>
        </div>

      </div>
      <div class="bot-item">
        <el-table
          :data="banner_type_list"
          border
          max-height="710px"
          style="width: 100%"
        >
          <el-table-column
            fixed
            prop="id"
            label="id"
            width="50"
          />
          <el-table-column
            prop="typename"
            label="typename"
            width=""
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button type="primary" plain size="mini" @click="type_edit(scope.row)">编辑</el-button>
              <el-button type="danger" plain size="mini" @click="type_delete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/api/banner'
export default {
  name: 'BannerType',
  data() {
    return {
      loading: false,
      banner_type_list: [],
      type_item: {
        id: '',
        typename: ''
      }

    }
  },
  watch: {

  },
  created() {},
  mounted() {
    this.banner_type_list_get()
  },

  methods: {
    async banner_type_list_get() {
      let result
      try {
        this.loading = true
        result = await Banner.banner_type_list_get()
      } catch (e) {
        this.loading = false
        console.log(e)
      }
      if (result.state == window.g.SUCCESS_STATE) {
        this.loading = false
        console.log(result)
        this.banner_type_list = result.data
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: result.msg,
          type: 'error'
        })
      }
    },
    type_edit(row) {
      this.type_item.id = row.id
      this.type_item.typename = row.typename
      this.$notify({
        title: '成功提示',
        message: '请去左侧提交修改',
        type: 'success'
      })
    },
    type_delete(row) {
      this.$confirm('此操作将永久删除该Banner-type, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            id: row.id
          }
          this.banner_type_delete(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async banner_type_delete(data) {
      let result
      try {
        this.loading = true
        result = await Banner.banner_type_delete(data)
      } catch (e) {
        this.loading = false
        console.log(e)
      }
      if (result.state == window.g.SUCCESS_STATE) {
        this.loading = false
        this.$message.success(result.msg)
        this.banner_type_list_get()
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: result.msg,
          type: 'error'
        })
      }
    },
    async add_banner_type() {
      if (this.type_item.typename.length == 0) {
        this.$notify({
          title: '警告',
          message: '类别名不能为空',
          type: 'error'
        })
        return
      }
      let result
      try {
        this.loading = true
        result = await Banner.banenr_type_add(this.type_item)
      } catch (e) {
        this.loading = false
        console.log(e)
      }
      if (result.state == window.g.SUCCESS_STATE) {
        this.loading = false
        this.$message.success(result.msg)
        this.banner_type_list_get()
        this.clear()
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: result.msg,
          type: 'error'
        })
      }
    },
    clear() {
      this.type_item.id = ''
      this.type_item.typename = ''
    }
  }

}
</script>

<style lang="scss" scoped>
.article-type{
	padding: 20px;
	// border: 1px solid black;
}
.bot-body{
	display: flex;
	justify-content: space-between;
	.bot-item{
		// background: red;
		width: 50%;
		// height: 500px;
		padding: 20px;
		box-sizing: border-box;
		.title{
			font-size: 16px;
			color: #3963bc;
		}

		.input-body{
			margin: 0 auto;
			margin-top: 20px;
			display: flex;
			width: 300px;

			&:first-of-type{
				margin-top: 100px;
			}
			span{
				width: 20%;
				text-align: right;
				line-height: 40px;
				padding-right: 10px;
			}
			::v-deep .el-input{
				width: 300px;
			}
		}
		.submit-body{
			width: 300px;
			margin: 20px auto;
			display: flex;
			justify-content: space-around;
		}
		.submit{

			width: 50%;

		}
	}
}
</style>
