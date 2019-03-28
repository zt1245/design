<template>
  <div class="payment">
    <h2 class="container">支付订单</h2>
    <div class="info container">
      <i></i>
      <div class="msg">
        <p>请您及时付款，订单号：132465465</p>
        <p>收款方：深圳市紫火科技有限公司</p>
      </div>
      <p class="price">
        订单金额：
        <span>￥1010.00</span>
      </p>
    </div>
    <div class="alipay container">
      <div>
        <img src="http://localhost:8081/static/images/code.png" alt>
        <div class="words">
          <i class="iconfont icon-richscan_icon"></i>
          <div>
            <p>打开手机支付宝</p>
            <p>扫一扫继续支付</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    timeOver () {
      var arr = [true, false]
      var bol = arr[Math.floor(Math.random() * arr.length)]
      if (bol === false) {
        var status = '交易关闭'
        var orderNo = localStorage.getItem('order_no')
        // 生成当前时间（订单开始时间）
        var date = new Date()
        var seperator1 = '-'
        var seperator2 = ':'
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        var paytime = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
        this.axios.post('http://localhost:3001/Status', {
          orderNo,
          status,
          paytime
        }).then((res) => {
          if (res.data.code === 2) {
            this.$router.push({
              path: '/fail'
            })
          } else {
            alert('操作失败，请重试')
          }
        })
      } else {
        var status = '未发货'
        var orderNo = localStorage.getItem('order_no')
        // 生成当前时间（订单开始时间）
        var date = new Date()
        var seperator1 = '-'
        var seperator2 = ':'
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        var paytime = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
        this.axios.post('http://localhost:3001/Status', {
          orderNo,
          status,
          paytime
        }).then((res) => {
          if (res.data.code === 2) {
            this.$router.push({
              path: '/success'
            })
          } else {
            alert('操作失败，请重试')
          }
        })
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.timeOver()
    }, 10000)
  }
}
</script>

<style lang="scss" scoped>
.payment {
  padding-top: 90px;
  h2 {
    font-size: 36px;
    color: #4a4a4a;
    text-align: left;
    font-family: "PingFang-SC-Bold";
    margin-bottom: 26px;
  }
  .info {
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    padding: 54px 123px 40px 84px;
    position: relative;
    display: flex;
    i {
      position: absolute;
      left: 0;
      top: -2px;
      display: block;
      width: 150px;
      height: 4px;
      background: #ff0000;
    }
    .msg {
      p {
        text-align: left;
        color: #4a4a4a;
        font-size: 16px;
      }
      p:nth-child(1) {
        margin-bottom: 25px;
      }
    }
    .price {
      margin-left: 40%;
      font-size: 18px;
      margin-top: 20px;
      span {
        color: #f80000;
        font-weight: bold;
      }
    }
  }
  .alipay {
    background: url(http://localhost:8081/static/images/alipay.png) no-repeat;
    background-position: 90% 25px;
    padding-top: 100px;
    padding-bottom: 150px;
    div {
      margin-left: 20%;
      img {
        width: 250px;
        height: 250px;
      }
      .words {
        display: flex;
        background: #e9e9ea;
        width: 215px;
        justify-content: center;
        margin-left: 17px;
        padding: 5px 0;
        i {
          color: #f80000;
          font-size: 36px;
        }
        div {
          margin-left: 10px;
          p {
            color: #4a4a4a;
            font-size: 16px;
          }
          p:nth-child(1) {
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>
