<template>
  <div class="imenu container">
    <div class="row">
      <ul class="sideBar">
        <li v-for="(item,index) in sideBar"
          :key="index"
          :class="{ active: sideActive === index, shover: index !== 0, sideSel: sideNum === index}"
          @click="change(index), information(index)">{{ item }}</li>
      </ul>
      <div class="sideBar-newList">
        <h3>为你推荐</h3>
        <ul>
          <li v-for="(item,index) in newList"
            :key="index"
            :class="{ newBarActive: newBarNum === index }"
            @click="BarChange(index), goNew(item.id)">{{ item.title }}</li>
        </ul>
      </div>
    </div>
    <div class="newMenu">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sideBar: ['新闻资讯'],
      sideActive: 0,
      sideNum: null,
      newBarNum: null,
      newList: []
    }
  },
  methods: {
    change (index) {
      if (index !== 0) {
        this.sideNum = index
      }
    },
    BarChange (index) {
      this.newBarNum = index
    },
    goto (index) {
      this.$router.push({
        path: `/showNews/${index}`
      })
    },
    information (index) {
      if (index === 1) {
        this.$router.push({
          path: '/news'
        })
      }
    },
    goNew (index) {
      this.$router.push({
        path: `/news/showNews/${index}`
      })
    },
    list () {
      let recommend = true
      this.axios.post('http://localhost:3001/reNew', {
        recommend
      }).then(res => {
        if (res.data.code === 2) {
          this.newList = res.data.data
        } else {
          alert('查询失败，请稍后重试')
        }
      })
    }
  },
  mounted () {
    this.list()
  }
}
</script>

<style lang="scss" scoped>
.imenu {
  display: flex;
  .row {
    width: 280px;
    .sideBar {
      width: 280px;
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid #e4eaec;
      margin: 20px 0 11px 0;
      li {
        padding: 15px 20px;
        text-align: left;
        cursor: pointer;
        border-bottom: 1px solid #e4eaec;
      }
      .active {
        background: #cf4248;
        color: #ffffff;
      }
      .shover:hover {
        color: #cf4248;
      }
      .sideSel {
        color: #cf4248;
      }
    }
    .sideBar-newList {
      width: 280px;
      text-align: left;
      border: 1px solid #e4eaec;
      border-radius: 5px;
      overflow: hidden;
      h3 {
        padding: 15px 0;
        padding-left: 20px;
        background: #cf4248;
        color: #ffffff;
      }
      ul {
        box-sizing: border-box;
        li {
          margin: 10px;
          font-size: 14px;
          border-bottom: 1px solid #e4eaec;
          padding: 10px 0;
          cursor: pointer;
        }
        li:hover {
          color: #cf4248;
        }
        .newBarActive {
          color: #cf4248;
        }
      }
    }
  }
  .newMenu {
    margin-bottom: 50px;
  }
}
</style>
