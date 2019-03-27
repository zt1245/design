<template>
  <div class="carCheckout">
    <div class="delivery-info container">
      <h3 class="delivery-info-title">配送信息</h3>
      <div class="address-info-content">
        <!-- 用户没有地址信息显示的模块 -->
        <div class="cart-address-button"
          @click="changeadd()"
          v-show="addr === false">
          +&nbsp;&nbsp;添加新的地址
        </div>
        <!-- 用户添加了地址信息 -->
        <div class="cart-have-address"
          v-show="addr">
          <div class="left-info">
            <p>{{ addName }}</p>
            <p><i class="iconfont icon-shouji"></i>{{ addTel }}</p>
            <p><i class="iconfont icon-dingwei"></i>{{ province }}{{ city }}{{ area }}{{ address }}</p>
          </div>
          <div class="right-button">
            <span @click="select()">切换地址（{{ addList.length }}）</span>
            <span @click="add()">+添加新的地址</span>
          </div>
        </div>
        <!-- 切换地址的弹框 -->
        <div class="select-address"
          v-show="selectAdd">
          <div class="top-title">
            <span>请选择收货地址</span>
            <i class="iconfont icon-cuo"
              @click="cuo()"></i>
          </div>
          <ul>
            <li v-for="(item,index) in addList"
              :key="index"
              :class="{sel: selIndex === index}"
              @click="changeSelIndex(index)">
              <p>{{ item.name }}</p>
              <p><i class="iconfont icon-shouji"></i>{{ item.phone }}</p>
              <p><i class="iconfont icon-dingwei"></i>{{ item.province }}{{ item.city }}{{ item.area }}{{ item.addr }}</p>
            </li>
          </ul>
          <span class="use"
            @click="use()">使用</span>
        </div>
        <!-- 添加地址的弹框 -->
        <div class="add-address"
          v-show="addAddress">
          <p>添加地址</p>
          <div class="area">
            <span class="inarea">所在地区：</span>
            <area-select type='all' :placeholders="placeholders" :level='2' v-model="send_search_form.selected" :data="pcaa"></area-select>
          </div>
          <div class="detail-address">
            <span>详细地址：</span>
            <input type="text" placeholder="请填写街道，门牌号等" ref="addr">
          </div>
          <div class="conginee">
            <span>收货人：</span>
            <input type="text" placeholder="收货人姓名" ref="name">
          </div>
          <div class="telephone">
            <span>手机号码：</span>
            <input type="text" placeholder="收货人手机" ref="tel">
          </div>
          <div class="icon">
            <i @click="cancel()">取消</i>
            <i class="sure"
              @click="sure()">确定</i>
          </div>
        </div>
        <div class="delivery-time">
          <span>配送时间</span>
          <el-date-picker
            v-model="value1"
            type="date"
            :picker-options="pickerOptions"
            placeholder="选择日期">
          </el-date-picker>
          <el-time-select
            v-model="value2"
            :picker-options="{
              start: '10:00',
              step: '00:30',
              end: '19:00'
            }"
            placeholder="选择时间">
          </el-time-select>
          <span class="notice">配送时间受实时路况影响，会有前后15分钟的误差，请谅解。</span>
        </div>
      </div>
      <ul class="shop_ul">
				<li>商品</li>
				<li>单价</li>
				<li>数量</li>
				<li>金额</li>
			</ul>
      <div class="tbody_ul">
        <table class="car-detail">
          <tbody>
            <tr v-for="(item,index) in goodsList"
              :key="index">
              <td class="goods-img">
                <img :src="item.pro_img">
              </td>
              <td class="goods-cake">
                <div>
                  <h4>{{ item.title }}</h4>
                  <span class="goods-spec">规格：{{ item.spec }}.0</span>
                </div>
              </td>
              <td class="car-unit-price">￥{{ item.unit_price }}.00</td>
              <td class="number-li">{{ item.quantity }}</td>
              <td class="money">￥{{ parseInt(item.unit_price)*parseInt(item.quantity) }}.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 订单留言 -->
      <div class="leave-message">
        <label>订单留言</label>
        <textarea name="memo" id="action-add-memo" maxlength="200" placeholder="请留下您对订单或商品的特殊要求，200字以内"></textarea>
      </div>
      <!-- 支付信息 -->
      <div class="payment-info">
        <div class="total-amount">
          您总共需要支付
          <span>￥{{ totalPrice() }}.00</span>
        </div>
        <div class="user-info-confirm">
          <span class="user-message">收货人信息：</span>
          <div class="user-info">
            {{ addName }}
            <span>{{ addTel }}</span>
          </div>
          <span>{{ province }}{{ city }}{{ area }}{{ address }}</span>
        </div>
        <input type="button" class="go-pay" name="go-pay" value="去支付" @click="toPay()">
      </div>
    </div>
  </div>
