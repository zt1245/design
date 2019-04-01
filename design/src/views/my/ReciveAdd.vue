<template>
  <div class="reciveadd">
    <p>收货地址</p>
    <ul>
      <li>
        <i>+</i>
        <p>添加新地址</p>
      </li>
      <li v-for="(item,index) in adList"
        :key="index">
        <p>{{ item.name }}</p>
        <p>{{ item.phone }}</p>
        <p>{{ item.province }} {{ item.city }} {{ item.area }}{{ item.addr }}</p>
        <div><span>修改</span><span>删除</span></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      adList: []
    }
  },
  methods: {
    addSel () {
      var uname = localStorage.getItem('uname')
      this.axios.post('http://localhost:3001/selAdd', {
        uname
      }).then((res) => {
        if (res.data.code === 2) {
          this.adList = res.data.result
        } else {
          alert('查询失败，请稍后再试！')
        }
      })
    }
  },
  mounted () {
    this.addSel()
  }
}
</script>

<style lang="scss" scoped>
.reciveadd {
  background: #ffffff;
  width: 100%;
  padding: 40px 80px 0 80px;
  p {
    color: #262A2F;
    font-size: 30px;
    text-align: left;
    margin-bottom: 64px;
  }
  ul {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    li {
      width: 30%;
      border: 1px solid #DCDCDC;
      margin-right: 16px;
      padding: 33px 13px 11px 21px;
      margin-bottom: 20px;
      p:nth-child(1) {
        color: #3E3E3F;
        font-size: 18px;
        margin-bottom: 35px;
      }
      p:nth-child(2),p:nth-child(3) {
        color: #7B7B7B;
        font-size: 14px;
        margin-bottom: 14px;
      }
      p:nth-child(3) {
        line-height: 20px;
      }
      div {
        padding-top: 15px;
        span {
          color: #F80000;
        }
        span:nth-child(2) {
          margin-left: 50px;
        }
      }
    }
    li:nth-child(1) {
      cursor: pointer;
      i {
        width: 42px;
        height: 42px;
        background: #DCDCDC;
        border-radius: 50%;
        display: block;
        font-size: 36px;
        color: #ffffff;
        line-height: 36px;
        margin: 65px auto 14px;
      }
      p {
        font-size: 14px;
        color: #4A4A4A;
        text-align: center;
      }
    }
  }
}
</style>
