<template>
  <div class="my">
    <div class="myInfo">
      <div class="user_box container">
        <div class="portrait">
          <img src="../../static/images/user_head.jpeg" alt="">
          <div class="right">
            <p>昵称：木子</p>
            <p>手机号：1585933546</p>
          </div>
        </div>
      </div>
    </div>
    <div class="historyOrder">
      <div class="orderContent container">
        <h3>订单管理</h3>
        <ul>
          <li v-for="(item,index) in orderStatus"
            :key="index"
            :class="{ active: sindex === index }"
            @click="changeSel(index)">
            {{ item }}
          </li>
        </ul>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item
            v-for="(item,index) in orderList"
            :key="index"
            :title="item.order_no" :name="index">
            <div class="order_info">
              <div v-for="(proitem,proindex) in item.proList"
                :key="proindex"
                class="order_item">
                <img :src="proitem.imgSrc" alt="">
                <p>{{ proitem.title }}</p>
                <span>￥{{ proitem.unit_price }}.00</span>
                <span>{{ proitem.quantity }}</span>
              </div>
              <div class="add_info">
                <p>收货信息：</p>
                <p>收货人：{{ item.add_name }}</p>
                <p>手机号码：{{ item.telephone }}</p>
                <p>收货地址：{{ item.address }}</p>
              </div>
              <p class="tPrice">总价：￥{{ tPrice }}</p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderStatus: ['待付款', '完成', '历史订单'],
      sindex: 0,
      activeName: '1',
      orderList: [{
        order_no: '1344644212316',
        status: '0',
        payment_time: '2018.2.10',
        close_time: '2018.2.12',
        add_name: '木子',
        telephone: '12154545',
        address: '深圳市宝安区',
        proList: [{
          title: 'daoigao',
          unit_price: '201',
          quantity: '1',
          totalPrice: '201',
          imgSrc: '../../static/images/cake.jpg'
        },
        {
          title: 'daoigao',
          unit_price: '201',
          quantity: '1',
          totalPrice: '201',
          imgSrc: '../../static/images/cake.jpg'
        }]
      }],
      tPrice: 98
    }
  },
  methods: {
    changeSel (id) {
      this.sindex = id
    }
  }
}
</script>

<style lang="scss" scoped>
.my {
  padding-top: 75px;
  .myInfo {
    background: #f5f5f5;
    padding: 70px 0 20px;
    .user_box {
      background: #ffffff;
    }
    .portrait {
      padding: 50px;
      background: #ffffff;
      display: flex;
      img {
        width: 100px;
        height: 100px;
      }
      .right {
        margin-left: 50px;
        text-align: left;
        p {
          line-height: 30px;
        }
      }
    }
  }
  .historyOrder {
    background: #f5f5f5;
    padding: 50px 0;
    text-align: left;
    .orderContent {
      background: #ffffff;
      padding: 50px;
      h3 {
        font-size: 20px;
      }
      ul {
        display: flex;
        padding: 20px 0;
        li {
          line-height: 14px;
          border-left: 2px solid #999999;
          padding: 0 10px;
          color: #999999;
          margin-right: 30px;
          cursor: pointer;
        }
        .active {
          color: #2b2b2b;
          border-color: #2b2b2b;
        }
      }
    }
    .order_item {
      display: flex;
      img {
        width: 200px;
        height: 100px;
      }
      p {
        font-size: 16px;
        margin: 0 20px;
        line-height: 100px;
      }
      span {
        margin: 0 50px;
        display: block;
        line-height: 100px;
      }
    }
    .add_info {
      display: flex;
      p {
        padding: 20px 50px 20px 0;
      }
    }
  }
}
</style>
