<template>
  <div class="belong">
    <div class="components-container board">
      <div
        v-for="item of list"
        :key="item.id"
        class="video-item"
      >
        <div class="item-center">

          <div class="xf-body">
            <div v-show="item.show===2" class="left" @click="video_change_show(1,item.id)">显示</div>
            <div v-show="item.show===1" class="left" @click="video_change_show(2,item.id)">隐藏</div>

            <div class="right">
              <div class="right-item" @click="change(item)">修改</div>
              <div class="right-item">删除</div>
            </div>
          </div>
          <div
            v-show="item.show===2"
            class="cover-bg"
          />
          <div class="cover">
            <img :src="item.video_img_url" alt="">
          </div>
          <h1 class="title">{{ item.title }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Video from '@/api/video'
export default {
  name: 'VideoList',
  data() {
    return {
      group: 'mission',
      list: []
    }
  },
  mounted() {
    this.video_list_get()
  },
  methods: {
    remove(data) {
      this.change_type_belong(data)
    },
    change(item) {
      const { id } = item
      this.$router.push({ path: '/video/video-edit/' + id })
    },
    async video_list_get() {
      const data = {
        show: ''
      }
      let result
      try {
        this.loading = true
        result = await Video.video_list_get(data)
      } catch (e) {
        // TODO handle the exception
        this.loading = false
      }
      if (result.state == window.g.SUCCESS_STATE) {
        this.loading = false
        this.list = result.data

        console.log(result)
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: result.msg,
          type: 'error'
        })
      }
    },
    async video_change_show(show, id) {
      const data = {
        show: show,
        id: id
      }
      let result
      try {
        this.loading = true
        result = await Video.video_change_show(data)
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
        this.video_list_get()
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: result.msg,
          type: 'error'
        })
      }
    },

    async change_type_belong(data) {
      let result
      try {
        this.loading = true
        result = await Article.change_type_belong(data)
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
        // this.belong_get_type()
      } else {
        this.loading = false
        this.$notify({
          title: '提示',
          message: result.msg,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.belong {
  padding: 20px;

  .board {
    display: flex;
    flex-wrap: wrap;
    .video-item{
      width: 280px;

      padding: 20px;
      .item-center{
        width: 240px;
        border:1px solid #eee;
        box-sizing: border-box;
        padding: 10px;
        position: relative;
        .cover{
          width: 220px;
          height: 123px;
          background-color: grey;
          overflow: hidden;
          img{
            width: 100%;
          }
        }
        .title{
          font-weight: normal;
          font-size: 16px;;
        }
        .cover-bg{
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba(0,0,0,0.1);
          z-index: 2;
        }
        .xf-body{
          width: 100%;
          position: absolute;
          left: 0;
          top: 0;
          .left{
            display: none;
            position: relative;
            float: left;
            z-index: 3;
            width: fit-content;
            border-bottom-right-radius: 10px;
            padding:0 10px;
            background: #ec414d;
            color: #fff;
            font-size: 12px;
            line-height: 30px;
            height: 30px;
            cursor: pointer;
            &:hover{
              border-color: #e31725;
              background: #e31725;
              color: #fff;
            }
          }
          .right{
            float: right;
            border-bottom: 1px solid #ededed;
            display: none;
            .right-item{
              position: relative;
              float: left;
              z-index: 3;
              background: #ededed;
              font-size: 12px;
              line-height: 30px;
              height: 30px;
              padding:0 10px;
              &:nth-of-type(2){
                border-left:1px solid #c5c5c5;
              }
              cursor: pointer;
              &:hover{
                background-color: #d9d9d9;
              }
            }

          }
        }

        &:hover .left,&:hover .right{
          display: block;
        }
      }

    }
  }
}
</style>
<style lang="scss">
.kanban {
    &.todo {
      .board-column-header {
        background: #4A9FF9;
      }
    }
    &.working {
      .board-column-header {
        background: #f9944a;
      }
    }
    &.done {
      .board-column-header {
        background: #2ac06d;
      }
    }
  }
</style>
