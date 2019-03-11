<template>
  <div class="detail">
    <div class="content container"
      v-for="(item,index) in detailList"
      :key="index">
			<div class="left" ref="mBox">
				<!--小图-->
				<div class="cake_photo_s"
          @mouseover="show()"
          @mouseout="hide()"
          ref="small"
          @mousemove="move()">
					<img :src="item.imgArr[actindex]"/>
					<!--遮罩层-->
					<div class="mask"
            v-show="isShow"
            ref="sPic"></div>
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
				<div class="cake_photo_b"
          v-show="isShow">
					<img :src="item.imgArr[actindex]" ref="bPic"/>
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
						<div class="outer_right">
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
					</div>
					<div class="cake_size">
						<span>商品规格：</span>
						<ul>
							<li v-for="(specItem,specIndex) in item.specArr"
                :key="specIndex"
                :class="{ select: selNum === specIndex }"
                @click="changeSize(specIndex)">
								{{ specItem }}磅
								<i class="iconfont"
                  :class="{ 'icon-xuanzhong': selNum === specIndex }"></i>
							</li>
						</ul>
					</div>
					<div class="buy_button">
						<span class="buy">立即购买</span>
						<span class="car">加入购物车</span>
					</div>
				</div>
			</div>
		</div>
    <!--详情图开始-->
		<div class="detail_photo container">
			<img v-for="(deImg,deIndex) in detailImg"
        :key="deIndex"
        :src="deImg"/>
		</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      actindex: 0,
      selNum: 0,
      isShow: false,
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
      }],
      detailImg: ['../../static/images/teatime_detail_01.jpg', '../../static/images/teatime_detail_02.jpg', '../../static/images/teatime_detail_03.jpg', '../../static/images/teatime_detail_04.jpg', '../../static/images/teatime_detail_05.jpg']
    }
  },
  methods: {
    switchNum (num) {
      this.actindex = num
    },
    changeSize (num) {
      this.selNum = num
    },
    show () {
      this.isShow = true
    },
    hide () {
      this.isShow = false
    },
    // 实现放大镜
    move (e) {
      e = e || event
      var x = e.pageX
      var y = e.pageY
      var left = x - this.$refs.small[0].offsetLeft - this.$refs.sPic[0].offsetWidth / 2 - this.$refs.mBox[0].offsetLeft
      var top = y - this.$refs.small[0].offsetTop - this.$refs.sPic[0].offsetHeight / 2 - this.$refs.mBox[0].offsetTop
      var le = this.$refs.sPic[0].offsetWidth
      var to = this.$refs.sPic[0].offsetHeight
      if (left >= le) {
        left = le
      } else if (left < 0) {
        left = 0
      }
      if (top >= to) {
        top = to
      } else if (top < 0) {
        top = 0
      }
      var bigLeft = (left * this.$refs.bPic[0].offsetWidth) / this.$refs.small[0].offsetWidth
      var bigTop = (top * this.$refs.bPic[0].offsetHeight) / this.$refs.small[0].offsetHeight
      this.$refs.sPic[0].style.left = left + 'px'
      this.$refs.sPic[0].style.top = top + 'px'
      this.$refs.bPic[0].style.left = -bigLeft + 'px'
      this.$refs.bPic[0].style.top = -bigTop + 'px'
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
    border-bottom: 1px solid #D8D8D8;
    margin-bottom: 20px;
    padding-bottom: 20px;
    .left {
      position: relative;
      margin-right: 80px;
      .cake_photo_b {
        width: 420px;
        height: 420px;
        border: 1px solid rgba(0,0,0,.05);
        position: absolute;
        top: 20px;
        left: 450px;
        z-index: 100;
        overflow: hidden;
        img {
          width: 840px;
          height: 840px;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
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
          background: url(../../static/images/mask.png);
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
      .outer_box {
        padding-top: 25px;
        .detail_img {
          display: flex;
          margin-bottom: 35px;
          img {
            width: 300px;
            height: 170px;
          }
          .outer_right {
            margin-left: 30px;
            i {
              color: #C69C6D;
              padding-right: 10px;
            }
            li {
              line-height: 35px;
            }
            .price {
              color: #C69C6D;
              padding-left: 8px;
              span {
                font-size: 22px;
                padding-left: 12px;
              }
            }
          }
        }
        .cake_size {
          display: flex;
          span {
            line-height: 30px;
            height: 30px;
            color: #684029;
            font-size: 12px;
          }
          ul {
            display: flex;
            li {
              position: relative;
              width: 60px;
              line-height: 30px;
              height: 30px;
              font-size: 12px;
              color: #684029;
              text-align: center;
              border: 1px solid #e7e0dd;
              cursor: pointer;
              margin-left: 15px;
              margin-bottom: 14px;
              i {
                position: absolute;
                top: -10px;
                left: -3px;
                font-size: 16px;
                color: #684029;
              }
            }
            li:hover {
              color: #C69C6D;
            }
            .select {
              border-color: #684029;
            }
          }
        }
        .buy_button {
          margin-top: 10px;
          display: flex;
          span {
            width: 167px;
            height: 40px;
            display: block;
            text-align: center;
            line-height: 40px;
            background: #684029;
            color: #FFFFFF;
            font-size: 14px;
            margin-right: 15px;
            cursor: pointer;
          }
          .buy {
            background: #F4F4F4;
            color: #7A5844;
          }
        }
      }
    }
  }
}
</style>
