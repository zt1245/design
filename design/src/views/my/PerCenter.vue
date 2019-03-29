<template>
  <div class="percenter">
    <div class="top">
      <img src="../../../static/images/header.png" alt="">
      <div class="info">
        <p>用户&nbsp;&nbsp;{{ uname }}</p>
        <p>您好~</p>
        <p @click="goPerinfo()">修改个人信息 ></p>
      </div>
    </div>
    <div class="bottom">
      <ul>
        <li>
          <img src="../../../static/images/pPay.png" alt="">
          <div>
            <p>待支付的订单：<span>1</span></p>
            <p @click="goAll()">查看待支付的订单 ></p>
          </div>
        </li>
        <li>
          <img src="../../../static/images/shipped.png" alt="">
          <div>
            <p>待收货的订单：<span>1</span></p>
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
      uname: ''
    }
  },
  mounted () {
    this.uname = localStorage.getItem('uname')
  },
  methods: {
    goPerinfo () {
      this.$router.push({
        path: '/my/perinfo'
      })
    },
    goAll () {
      this.$router.push({
        path: '/my/allorders'
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
        color: #F80000;
        font-size: 14px;
        cursor: pointer;
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
