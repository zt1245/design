<template>
  <div class="percenter">
    <div class="top">
      <img src="../../../static/images/header.png" alt="">
      <div class="info">
        <p>用户&nbsp;&nbsp;{{ uname }}</p>
        <p>您好~</p>
        <p>手机号：{{ phone }}</p>
        <p @click="changepwd()">修改密码</p>
      </div>
    </div>
    <div class="bottom">
      <ul>
        <li>
          <img src="../../../static/images/pPay.png" alt="">
          <div>
            <p>待支付的订单：<span>{{zLength}}</span></p>
            <p @click="goAll()">查看待支付的订单 ></p>
          </div>
        </li>
        <li>
          <img src="../../../static/images/shipped.png" alt="">
          <div>
            <p>待收货的订单：<span>{{sLength}}</span></p>
            <p @click="goAll()">查看待收货的订单 ></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      uname: '',
      zLength: 0,
      sLength: 0,
      phone: ''
    }
  },
  mounted () {
    this.uname = localStorage.getItem('uname')
    let uname = this.uname
    let status = '待付款'
    this.axios.post('http://localhost:3001/orderStatus', {
      uname,
      status
    }).then(res => {
      if (res.data.code === 2) {
        this.zLength = res.data.data.length
      } else {
        alert('查询失败，请重试')
      }
    })
    status = '未发货'
    this.axios.post('http://localhost:3001/orderStatus', {
      uname,
      status
    }).then(res => {
      if (res.data.code === 2) {
        this.sLength = res.data.data.length
      } else {
        alert('查询失败，请重试')
      }
    })
    this.axios.post('http://localhost:3001/selPhone', {
      uname
    }).then(res => {
      if (res.data.code === 2) {
        this.phone = res.data.data[0].phone
      } else {
        alert('查询失败，请重试')
      }
    })
  },
  methods: {
    goAll () {
      this.$router.push({
        path: '/my/allorders'
      })
    },
    changepwd () {
      this.$router.push({
        path: '/my/changepwd'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.percenter {
  background: #ffffff;
  width: 100%;
  .top {
    padding: 60px;
    display: flex;
    border-bottom: 2px solid #BFBFBF;
    .info {
      font-family: 'PingFang-SC-Medium';
      text-align: left;
      margin-left: 55px;
      p:nth-child(1) {
        color: #4A4A4A;
        font-size: 24px;
        margin-top: 33px;
      }
      p:nth-child(2) {
        color: #A9A9A9;
        font-size: 14px;
        margin: 15px 0;
      }
      p:nth-child(3) {
        color: #4A4A4A;
        font-size: 14px;
      }
      p:nth-child(4) {
        color: #F80000;
        font-size: 14px;
        cursor: pointer;
        margin: 15px 0;
      }
    }
  }
  .bottom {
    padding: 90px 0 15px 60px;
    ul {
      display: flex;
      li {
        display: flex;
        margin-right: 150px;
        div {
          margin-left: 18px;
          p:nth-child(1) {
            color: #4A4A4A;
            font-size: 18px;
            margin-top: 33px;
            text-align: left;
            margin-bottom: 18px;
            span {
              color: #FF0000;
            }
          }
          p:nth-child(2) {
            color: #A4A4A4;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
