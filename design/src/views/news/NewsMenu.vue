<template>
  <div class="newsmenu">
    <ul>
      <li v-for="(item,index) in newList"
        :key="index"
        @click="goto(item.id)">
        <img :src="item.imgSrc">
        <div class="listInfo">
          <h5>{{ item.title }}</h5>
          <p>{{ item.content.split('|')[0] }}</p>
          <span class="date">{{ item.time }}</span>
          <i></i>
        </div>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="parseInt(count)"
      :page-size="5"
      style="margin: 20px 400px;"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      sideBar: ['新闻资讯', '行业资讯', '公司资讯'],
      sideActive: 0,
      sideNum: null,
      newBarNum: null,
      currentPage: 1,
      pagesize: 5,
      count: '',
      newList: []
    }
  },
  methods: {
    change (index) {
      if (index !== 0) {
        this.sideNum = index
      }
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.list()
    },
    BarChange (index) {
      this.newBarNum = index
    },
    goto (index) {
      this.$router.push({
        name: 'ShowNews',
        params: {
          id: index
        }
      })
    },
    list () {
      const pagesize = this.pagesize
      const currentPage = this.currentPage
      this.axios.post('http://localhost:3001/Newpaging', {
        currentPage,
        pagesize
      }).then(res => {
        if (res.data.code === 2) {
          console.log(res)
          this.newList = res.data.data
          this.count = res.data.count
          this.loading = false
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
.newsmenu {
  ul {
    padding-left: 50px;
    li {
      display: flex;
      text-align: left;
      margin: 30px 0;
      cursor: pointer;
      img {
        margin-right: 30px;
        width: 160px;
        transition: all 1.2s;
        height: 150px;
      }
      .listInfo {
        h5 {
          margin-bottom: 10px;
        }
        p {
          font-size: 14px;
          color: #666666;
          line-height: 18px;
          margin-bottom: 10px;
          width: 700px;
        }
        span {
          color: #666666;
        }
        i {
          display: block;
          width: 150px;
          height: 1px;
          background: #e4eaec;
          margin-top: 10px;
          transition: .8s;
        }
      }
    }
    li:hover h5 {
      color: #cf4248;
      transition: .1s;
    }
    li:hover i {
      width: 680px;
      background: #cf4248;
      transition: .8s;
    }
    li:hover img {
      transform: scale(1.2);
      transition: all 1.2s;
    }
  }
}
</style>
