<template>
  <div class="belong">
    <div class="components-container board">
      <!--    <Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="Todo" />
      <Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="Working" />
      <Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="Done" /> -->

      <Kanban
        v-for="(item,index) of this.list"
        :key="item.id"
        :list="item.type_with_belong"
        :group="group"
        :belong-id="item.id"
        :belong-name="item.english"
        :class="{'kanban':true,'todo':index===0,'working':index===1,'done':index===2} "
        :header-text="item.english"
        @remove_item="remove"
      />
    </div>
  </div>
</template>

<script>
import Kanban from '@/components/Kanban'
import Article from '@/api/article'
export default {
  name: 'Belong',
  components: {
    Kanban
  },
  data() {
    return {
      group: 'mission',
      list: []
    }
  },
  mounted() {
    this.belong_get_type()
  },
  methods: {
    remove(data) {
      this.change_type_belong(data)
    },
    async belong_get_type() {
      let result
      try {
        this.loading = true
        result = await Article.belong_get_type()
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
    width: 1000px;
    margin-left: 20px;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: flex-start;
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
