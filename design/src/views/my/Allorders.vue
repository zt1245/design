<template>
  <div class="allorder">
    <p>我的订单</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部订单" name="first">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
            v-for="(item,index) in orderList"
            :key="index"
            :title="item.begin_time"
            :name="index"
          >
            <p class="orderInfo">
              <span>{{ item.status }}</span>|
              <span>{{ item.user_name }}</span>|
              <span>订单号：{{ item.order_no }}</span>
              <span>
                总金额：
                <i>￥{{ item.total_price }}.00</i>
              </span>
            </p>
            <ul class="pro-ul">
              <li
                v-for="(proitem,proindex) in proList"
                :key="proindex"
                v-show="proitem.id === parseInt(item.product_id.split(',')[0]) || proitem.id === parseInt(item.product_id.split(',')[1]) || proitem.id === parseInt(item.product_id.split(',')[2])"
              >
                <img :src="proitem.pro_img" alt>
                <p>{{ proitem.title }}</p>
              </li>
              <li class="btn-box">
                <span v-show="item.status === '待付款'">立即支付</span>
                <span>删除</span>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="second">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
            v-for="(item,index) in orderList"
            :key="index"
            :title="item.begin_time"
            :name="index"
            v-show="item.status === '待付款'"
          >
            <p class="orderInfo">
              <span>{{ item.status }}</span>|
              <span>{{ item.user_name }}</span>|
              <span>订单号：{{ item.order_no }}</span>
              <span>
                总金额：
                <i>￥{{ item.total_price }}.00</i>
              </span>
            </p>
            <ul class="pro-ul">
              <li
                v-for="(proitem,proindex) in proList"
                :key="proindex"
                v-show="proitem.id === parseInt(item.product_id.split(',')[0]) || proitem.id === parseInt(item.product_id.split(',')[1]) || proitem.id === parseInt(item.product_id.split(',')[2])"
              >
                <img :src="proitem.pro_img" alt>
                <p>{{ proitem.title }}</p>
              </li>
              <li class="btn-box">
                <span v-show="item.status === '待付款'">立即支付</span>
                <span>删除</span>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="待发货" name="third">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
            v-for="(item,index) in orderList"
            :key="index"
            :title="item.begin_time"
            :name="index"
            v-show="item.status === '未发货'"
          >
            <p class="orderInfo">
              <span>{{ item.status }}</span>|
              <span>{{ item.user_name }}</span>|
              <span>订单号：{{ item.order_no }}</span>
              <span>
                总金额：
                <i>￥{{ item.total_price }}.00</i>
              </span>
            </p>
            <ul class="pro-ul">
              <li
                v-for="(proitem,proindex) in proList"
                :key="proindex"
                v-show="proitem.id === parseInt(item.product_id.split(',')[0]) || proitem.id === parseInt(item.product_id.split(',')[1]) || proitem.id === parseInt(item.product_id.split(',')[2])"
              >
                <img :src="proitem.pro_img" alt>
                <p>{{ proitem.title }}</p>
              </li>
              <li class="btn-box">
                <span v-show="item.status === '待付款'">立即支付</span>
                <span>删除</span>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="交易完成" name="four">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item
            v-for="(item,index) in orderList"
            :key="index"
            :title="item.begin_time"
            :name="index"
            v-show="item.status === '交易关闭'"
          >
            <p class="orderInfo">
              <span>{{ item.status }}</span>|
              <span>{{ item.user_name }}</span>|
              <span>订单号：{{ item.order_no }}</span>
              <span>
                总金额：
                <i>￥{{ item.total_price }}.00</i>
              </span>
            </p>
            <ul class="pro-ul">
              <li
                v-for="(proitem,proindex) in proList"
                :key="proindex"
                v-show="proitem.id === parseInt(item.product_id.split(',')[0]) || proitem.id === parseInt(item.product_id.split(',')[1]) || proitem.id === parseInt(item.product_id.split(',')[2])"
              >
                <img :src="proitem.pro_img" alt>
                <p>{{ proitem.title }}</p>
              </li>
              <li class="btn-box">
                <span v-show="item.status === '待付款'">立即支付</span>
                <span>删除</span>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      activeNames: ['1'],
      orderList: [],
      proList: []
    }
  },
  methods: {
    handleClick (tab, event) {},
    handleChange (val) {}
  },
  mounted () {
    let uname = localStorage.getItem('uname')
    this.axios.post('http://localhost:3001/allor', {
      uname
    }).then(res => {
      if (res.data.code === 2) {
        console.log(res.data)
        this.orderList = res.data.data
        this.proList = res.data.List
      } else {
        alert('查询失败，请重试')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.allorder {
  background: #ffffff;
  width: 100%;
  padding: 40px 80px 20px 80px;
  p {
    color: #262a2f;
    font-size: 30px;
    text-align: left;
    margin-bottom: 30px;
  }
  .orderInfo {
    font-size: 16px;
    border-bottom: 1px solid #dedede;
    padding-bottom: 20px;
    span {
      padding: 0 10px;
    }
    span:nth-child(4) {
      margin-left: 100px;
      i {
        color: #f80000;
        font-size: 24px;
      }
    }
  }
  .pro-ul {
    position: relative;
    li {
      display: flex;
      img {
        width: 100px;
        height: 100px;
      }
      p {
        font-size: 16px;
        color: #4a4a4a;
        padding-left: 50px;
        line-height: 100px;
      }
    }
    .btn-box {
      flex-direction: column;
      position: absolute;
      top: 50%;
      right: -40px;
      transform: translate(-50%,0);
      span {
        width: 120px;
        height: 28px;
        border: 1px solid #B5B5B5;
        text-align: center;
        line-height: 28px;
        font-size: 14px;
        color: #4A4A4A;
        display: block;
        margin: 5px 0;
        cursor: pointer;
        transition: all 0.5s;
      }
      span:hover {
        color: #ffffff;
        border: 1px solid #f80000;
        background: #f80000;
        transition: all 0.5s;
      }
    }
  }
}
</style>
