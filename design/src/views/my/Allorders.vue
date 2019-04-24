<template>
  <div class="allorder">
    <p>我的订单</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部订单" name="first">
        <ul class="o_ul">
          <li v-for="(item,index) in orderList"
            :key="index"
            class="o_li">
            <p>订单号：{{ item.order_no }}<span>交易开始时间：{{ item.begin_time }}</span><span>订单状态：{{ item.status }}</span></p>
            <ul class="p_ul">
              <li v-for="(pitem,pindex) in item.proImg.split(',')"
                :key="pindex">
                <div class="box">
                  <img :src="pitem" alt="">
                  <div class="info">
                    <p>{{ item.proTitle.split(',')[pindex] }}</p>
                    <p>商品规格：{{ item.spec.split(',')[pindex] }}</p>
                  </div>
                  <p class="num">x{{ item.quantity.split(',')[pindex] }}</p>
                  <p class="price">￥{{ item.unit_price.split(',')[pindex] }}.00</p>
                </div>
              </li>
            </ul>
            <p class="btn"><span @click="del(order_no)">删除</span><span v-show="item.status === '待付款'" @click="goCheck(item.order_no)">去支付</span></p>
          </li>
        </ul>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="parseInt(count)"
          :page-size="2"
          @current-change="handleCurrentChange"
        />
      </el-tab-pane>
      <el-tab-pane label="待支付" name="second">
        <ul class="o_ul">
          <li v-for="(item,index) in daList"
            :key="index"
            class="o_li">
            <p>订单号：{{ item.order_no }}<span>交易开始时间：{{ item.begin_time }}</span><span>订单状态：{{ item.status }}</span></p>
            <ul class="p_ul">
              <li v-for="(pitem,pindex) in item.proImg.split(',')"
                :key="pindex">
                <div class="box">
                  <img :src="pitem" alt="">
                  <div class="info">
                    <p>{{ item.proTitle.split(',')[pindex] }}</p>
                    <p>商品规格：{{ item.spec.split(',')[pindex] }}</p>
                  </div>
                  <p class="num">x{{ item.quantity.split(',')[pindex] }}</p>
                  <p class="price">￥{{ item.unit_price.split(',')[pindex] }}.00</p>
                </div>
              </li>
            </ul>
            <p class="btn"><span @click="del(order_no)">删除</span><span v-show="item.status === '待付款'" @click="goCheck(item.order_no)">去支付</span></p>
          </li>
        </ul>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="parseInt(dcount)"
          :page-size="2"
          @current-change="dchange"
        />
      </el-tab-pane>
      <el-tab-pane label="待发货" name="third">
        <ul class="o_ul">
          <li v-for="(item,index) in wList"
            :key="index"
            class="o_li">
            <p>订单号：{{ item.order_no }}<span>交易开始时间：{{ item.begin_time }}</span><span>订单状态：{{ item.status }}</span></p>
            <ul class="p_ul">
              <li v-for="(pitem,pindex) in item.proImg.split(',')"
                :key="pindex">
                <div class="box">
                  <img :src="pitem" alt="">
                  <div class="info">
                    <p>{{ item.proTitle.split(',')[pindex] }}</p>
                    <p>商品规格：{{ item.spec.split(',')[pindex] }}</p>
                  </div>
                  <p class="num">x{{ item.quantity.split(',')[pindex] }}</p>
                  <p class="price">￥{{ item.unit_price.split(',')[pindex] }}.00</p>
                </div>
              </li>
            </ul>
            <p class="btn"><span @click="del(order_no)">删除</span><span v-show="item.status === '待付款'" @click="goCheck(item.order_no)">去支付</span></p>
          </li>
        </ul>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="parseInt(wcount)"
          :page-size="2"
          @current-change="wchange"
        />
      </el-tab-pane>
      <el-tab-pane label="交易完成" name="four">
        <ul class="o_ul">
          <li v-for="(item,index) in jList"
            :key="index"
            class="o_li">
            <p>订单号：{{ item.order_no }}<span>交易开始时间：{{ item.begin_time }}</span><span>订单状态：{{ item.status }}</span></p>
            <ul class="p_ul">
              <li v-for="(pitem,pindex) in item.proImg.split(',')"
                :key="pindex">
                <div class="box">
                  <img :src="pitem" alt="">
                  <div class="info">
                    <p>{{ item.proTitle.split(',')[pindex] }}</p>
                    <p>商品规格：{{ item.spec.split(',')[pindex] }}</p>
                  </div>
                  <p class="num">x{{ item.quantity.split(',')[pindex] }}</p>
                  <p class="price">￥{{ item.unit_price.split(',')[pindex] }}.00</p>
                </div>
              </li>
            </ul>
            <p class="btn"><span @click="del(order_no)">删除</span><span v-show="item.status === '待付款'" @click="goCheck(item.order_no)">去支付</span></p>
          </li>
        </ul>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="parseInt(jcount)"
          :page-size="2"
          @current-change="handleCurrentChange"
        />
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
      currentPage: 1,
      pagesize: 2,
      count: '',
      daList: [],
      dcount: '',
      wcount: '',
      wList: [],
      jcount: '',
      jList: []
    }
  },
  methods: {
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.list()
    },
    dchange (currentPage) {
      this.currentPage = currentPage
      this.dlist()
    },
    wchange (currentPage) {
      this.currentPage = currentPage
      this.wlist()
    },
    jchange (currentPage) {
      this.currentPage = currentPage
      this.jlist()
    },
    handleClick (tab, event) {},
    handleChange (val) {},
    goCheck (oindex) {
      localStorage.setItem('order_no', oindex)
      this.$router.push({
        name: 'CarCheckout'
      })
    },
    del (orderNo) {
      this.axios.post('http://localhost:3001/delOrder', {
        orderNo
      }).then(res => {
        if (res.data.code === 2) {
          alert('删除成功')
          this.list()
        } else {
          alert('删除失败，请重试')
        }
      })
    },
    list () {
      let uname = localStorage.getItem('uname')
      const pagesize = this.pagesize
      const currentPage = this.currentPage
      this.axios.post('http://localhost:3001/allor', {
        uname,
        pagesize,
        currentPage
      }).then(res => {
        if (res.data.code === 2) {
          this.orderList = res.data.data
          this.count = res.data.count
        } else {
          alert('查询失败，请重试')
        }
      })
    },
    dlist () {
      let uname = localStorage.getItem('uname')
      const pagesize = this.pagesize
      const currentPage = this.currentPage
      let status = '待付款'
      this.axios.post('http://localhost:3001/statusorder', {
        uname,
        pagesize,
        currentPage,
        status
      }).then(res => {
        if (res.data.code === 2) {
          console.log(res)
          this.daList = res.data.data
          this.dcount = res.data.count
        } else {
          alert('查询失败，请重试')
        }
      })
    },
    wlist () {
      let uname = localStorage.getItem('uname')
      const pagesize = this.pagesize
      const currentPage = this.currentPage
      let status = '未发货'
      this.axios.post('http://localhost:3001/statusorder', {
        uname,
        pagesize,
        currentPage,
        status
      }).then(res => {
        if (res.data.code === 2) {
          this.wList = res.data.data
          this.wcount = res.data.count
        } else {
          alert('查询失败，请重试')
        }
      })
    },
    jlist () {
      let uname = localStorage.getItem('uname')
      const pagesize = this.pagesize
      const currentPage = this.currentPage
      let status = '交易关闭'
      this.axios.post('http://localhost:3001/statusorder', {
        uname,
        pagesize,
        currentPage,
        status
      }).then(res => {
        if (res.data.code === 2) {
          this.jList = res.data.data
          this.jcount = res.data.count
        } else {
          alert('查询失败，请重试')
        }
      })
    }
  },
  mounted () {
    this.list()
    this.dlist()
    this.wlist()
    this.jlist()
  }
}
</script>

<style lang="scss" scoped>
.allorder {
  background: #ffffff;
  width: 100%;
  padding: 40px 80px 20px 80px;
  box-sizing: border-box;
  .p_ul {
    li {
      margin: 10px 0;
      .box {
        display: flex;
      }
      img {
        width: 100px;
        height: 100px;
        margin-right: 20px;
      }
      p {
        font-size: 12px;
        margin-bottom: 0;
        padding-top: 20px;
      }
      .num {
        font-size: 18px;
        color: red;
        padding-top: 30px;
      }
      .info {
        width: 300px;
      }
      .price {
        margin-left: 130px;
        margin-top: 15px;
      }
    }
  }
  p {
    text-align: left;
    font-size: 14px;
    margin-bottom: 20px;
    span {
      display: inline-block;
      margin: 0 35px;
    }
  }
  .o_li {
    border: 1px solid #eeeeee;
    padding: 20px;
    margin: 20px 5px;
  }
  .btn {
    text-align: right;
    span {
      width: 50px;
      height: 25px;
      background: #cf4248;
      color: #ffffff;
      line-height: 25px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
