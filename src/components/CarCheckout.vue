<template>
  <div class="carCheckout">
    <div class="delivery-info container">
      <h3 class="delivery-info-title">配送信息</h3>
      <div class="address-info-content">
        <div class="cart-address-button"
          @click="address()">
          +&nbsp;&nbsp;添加新的地址
        </div>
        <div class="add-address"
          v-show="addAddress">
          <p>添加地址</p>
          <div class="area">
            <span>所在地区：</span>
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
          </div>
          <div class="detail-address">
            <span>详细地址：</span>
            <input type="text" placeholder="请填写街道，门牌号等">
          </div>
          <div class="conginee">
            <span>收货人：</span>
            <input type="text" placeholder="收货人姓名">
          </div>
          <div class="telephone">
            <span>手机号码：</span>
            <input type="text" placeholder="收货人手机">
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
                <img :src="item.imgSrc">
              </td>
              <td class="goods-cake">
                <div>
                  <h4>{{ item.title }}</h4>
                  <span class="goods-spec">规格：{{ item.spec }}</span>
                </div>
              </td>
              <td class="car-unit-price">￥{{ item.price }}.00</td>
              <td class="number-li">{{ item.num }}</td>
              <td class="money">￥{{ parseInt(item.price)*parseInt(item.num) }}.00</td>
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
          <span>￥240.00</span>
        </div>
        <div class="user-info-confirm">
          <span class="user-message">收货人信息：</span>
          <div class="user-info">
            木子
            <span>13545859875</span>
          </div>
          <span>深圳市宝安区新安街道兴东社区</span>
        </div>
        <input type="button" class="go-pay" name="go-pay" value="下单结算">
      </div>
    </div>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data'
export default {
  data () {
    return {
      value1: '',
      value2: '',
      addAddress: false,
      options: regionData,
      selectedOptions: [],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      goodsList: [{
        id: '001',
        imgSrc: '../../static/images/caked.jpg',
        title: '四口味挂耳咖啡混合装（4包入）',
        spec: '2.0',
        price: '40',
        num: '1'
      },
      {
        id: '001',
        imgSrc: '../../static/images/caked.jpg',
        title: '四口味挂耳咖啡混合装（4包入）',
        spec: '2.0',
        price: '40',
        num: '5'
      }]
    }
  },
  methods: {
    address () {
      this.addAddress = true
    },
    handleChange (value) {
    },
    cancel () {
      this.addAddress = false
    },
    sure () {
      this.addAddress = false
    }
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
      .cart-address-button:hover {
        color: #cf4248;
      }
      .add-address {
        padding: 28px 42px;
        text-align: left;
        font-size: 14px;
        position: absolute;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        z-index: 1000;
        left: 50%;
        top: 50%;
        margin-left: -296px;
        margin-top: -152px;
        div {
          margin: 10px 0;
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
}
</style>
