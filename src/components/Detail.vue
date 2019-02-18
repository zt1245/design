<template>
  <div class="detail">
    <div class="content container"
      v-for="(item,index) in detailList"
      :key="index">
			<div class="left">
				<!--小图-->
				<div class="cake_photo_s">
					<img :src="item.imgArr[actindex]"/>
					<!--遮罩层-->
					<div class="mask"></div>
				</div>
				<!--图片列表-->
				<ul>
					<li :class="{ active: actindex === num }"
            v-for="(srcIndex,num) in item.imgArr"
            :key="num"
            @click="switchNum(num)">
            <img :src="srcIndex"/>
          </li>
				</ul>
				<!--大图-->
				<div class="cake_photo_b">
					<img src="../../static/images/teatime_01.png"/>
				</div>
			</div>
			<div class="right">
				<h3>{{ item.title }}</h3>
				<ul class="detail_distribution">
					<li>
						<i class="iconfont icon-xuehua"></i>
						<span>保鲜条件：0－4℃保藏10小时，5℃食用为佳</span>
					</li>
					<li>
						<i class="iconfont icon-tangguo sweetIcon"></i>
						<span>参考甜度：</span>
						<span>
							<i class="iconfont icon-tangguo"
                v-for="(sweetItem,sweetIndex) in item.sweetArr"
                :key="sweetIndex"
                :class="{ sweetIcon: sweetItem === '1' }"></i>
						</span>
					</li>
				</ul>
				<div class="pro_detial">
					{{ item.detail}}
				</div>
				<div class="outer_box">
					<div class="detail_img">
						<img src="../../static/images/detail_img.jpg"/>
						<ul>
							<li>
								<i class="iconfont icon-chicunleixing"></i>
								{{ item.sizeArr[selNum] }}cm
							</li>
							<li>
								<i class="iconfont icon-ren"></i>
								{{ item.suitEatArr[selNum] }}
							</li>
							<li>
								<i class="iconfont icon-a-cj"></i>
								含{{ item.setArr[selNum] }}套餐具
							</li>
							<li>
								<i class="iconfont icon-shijian"></i>
								最早明天 09:30配送
							</li>
						</ul>
						<p class="price">
							￥
							<span>{{ item.priceArr[selNum] }}.00</span>
							/{{ item.specArr[selNum] }}磅
						</p>
					</div>
					<div class="cake_size">
						<span>商品规格</span>
						<ul>
							<li v-for="(specItem,specIndex) in item.specArr"
                :key="specIndex">
								{{ specItem }}磅
								<i class="iconfont"
                  :class="{ 'icon-right': selNum === specIndex }"></i>
							</li>
						</ul>
					</div>
					<div class="buy_button">
						<a href="#">立即购买</a>
						<a href="#">加入购物车</a>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      actindex: 0,
      selNum: 0,
      detailList: [{
        id: '001',
        imgArr: ['../../static/images/teatime_01.png', '../../static/images/teatime_02.png', '../../static/images/teatime_03.png', '../../static/images/teatime_04.png'],
        title: 'Teatime 浅草',
        detail: '/“浅草才能没马蹄”//切着吃的雨前西湖龙井//中国绿茶与爽脆果实，工笔勾勒一杯好茶//复杂而纯粹的深浅绿意/*本款为季节性产品，夹心层由南水梨/马蹄更替。',
        sizeArr: ['13*13', '17*17', '23*23', '30*30'],
        suitEatArr: ['适合3-4人分享', '适合7-8人分享', '适合11-12人分享', '适合15-20人分享'],
        priceArr: ['199', '258', '300', '500'],
        specArr: ['1.0', '2.0', '3.0', '5.0'],
        setArr: ['10', '10', '15', '20'],
        sweetArr: ['1', '1', '0', '0', '0']
      }]
    }
  },
  methods: {
    switchNum (num) {
      this.actindex = num
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding-top: 75px;
  .content {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .left {
      .cake_photo_s {
        width: 420px;
        height: 420px;
        margin: 20px;
        border: 1px solid rgba(0,0,0,.05);
        background-size: 420px;
        position: relative;
        img {
          width: 100%;
        }
        .mask {
          width: 210px;
          height: 210px;
          background: url(../../static/images/mask.png) no-repeat;
          display: none;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      ul {
        overflow: hidden;
        margin: 0 30px;
        padding-bottom: 10px;
        li {
          width: 90px;
          height: 90px;
          float: left;
          margin: 0 5px;
          cursor: pointer;
          border: 1px solid rgba(0,0,0,.05);
          img {
            width: 100%;
          }
        }
        .active {
          border: 1px solid #cf4248;
        }
      }
    }
    .right {
      text-align: left;
      .sweetIcon {
        color: #cf4248;
      }
      h3 {
        font-size: 20px;
        color: #684029;
        line-height: 28px;
        padding-top: 20px;
      }
      .detail_distribution {
        padding: 12px 0;
        li {
          color: #684029;
          line-height: 34px;
        }
      }
      i {
        font-size: 30px;
        vertical-align: middle;
      }
      .icon-xuehua {
        color: #B2E4F5;
      }
      .pro_detial {
        line-height: 30px;
        font-size: 14px;
        color: #684029;
      }
    }
  }
}
</style>
