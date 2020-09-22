<template>
  <div v-loading="loading" class="ArticleList">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home/default' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>文章列表</el-breadcrumb-item>
		</el-breadcrumb> -->

    <div class="bot-body">
      <div class="search-bar">
        <el-select v-model="search_belong_value" placeholder="文章归属选择" class="search-bar-item">
          <el-option
            v-for="item in search_belong"
            :key="item.id"
            :label="item.english"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" class="search-bar-item" icon="el-icon-search" @click="search">搜索</el-button>

        <el-button type="primary" class="search-bar-item" icon="el-icon-delete" @click="clear">清零</el-button>
        <el-button type="primary" :loading="downloadLoading" class="search-bar-item" icon="el-icon-download" @click="handleDownload">导出</el-button>
      </div>

      <el-table
        :data="article_list"
        style="width: 100%"
        border
        fit
        highlight-current-row
        min-height="650"
      >
        <el-table-column
          align="center"
          fixed
          prop="id"
          label="id"
          width="50"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="article_title"
          label="标题"
          width="200"
        />
        <el-table-column
          prop="b_type_name"
          label="类别"
          width="120"
        >
          <template slot-scope="scope">
            <el-tag type="primary">{{ scope.row.b_type_name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="b_belong_name"
          label="归属"
          width="120"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.b_belong_name" type="success">{{ scope.row.b_belong_name }}</el-tag>
            <el-tag v-else type="success">暂无归属</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="b_user_name"
          label="作者"
          width="200"
        >
          <template slot-scope="scope">
            <el-tag type="info">{{ scope.row.b_user_name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="has_comments_count"
          label="评论数"
          width="100"
        />
        <el-table-column
          prop="visit_count"
          label="点击数"
          width="100"
        />
        <el-table-column
          prop="update_time"
          label="修改时间"
          min-width="200"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="210"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click.native.prevent="articleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click.native.prevent="show_blog(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click.native.prevent="articleDelete(scope.row)"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-size="size"
        :current-page="page"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import Article from '@/api/article'
export default {
  name: 'ArticleList',
  components: {
  },
  data() {
    return {
      article_list: [],
      loading: false,
      page: 1,
      size: 12,
      total: 5,
      // 搜索
      search_belong: [],
      search_belong_value: '',
      downloadLoading: false
    }
  },
  created() {},
  mounted() {
    this.article_list_get()
    this.article_belong_list_get()
  },

  methods: {
    test(scrp) {
      console.log(scrp)
    },
    articleEdit(row) { // 文章修改
      this.$router.push({ path: '/article/article-edit/' + row.id })
    },
    show_blog(row) { // 去blog查看文章
      window.open(row.id)
    },
    articleDelete(row) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.article_delete(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async article_delete(row) {
      const params = {
        id: row.id
      }
      let result
      try {
        this.loading = true
        result = await Article.article_delete(params)
      } catch (e) {
        // TODO handle the exception
        this.loading = false
      }
      if (result.data.state == window.g.SUCCESS_STATE) {
        this.loading = false
        this.$message.success(result.data.msg)
        this.article_list_get()
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: result.data.msg,
          type: 'error'
        })
      }
    },
    handleCurrentChange(val) {
      this.page = val
      this.article_list_get()
    },
    async article_list_get() {
      const params = {
        size: this.size,
        page: this.page,
        article_belong_id: this.search_belong_value
      }
      let result
      try {
        this.loading = true
        result = await Article.article_list_get(params)
      } catch (e) {
        // TODO handle the exception
        this.loading = false
      }
      if (result.state == window.g.SUCCESS_STATE) {
        this.loading = false
        this.article_list = result.data
        this.total = result.total
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: result.data.msg,
          type: 'error'
        })
      }
    },
    // 导出Excel
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['标题', '类别', '归属', '作者', '评论数', '点击数', '修改时间']
        const filterVal = ['article_title', 'b_type_name', 'b_belong_name', 'b_user_name', 'has_comments_count', 'visit_count', 'update_time']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    // 筛选导出数据
    formatJson(filterVal) {
      return this.article_list.map(v => filterVal.map(j => {
        return v[j]
      }))
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
        this.search_belong = result.data
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: '标签获取失败',
          type: 'error'
        })
      }
    },
    clear() {
      this.search_belong_value = ''
    },
    search() {
      this.article_list_get()
    }

  }

}
</script>

<style lang="scss" scoped>
.ArticleList{
	padding: 20px;
	// border: 1px solid black;
	.bot-body{
		padding: 20px;
		// max-width: 800px;
		margin: 0 auto;
    .search-bar{
      padding: 20px;
      .search-bar-item{
        margin-right: 20px;
      }
    }
	}
}
::v-deep .el-pagination{
	width: fit-content;
	margin: 20px auto 0 auto;
}
</style>
