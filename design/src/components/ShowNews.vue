<template>
  <div class="shownews">
    <div v-for="(iitem,iindex) in this.new"
      :key="iindex">
      <h4>{{ iitem.title }}</h4>
      <span>{{ iitem.time }}</span>
      <p v-for="(item,index) in iitem.content.split('|')"
        :key="index">{{ item }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      prev: '',
      next: '',
      num: null,
      prevnum: null,
      nextnum: null,
      new: []
    }
  },
  mounted () {
    this.newlist()
  },
  methods: {
    newlist () {
      let id = this.$route.params.id
      this.axios.post('http://localhost:3001/onenew', {
        id
      }).then(res => {
        if (res.data.code === 2) {
          console.log(res)
          this.new = res.data.data
        } else {
          alert('查询失败，请稍后重试')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.shownews {
  text-align: left;
  padding-left: 50px;
  h4 {
    margin: 20px 0 20px 0;
    font-size: 30px;
    color: #cf4248;
    padding-top: 30px;
  }
  span {
    color: #a3afb7;
    font-size: 16px;
    padding-right: 10px;
    display: inline-block;
    padding-bottom: 40px;
  }
  p {
    line-height: 30px;
    text-indent: 30px;
    margin-bottom: 10px;
    font-size: 18px;
    color: #222222;
  }
  .navgation {
    margin: 20px 0 10px 0;
    border-top: 1px solid #e4eaec;
    border-bottom: 1px solid #e4eaec;
    padding: 30px 10px;
    display: flex;
    justify-content: space-between;
    i {
      display: block;
      color: #999999;
      padding: 10px;
      border: 1px solid #e4eaec;
      transition: .5s;
      cursor: pointer;
      max-width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    i:hover {
      background: #cf4248;
      border: 1px solid #cf4248;
      color: #ffffff;
      transition: .5s;
    }
  }
}
</style>
