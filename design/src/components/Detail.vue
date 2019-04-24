<template>
  <div class="detail" v-loading="loading">
    <div class="content container"
      v-for="(item,index) in datailList"
      :key="index">
			<div class="left" ref="mBox">
				<!--小图-->
				<div class="cake_photo_s"
          @mouseover="show()"
          @mouseout="hide()"
          ref="small"
          @mousemove="move()">
					<img :src="maynifier_img[actindex].url"/>
					<!--遮罩层-->
					<div class="mask"
            v-show="isShow"
            ref="sPic"></div>
				</div>
				<!--图片列表-->
				<ul>
					<li :class="{ active: actindex === num }"
            v-for="(srcIndex,num) in maynifier_img"
            :key="num"
            @click="switchNum(num)">
            <img :src="srcIndex.url"/>
          </li>
				</ul>
				<!--大图-->
				<div class="cake_photo_b"
          v-show="isShow">
					<img :src="maynifier_img[actindex].url" ref="bPic"/>
				</div>
			</div>
      <!-- 类型为cake的显示 -->
			<div class="right" v-show="item.type === 'cake'">
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
                v-for="(sweetItem,sweetIndex) in sweet"
                :key="sweetIndex"
                :class="{ sweetIcon: sweetItem === '1' }"></i>
						</span>
					</li>
				</ul>
				<div class="pro_detial">
          <p v-for="(item,index) in detailArr"
            :key="index">{{ item }}</p>
				</div>
				<div class="outer_box">
					<div class="detail_img">
						<img src="http://localhost:8081/static/images/detail_img.jpg"/>
						<div class="outer_right">
              <ul>
                <li>
                  <i class="iconfont icon-chicunleixing"></i>
                  {{ sizeArr[selNum] }}cm
                </li>
                <li>
                  <i class="iconfont icon-ren"></i>
                  {{ suitEatArr[selNum] }}
                </li>
                <li>
                  <i class="iconfont icon-a-cj"></i>
                  含{{ setArr[selNum] }}套餐具
                </li>
                <li>
                  <i class="iconfont icon-shijian"></i>
                  最早明天 09:30配送
                </li>
              </ul>
              <p class="price">
                ￥
                <span>{{ unit_price[selNum] }}.00</span>
                /{{ specArr[selNum] }}.0磅
              </p>
            </div>
					</div>
					<div class="cake_size">
						<span>商品规格：</span>
						<ul>
							<li v-for="(specItem,specIndex) in specArr"
                :key="specIndex"
                :class="{ select: selNum === specIndex }"
                @click="changeSize(specIndex)">
								{{ specItem }}.0磅
								<i class="iconfont"
                  :class="{ 'icon-xuanzhong': selNum === specIndex }"></i>
							</li>
						</ul>
					</div>
					<div class="buy_button">
						<span class="buy" @click="buyNow()">立即购买</span>
						<span class="car" @click="addCar()">加入购物车</span>
					</div>
				</div>
			</div>
      <!-- 类型为果汁的显示 -->
      <div class="right" v-show="item.type === 'drink'">
				<h3>{{ item.title }}</h3>
				<ul class="detail_distribution">
					<li>
						<i class="iconfont icon-tangguo sweetIcon"></i>
						<span>参考甜度：</span>
						<span>
							<i class="iconfont icon-tangguo"
                v-for="(sweetItem,sweetIndex) in sweet"
                :key="sweetIndex"
                :class="{ sweetIcon: sweetItem === '1' }"></i>
						</span>
					</li>
				</ul>
				<div class="pro_detial">
          <p v-for="(item,index) in detailArr"
            :key="index">{{ item }}</p>
				</div>
				<div class="outer_box">
					<div class="detail_img">
						<img src="../../static/images/drinkbox.jpg"/>
						<div class="outer_right">
              <ul>
                <li>
                  <i class="iconfont icon-chicunleixing"></i>
                  {{ drinkArr[selNum] }}杯
                </li>
                <li>
                  <i class="iconfont icon-ren"></i>
                  适合一人饮用
                </li>
              </ul>
              <p class="price">
                ￥
                <span>{{ unit_price[selNum] }}.00</span>
                /{{ drinkArr[selNum] }}杯
              </p>
            </div>
					</div>
					<div class="cake_size">
						<span>商品规格：</span>
						<ul>
							<li v-for="(drinkItem,drinkIndex) in drinkArr"
                :key="drinkIndex"
                :class="{ select: selNum === drinkIndex }"
                @click="changeSize(drinkIndex)">
								{{ drinkItem }}杯
								<i class="iconfont"
                  :class="{ 'icon-xuanzhong': selNum === drinkIndex }"></i>
							</li>
						</ul>
					</div>
					<div class="buy_button">
						<span class="buy" @click="buyNow()">立即购买</span>
						<span class="car" @click="addCar()">加入购物车</span>
					</div>
				</div>
			</div>
      <!-- 类型为冰淇淋的显示 -->
      <div class="right" v-show="item.type === 'ice'">
				<h3>{{ item.title }}</h3>
				<ul class="detail_distribution">
          <li>
						<i class="iconfont icon-xuehua"></i>
						<span>存储条件：-3°~-5℃冷藏食用口感最佳</span>
					</li>
					<li>
						<i class="iconfont icon-tangguo sweetIcon"></i>
						<span>参考甜度：</span>
						<span>
							<i class="iconfont icon-tangguo"
                v-for="(sweetItem,sweetIndex) in sweet"
                :key="sweetIndex"
                :class="{ sweetIcon: sweetItem === '1' }"></i>
						</span>
					</li>
				</ul>
				<div class="pro_detial">
          <p v-for="(item,index) in detailArr"
            :key="index">{{ item }}</p>
				</div>
				<div class="outer_box">
					<div class="detail_img">
						<img src="../../static/images/icebox.jpg"/>
						<div class="outer_right">
              <ul>
                <li>
                  <i class="iconfont icon-chicunleixing"></i>
                  {{ drinkArr[selNum] }}份
                </li>
                <li>
                  <i class="iconfont icon-ren"></i>
                  适合一人食用
                </li>
              </ul>
              <p class="price">
                ￥
                <span>{{ unit_price[selNum] }}.00</span>
                /{{ drinkArr[selNum] }}份
              </p>
            </div>
					</div>
					<div class="cake_size">
						<span>商品规格：</span>
						<ul>
							<li v-for="(drinkItem,drinkIndex) in drinkArr"
                :key="drinkIndex"
                :class="{ select: selNum === drinkIndex }"
                @click="changeSize(drinkIndex)">
								{{ drinkItem }}份
								<i class="iconfont"
                  :class="{ 'icon-xuanzhong': selNum === drinkIndex }"></i>
							</li>
						</ul>
					</div>
					<div class="buy_button">
						<span class="buy" @click="buyNow()">立即购买</span>
						<span class="car" @click="addCar()">加入购物车</span>
					</div>
				</div>
			</div>
      <!-- 类型为甜甜圈的显示 -->
      <div class="right" v-show="item.type === 'sweet'">
				<h3>{{ item.title }}</h3>
				<ul class="detail_distribution">
          <li>
						<i class="iconfont icon-xuehua"></i>
						<span>存储条件：低温冷藏，食用前使用微波炉加热口感更佳</span>
					</li>
					<li>
						<i class="iconfont icon-tangguo sweetIcon"></i>
						<span>参考甜度：</span>
						<span>
							<i class="iconfont icon-tangguo"
                v-for="(sweetItem,sweetIndex) in sweet"
                :key="sweetIndex"
                :class="{ sweetIcon: sweetItem === '1' }"></i>
						</span>
					</li>
				</ul>
				<div class="pro_detial">
          <p v-for="(item,index) in detailArr"
            :key="index">{{ item }}</p>
				</div>
				<div class="outer_box">
					<div class="detail_img">
						<img src="../../static/images/sweetbox.jpg"/>
						<div class="outer_right">
              <ul>
                <li>
                  <i class="iconfont icon-chicunleixing"></i>
                  {{ specArr[selNum] }}个/份
                </li>
                <li>
                  <i class="iconfont icon-ren"></i>
                  适合一人食用
                </li>
              </ul>
              <p class="price">
                ￥
                <span>{{ unit_price[selNum] }}.00</span>
                /份
              </p>
            </div>
					</div>
					<div class="cake_size">
						<span>商品规格：</span>
						<ul>
							<li v-for="(drinkItem,drinkIndex) in specArr"
                :key="drinkIndex"
                :class="{ select: selNum === drinkIndex }"
                @click="changeSize(drinkIndex)">
								{{ drinkItem }}个/份
								<i class="iconfont"
                  :class="{ 'icon-xuanzhong': selNum === drinkIndex }"></i>
							</li>
						</ul>
					</div>
					<div class="buy_button">
						<span class="buy" @click="buyNow()">立即购买</span>
						<span class="car" @click="addCar()">加入购物车</span>
					</div>
				</div>
			</div>
		</div>
    <!-- 详情图开始 -->
		<div class="detail_photo container">
			<img v-for="(deImg,deIndex) in detail_img"
        :key="deIndex"
        :src="deImg.url"/>
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
      datailList: [],
      detailArr: [],
      maynifier_img: [],
      sweet: [],
      unit_price: [],
      detail_img: [],
      sizeArr: ['13*13', '17*17', '23*23', '30*30'],
      suitEatArr: ['适合3-4人分享', '适合7-8人分享', '适合11-12人分享', '适合15-20人分享'],
      specArr: ['1', '2', '3', '5'],
      setArr: ['10', '10', '15', '20'],
      drinkArr: ['小', '中', '大'],
      loading: true
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
    },
    buyNow () {
      // id是商品的id号，index是第几个的价格和规格
      let productid = this.$route.params.id
      let username = localStorage.getItem('uname')
      let price = this.unit_price
      let spec = this.specArr[this.selNum]
      this.axios.post('http://localhost:3001/addCar', {
        productid,
        username,
        price,
        spec
      }).then((res) => {
        if (res.data.code === 2) {
          this.$router.push({
            path: '/car'
          })
        } else {
          alert(res.data.msg)
        }
      })
    },
    addCar () {
      // id是商品的id号，index是第几个的价格和规格
      let productid = this.$route.params.id
      let username = localStorage.getItem('uname')
      let price = this.unit_price
      let spec = this.specArr[this.selNum]
      this.axios.post('http://localhost:3001/addCar', {
        productid,
        username,
        price,
        spec
      }).then((res) => {
        if (res.data.code === 2) {
          alert('成功添加至购物车！')
        } else {
          alert('添加至购物车失败，请重试')
        }
      })
    }
  },
  mounted () {
    let id = this.$route.params.id
    this.axios.post('http://localhost:3001/pro', {
      id
    }).then((res) => {
      if (res.data.code === 2) {
        this.datailList = res.data.result
        this.detailArr = this.datailList[0].detail.split(',')
        this.maynifier_img = JSON.parse(this.datailList[0].maynifier_img)
        this.sweet = this.datailList[0].sweet.split(',')
        this.unit_price = this.datailList[0].unit_price.split(',')
        this.detail_img = JSON.parse(this.datailList[0].detail_img)
        this.loading = false
      } else {
        alert(res.data.msg)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding-top: 75px;
  .content {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
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
          background: url(http://localhost:8081/static/images/mask.png);
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