</template>

<script>
import { AreaSelect } from 'vue-area-linkage'
import AreaData, { pca, pcaa } from 'area-data'
export default {
  data () {
    return {
      value1: '',
      value2: '',
      addr: false,
      addAddress: false,
      selectAdd: false,
      selIndex: 0,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      // 商品列表
      goodsList: [],
      // 收货人
      addName: '',
      // 省
      province: '',
      // 市
      city: '',
      // 区
      area: '',
      // 收货地址
      address: '',
      // 手机号
      addTel: '',
      // 收货地址list
      addList: [],
      pca: pca,
      pcaa: pcaa,
      placeholders: ['', '', ''],
      send_search_form: {
        orderCode: '',
        itemName: '',
        orderTime: [],
        consigneeName: '',
        state: '',
        selected: []
      },
      talPrice: ''
    }
  },
  component: {
    AreaSelect: AreaSelect
  },
  methods: {
    changeadd () {
      this.addAddress = true
    },
    cancel () {
      this.addAddress = false
    },
    sure () {
      this.addAddress = false
      this.addr = true
      // 获取省份的信息
      for (const key in this.send_search_form.selected[0]) {
        if (this.send_search_form.selected[0].hasOwnProperty(key)) {
          const element = this.send_search_form.selected[0][key]
          console.log(key, element)
          this.province = element
        }
      }
      this.addr = true
      // 获取市的信息
      for (const key in this.send_search_form.selected[1]) {
        if (this.send_search_form.selected[1].hasOwnProperty(key)) {
          const element = this.send_search_form.selected[1][key]
          console.log(key, element)
          this.city = element
        }
      }
      this.addr = true
      // 获取区的信息
      for (const key in this.send_search_form.selected[2]) {
        if (this.send_search_form.selected[2].hasOwnProperty(key)) {
          const element = this.send_search_form.selected[2][key]
          console.log(key, element)
          this.area = element
        }
      }
      let province = this.province
      let city = this.city
      let area = this.area
      let addr = this.$refs.addr.value
      let name = this.$refs.name.value
      let tel = this.$refs.tel.value
      let username = localStorage.getItem('uname')
      this.axios.post('http://localhost:3001/addAddr', {
        province,
        city,
        area,
        addr,
        name,
        tel,
        username
      }).then((res) => {
        if (res.data.code === 2) {
          this.addName = name
          this.addTel = tel
          this.addarea = area
          this.address = addr
          alert('添加成功')
        } else {
          alert('添加失败，请重试!')
        }
      })
    },
    add () {
      this.addAddress = true
    },
    select () {
      this.selectAdd = true
    },
    cuo () {
      this.selectAdd = false
    },
    use () {
      this.selectAdd = false
      this.addName = this.addList[this.selIndex].name
      this.addTel = this.addList[this.selIndex].phone
      this.province = this.addList[this.selIndex].province
      this.city = this.addList[this.selIndex].city
      this.address = this.addList[this.selIndex].address
      this.area = this.addList[this.selIndex].area
    },
    totalPrice () {
      var totalPrice = 0
      for (var i = 0; i < this.goodsList.length; i++) {
        totalPrice += this.goodsList[i].unit_price * this.goodsList[i].quantity
      }
      this.talPrice = totalPrice
      return totalPrice
    },
    addSel () {
      var uname = localStorage.getItem('uname')
      this.axios.post('http://localhost:3001/selAdd', {
        uname
      }).then((res) => {
        if (res.data.code === 2) {
          if (res.data.result.length === 0) {
            this.addr = false
          } else {
            this.addr = true
            this.addList = res.data.result
            this.addName = res.data.result[0].name
            this.addTel = res.data.result[0].phone
            this.province = res.data.result[0].province
            this.city = res.data.result[0].city
            this.area = res.data.result[0].area
            this.address = res.data.result[0].addr
          }
        } else {
          alert(res.data.msg)
        }
      })
    },
    changeSelIndex (index) {
      this.selIndex = index
    },
    toPay () {
      this.$router.push({
        path: '/payment'
      })
    }
  },
  mounted () {
    var proList = localStorage.getItem('idList')
    this.axios.post('http://localhost:3001/checkOrder', {
      proList
    }).then((res) => {
      if (res.data.code === 2) {
        this.goodsList = res.data.result
      } else {
        alert(res.data.msg)
      }
    })
    this.addSel()
  }
}
</script>

