<template>
  <div class="shopping">
    <!-- 没有添加商品时候的页面 -->
    <div class="no_pro container"
      v-show="isPro">
      <div class="car_not_pro container">
				<img src="../../static/images/cartempty.png"/>
				<span>您的购物车里还没有商品</span>
				<p @click="goShop()">去购物 >></p>
			</div>
    </div>
    <!-- 添加了商品之后的页面 -->
    <div class="own_pro container">
			<div class="car_goods_info">
				<div class="all_s">
					<input type="checkbox" name="allSel" id="allSel"/>全选
				</div>
				<ul class="thead_ul">
					<li>商品</li>
					<li>单价</li>
					<li>数量</li>
					<li>金额</li>
				</ul>
				<div class="tbody_ul">
					<table>
						<tr :class="{ border_none: carList.length === 0 }"
              v-for="(item,index) in carList"
              :key="index">
							<td>
                <input type="checkbox" class="sel"/>
              </td>
							<td class="goods_img">
								<img :src="item.imgSrc"/>
							</td>
							<td class="goods_cake">
								<h4>{{ item.title }}</h4>
								<span class="spec">规格：<span>{{ item.spec }}磅</span></span>
								<span class="goods_laid">
									<i class="iconfont icon-a-cj"></i>
									赠送&nbsp;{{ item.set }}&nbsp;套餐具
								</span>
							</td>
							<td class="cake_price">￥{{ item.price }}.00</td>
							<td class="cake_num">
								<div class="number">
									<input type="button" class="reduce" value="+"/>
									<input type="text" class="tex" value="1"/>
									<input type="button" class="add" value="-"/>
								</div>
							</td>
							<td class="money">￥298.00</td>
							<td class="delete_cake">
								<i class="iconfont icon-asmkticon0245-copy-copy-copy"></i>
							</td>
						</tr>
					</table>
				</div>
			</div>
    </div>
    <!-- 结算 -->
    <div class="total container">
      <p class="all_empty">
				<i class="iconfont icon-lajitong01"></i>
				全部清空
			</p>
			<div class="total_sum">
				<div class="sum_total">
					<p>合计: ¥
						<span> 00.00</span>
					</p>
				</div>
				<div class="submit_button">
					<span>去结算</span>
				</div>
			</div>
		</div>
    <!-- 商品推荐 -->
    <div class="groom container">
      <p>商品推荐</p>
      <ul>
        <li v-for="(item,index) in groomList"
          :key="index">
          <img :src="item.imgSrc">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPro: false,
      groomList: [{
        id: '001',
        imgSrc: '../../static/images/caked.jpg'
      },
      {
        id: '002',
        imgSrc: '../../static/images/caked.jpg'
      },
      {
        id: '003',
        imgSrc: '../../static/images/caked.jpg'
      },
      {
        id: '004',
        imgSrc: '../../static/images/caked.jpg'
      }],
      carList: [{
        id: '001',
        imgSrc: '../../static/images/bailey.jpg',
        title: 'Bailey Love Triangle 百利甜情人',
        spec: '2.0',
        set: '10',
        price: '198'
      },
      {
        id: '002',
        imgSrc: '../../static/images/bailey.jpg',
        title: 'Bailey Love Triangle 百利甜情人',
        spec: '2.0',
        set: '10',
        price: '198'
      }]
    }
  },
  methods: {
    goShop () {
      this.$router.push({
        path: '/category'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.shopping {
  padding-top: 85px;
  .no_pro {
    padding: 100px 0;
    img {
      margin: 0 auto;
      width: 204px;
      height: 116px;
    }
    span {
      text-align: center;
      font-size: 14px;
      color: #D5BFA7;
      display: block;
      margin-top: 8px;
    }
    p {
      font-size: 14px;
      margin-top: 20px;
      color: #684029;
      text-align: center;
      cursor: pointer;
    }
  }
  .total {
    background: #FBFBFB;
    border: 1px solid #E1E1E1;
    padding: 26px 60px 32px 60px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    .all_empty {
      color: #684029;
      font-size: 16px;
      i {
        font-size: 40px;
        color: #D5BFA7;
        vertical-align: middle;
      }
    }
    .all_empty:hover {
      color: #D5BFA7;
    }
    .total_sum {
      padding-top: 50px;
      .sum_total {
        color: #684029;
        text-align: right;
      }
    }
    .submit_button {
      span {
        display: block;
        background: #cf4248;
        width: 155px;
        height: 40px;
        color: #fff;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        margin-top: 30px;
      }
    }
  }
  .groom {
    padding-top: 20px;
    p {
      font-size: 18px;
      color: #684029;
      line-height: 50px;
      border-bottom: 2px solid #CECAC7;
      text-align: left;
    }
    ul {
      margin-top: 22px;
      display: flex;
      justify-content: space-between;
      padding-bottom: 50px;
      li {
        img {
          width: 252px;
          height: 252px;
        }
      }
    }
  }
  .own_pro {
    margin-top: 32px;
    font-size: 13px;
    text-align: left;
    .car_goods_info {
      .all_s {
        margin-bottom: 20px;
      }
      .thead_ul {
        background: #FAFAFA;
        font-size: 14px;
        line-height: 44px;
        border: 1px solid #e1e1e1;
        display: flex;
        justify-content: space-around;
        li {
          height: 44px;
        }
      }
      .tbody_ul {
        background: #FFFFFF;
        margin-top: 20px;
        border: 1px solid #E1E1E1;
        position: relative;
        padding-left: 20px;
        tr {
          border-bottom: 2px dashed #F1F1F1;
          td {
            vertical-align: middle;
            padding: 20px 0;
            position: relative;
          }
          .goods_img {
            img {
              width: 108px;
              margin-left: 50px;
              border: 1px solid #EFEFEF;
            }
          }
          .goods_cake {
            display: flex;
            flex-direction: column;
            padding-left: 10px;
            h4 {
              color: #684029;
              font-size: 14px;
              padding: 10px 0;
            }
            .spec {
              color: #D5BFA7;
            }
          }
          .goods_laid {
            color: #CECECE;
            padding-top: 10px;
            i {
              font-size: 26px;
            }
          }
          .cake_price {
            padding-left: 20px;
          }
          .cake_num {
            padding-left: 226px;
            input:nth-child(1) {
              width: 20px;
              height: 20px
            }
            input:nth-child(2) {
              width: 50px;
              text-align: center;
            }
          }
          .money {
            padding-left: 215px;
          }
          .delete_cake {
            padding-left: 65px;
            i {
              font-size: 24px;
            }
            i:hover {
              color: #cf4248;
            }
          }
        }
        .border_none {
          border: none;
        }
      }
    }
  }
}
</style>
