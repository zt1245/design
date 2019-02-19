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
						<tr>
							<input type="checkbox" class="sel"/>
							<td class="goods_img">
								<img src="../../static/images/bailey.jpg"/>
							</td>
							<td class="goods_cake">
								<h4>Bailey's Love Triangle 百利甜情人</h4>
								<span class="spec">规格：<span>2.0磅</span></span>
								<span class="goods_laid">
									<i></i>
									赠送
									<ins>&nbsp;10&nbsp;</ins>
									套餐具
								</span>
							</td>
							<td class="cake_price">￥298.00</td>
							<td class="cake_num">
								<div class="number">
									<input type="button" class="reduce"/>
									<input type="text" class="tex" value="1"/>
									<input type="button" class="add"/>
								</div>
							</td>
							<td class="money">￥298.00</td>
							<td class="delete_cake">
								<i></i>
							</td>
						</tr>
					</table>
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
  .groom {
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
        margin-bottom: 20px
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
        tr {
          position: relative;
          .sel {
            position: absolute;
            width: 16px;
            height: 16px;
            top: 50%;
            left: 20px;
            margin-top: -8px;
          }
          .goods_img img {
            width: 108px;
            margin-left: 75px;
            border: 1px solid #EFEFEF;
          }
          .goods_cake {
            display: flex;
            flex-direction: column;
            h4 {
              color: #684029;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