<style lang="scss" scoped>
.carCheckout {
  padding-top: 120px;
  .delivery-info {
    .delivery-info-title {
      height: 44px;
      background: #FAFAFA;
      border: 1px solid #E1E1E1;
      line-height: 44px;
      padding-left: 34px;
      font-size: 13px;
      text-align: left;
    }
    .address-info-content {
      padding: 30px 55px 40px 34px;
      border: 1px solid #E1E1E1;
      margin-top: 8px;
      .cart-address-button {
        background: #FDFDFD;
        border: 1px dashed #E4E4E4;
        height: 75px;
        line-height: 75px;
        width: 100%;
        margin-top: 10px;
        color: #684029;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
      }
      .select-address {
        padding: 0 24px 20px;
        background: #fafafa;
        border: 4px solid rgba(0, 0, 0, 0.16);
        box-shadow: 0 -1px 17px 0 rgba(0,0,0,0.38);
        position: fixed;
        left: 50%;
        margin-left: -348px;
        z-index: 1000;
        top: 16%;
        .top-title {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;
          i:hover {
            color: #cf4248;
            cursor: pointer;
          }
        }
        ul {
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          width: 500px;
          justify-content: space-between;
          li {
            background: #ffffff;
            padding: 20px;
            text-align: left;
            width: 48%;
            border: 1px solid #E1E1E1;
            margin-bottom: 20px;
            box-sizing: border-box;
            cursor: pointer;
            p {
              color: #684029;
              line-height: 30px;
              i {
                color: #D5BFA7;
              }
            }
            p:nth-child(1) {
              font-weight: 700;
            }
          }
          .sel {
            border: 1px solid #f90000;
          }
          li:nth-child(2n+1) {
            margin-right: 20px;
          }
          li:hover {
            border: 1px solid #684029;
          }
        }
        .use {
          display: inline-block;
          margin: 35px 0;
          padding: 10px 40px;
          background: #cf4248;
          color: #ffffff;
          cursor: pointer;
        }
        .use:hover {
          background: #e0282f;
        }
      }
      .cart-have-address {
        display: flex;
        justify-content: space-between;
        text-align: left;
        .left-info {
          p {
            color: #D5BFA7;
            font-size: 14px;
            line-height: 20px;
          }
          p:nth-child(1) {
            color: #684029;
            font-size: 16px;
            padding: 10px 0;
            font-weight: 700;
          }
        }
        .right-button {
          display: flex;
          flex-direction: column;
          padding-top: 20px;
          span {
            display: inline-block;
            padding: 10px 20px;
            margin-bottom: 10px;
            color: #684029;
            cursor: pointer;
            text-align: center;
          }
          span:nth-child(1) {
            border: 1px solid #EFEAE5;
          }
          span:nth-child(1):hover {
            border-color: #D5BFA7;
            color: #D5BFA7;
          }
        }
      }
      .cart-address-button:hover {
        color: #cf4248;
      }
      .add-address {
        padding: 28px 42px;
        text-align: left;
        font-size: 14px;
        position: fixed;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        z-index: 1000;
        left: 50%;
        top: 50%;
        margin-left: -296px;
        margin-top: -152px;
        div {
          margin: 20px 0;
        }
        p {
          color: #cacaca;
          margin-bottom: 20px;
        }
        input::-webkit-input-placeholder {
          color: #dcdfe6;
        }
        input {
          padding-left: 10px;
          border: none;
          outline: none;
          border: 1px solid #dcdfe6;
          height: 40px;
          border-radius: 5px;
        }
        .detail-address {
          input {
            width: 420px;
          }
        }
        .conginee {
          input {
            width: 200px;
            margin-left: 14px;
          }
        }
        .telephone {
          input {
            width: 200px;
          }
        }
        .icon {
          padding-top: 30px;
          text-align: right;
          i {
            width: 140px;
            height: 42px;
            display: inline-block;
            border: 1px solid #e1e1e1;
            color: #686868;
            text-align: center;
            line-height: 42px;
            cursor: pointer;
          }
          .sure {
            background: #cf4248;
            border-color: #cf4248;
            color: #ffffff;
            margin-left: 20px;
          }
        }
      }
      .delivery-time {
        margin-top: 25px;
        text-align: left;
        span {
          margin-right: 24px;
          color: #B3B3B3;
        }
        .notice {
          color: #D5BFA7;
          padding-left: 24px;
        }
      }
    }
    .shop_ul {
      display: flex;
      justify-content: space-around;
      background: #FAFAFA;
      font-size: 14px;
      line-height: 44px;
      border: 1px solid #E1E1E1;
      margin-top: 32px;
    }
    .tbody_ul {
      background: #fff;
      border: 1px solid #E1E1E1;
      margin-top: 20px;
      .car-detail {
        margin-left: 60px;
        td {
          padding: 24px 0;
          border-bottom: 2px dashed #F1F1F1;
          img {
            width: 94px;
            border: 1px solid #EFEFEF;
          }
        }
        .goods-cake {
          width: 264px;
          padding-left: 12px;
          div {
            padding-right: 20px;
            text-align: left;
            h4 {
              font-size: 14px;
              cursor: pointer;
              line-height: 18px;
              color: #684029;
            }
            .goods-spec {
              font-size: 13px;
              color: #D5BFA7;
              display: block;
              padding-top: 10px;
            }
          }
        }
        .car-unit-price {
          color: #684029;
          padding-right: 272px;
        }
        .number-li {
          padding-right: 265px;
          color: #684029;
        }
        .money {
          color: #FF714D
        }
      }
    }
    .leave-message {
      font-size: 14px;
      height: 80px;
      border: 1px solid #E1E1E1;
      border-top: none;
      padding: 15px 60px;
      text-align: left;
      display: flex;
      justify-content: space-between;
      label {
        color: #684029;
      }
      textarea {
        border: none;
        height: 50px;
        width: 950px;
        outline: none;
        resize: none;
      }
    }
    .payment-info {
      margin-top: 32px;
      border: 1px solid #E1E1E1;
      padding: 14px 55px 32px 34px;
      background: #FAFAFA;
      margin-bottom: 64px;
      text-align: left;
      overflow: hidden;
      .total-amount {
        margin-top: 20px;
        color: #684029;
        font-size: 14px;
        span {
          font-size: 25px;
          color: #ff714d;
          margin-left: 4px;
        }
      }
      input {
        background: #cf4248;
        line-height: 44px;
        height: 44px;
        width: 210px;
        text-align: center;
        color: #fff;
        margin-top: 16px;
        font-size: 16px;
        margin-bottom: 28px;
        outline: none;
        border: none;
        float: right;
        cursor: pointer;
      }
    }
    .user-info-confirm {
      line-height: 18px;
      color: #684029;
      font-size: 14px;
      margin-top: 10px;
      .user-message {
        padding-bottom: 10px;
        padding-top: 10px;
        display: inline-block;
        border-top: 2px solid #E1E1E1;
      }
    }
  }
  .inarea {
    margin-bottom: 25px;
    display: block;
  }
  .sel {
    border: 1px solid #f90000;
  }
}
</style>
