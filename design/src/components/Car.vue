<template>
  <div class="shopping">
    <!-- 没有添加商品时候的页面 -->
    <div class="no_pro container"
      v-show="isPro">
      <div class="car_not_pro container">
				<img src="http://localhost:8081/static/images/cartempty.png"/>
				<span>您的购物车里还没有商品</span>
				<p @click="goShop()">去购物 >></p>
			</div>
    </div>
    <!-- 添加了商品之后的页面 -->
    <div class="own_pro container"
      v-show="isPro === false">
			<div class="car_goods_info">
				<div class="all_s">
					<input type="checkbox" v-model="checked" @click="checkedAll()"/>全选
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
                <input type="checkbox" class="sel" v-model="checkboxList" :value="item.id"/>
              </td>
							<td class="goods_img">
								<img :src="item.pro_img"/>
							</td>
							<td class="goods_cake">
								<h4>{{ item.title }}</h4>
								<span class="spec">规格：<span>{{ item.spec }}.0磅</span></span>
								<span class="goods_laid">
									<i class="iconfont icon-a-cj"></i>
									赠送&nbsp;10&nbsp;套餐具
								</span>
							</td>
							<td class="cake_price">￥{{ item.unit_price }}.00</td>
							<td class="cake_num">
								<div class="number">
									<button @click="reduce(index, item.id)">-</button>
                  <input type="text" v-model="item.quantity">
                  <button @click="add(index, item.id)">+</button>
								</div>
							</td>
							<td class="money">￥{{ item.unit_price * item.quantity }}.00</td>
							<td class="delete_cake">
								<i class="iconfont icon-asmkticon0245-copy-copy-copy" @click="cut(item.id)"></i>
							</td>
						</tr>
					</table>
				</div>
			</div>
    </div>
    <!-- 结算 -->
    <div class="total container"
      v-show="isPro === false">
      <p class="all_empty" @click="empty()">
				<i class="iconfont icon-lajitong01"></i>
				全部清空
			</p>
			<div class="total_sum">
				<div class="sum_total">
					<p>合计: ¥
						<span> {{ totalPrice() }}.00</span>
					</p>
				</div>
				<div class="submit_button">
					<span @click="goCheckout()">去结算</span>
				</div>
			</div>
		</div>
    <!-- 商品推荐 -->
    <div class="groom container">
      <p>商品推荐</p>
      <ul>
        <li v-for="(item,index) in groomList"
          :key="index"
          @click="toDetail(item.id)">
          <img :src="item.pro_img">
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
      groomList: [],
      carList: [],
      checked: false,
      checkboxList: [],
      toprice: ''
    }
  },
  methods: {
    goShop () {
      this.$router.push({
        path: `/category/cake`
      })
    },
    goCheckout () {
      if (this.checkboxList.length === 0) {
        alert('未选择购买的商品，请选择')
      } else {
        localStorage.setItem('idList', JSON.stringify(this.checkboxList))
        // 生成订单号
        var outTradeNo = ''
        for (var i = 0; i < 6; i++) {
          outTradeNo += Math.floor(Math.random() * 10)
        }
        outTradeNo = new Date().getTime() + outTradeNo
        console.log(outTradeNo)
        // 生成当前时间（订单开始时间）
        var date = new Date()
        var seperator1 = '-'
        var seperator2 = ':'
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
        console.log(currentdate)
        // 订单状态
        var status = '待付款'
        // 总价格
        let totalPrice = this.toprice
        console.log(totalPrice)
        // 删除购物车里面已经选择的商品,勾选的商品添加到order订单中
        let idList = this.checkboxList
        console.log(idList)
        // 当前用户
        let uname = localStorage.getItem('uname')
        this.axios.post('http://localhost:3001/IdList', {
          idList,
          outTradeNo,
          currentdate,
          status,
          totalPrice,
          uname
        }).then((res) => {
          if (res.data.code === 2) {
            console.log('成功')
          }
        })
        this.$router.push({
          name: 'CarCheckout'
        })
      }
    },
    toDetail (id) {
      this.$router.push({
        path: `/detail/${id}`
      })
    },
    checkedAll () {
      if (this.checked) {
        this.checkboxList = []
      } else {
        this.checkboxList = []
        this.carList.forEach((item) => {
          this.checkboxList.push(item.id)
        })
      }
    },
    add (index, id) {
      this.carList[index].quantity++
      var quantity = parseInt(this.carList[index].quantity)
      // 商品数量加一
      this.axios.post('http://localhost:3001/updatePro', {
        quantity,
        id
      }).then((res) => {
        if (res.data.code === -1) {
          alert('操作失败，请重试')
        }
      })
    },
    reduce (index, id) {
      if (this.carList[index].quantity <= 1) {
        this.carList[index].quantity = 1
        var quantity = 1
      } else {
        this.carList[index].quantity--
        quantity = parseInt(this.carList[index].quantity)
      }
      // 商品数量减一
      this.axios.post('http://localhost:3001/updatePro', {
        quantity,
        id
      }).then((res) => {
        if (res.data.code === -1) {
          alert('操作失败，请重试')
        }
      })
    },
    // 查询购物车列表数据的方法
    selCarInfo () {
      let uname = localStorage.getItem('uname')
      this.axios.post('http://localhost:3001/carInfo', {
        uname
      }).then((res) => {
        if (res.data.code === 2) {
          this.carList = res.data.result
          if (this.carList.length === 0) {
            this.isPro = true
          } else {
            this.isPro = false
          }
        } else {
          alert(res.data.msg)
        }
      })
    },
    // 总金额显示
    totalPrice () {
      var totalPrice = 0
      for (var i = 0; i < this.carList.length; i++) {
        for (var j = 0; j < this.checkboxList.length; j++) {
          if (this.carList[i].id === this.checkboxList[j]) {
            totalPrice += this.carList[i].quantity * this.carList[i].unit_price
          }
        }
      }
      this.toprice = totalPrice
      return totalPrice
    },
    // 删除某个商品
    cut (num) {
      let idNum = num
      let username = localStorage.getItem('uname')
      this.axios.post('http://localhost:3001/delete', {
        idNum,
        username
      }).then((res) => {
        if (res.data.code === 2) {
          alert('删除成功')
          window.location.reload()
        } else {
          alert('删除失败，请重试')
        }
      })
    },
    // 清空
    empty () {
      let username = localStorage.getItem('uname')
      this.axios.post('http://localhost:3001/empty', {
        username
      }).then((res) => {
        if (res.data.code === 2) {
          alert('清空成功')
          window.location.reload()
        } else {
          alert('清空失败，请重试')
        }
      })
    }
  },
  mounted () {
    // 查询推荐信息
    let label = '0'
    this.axios.post('http://localhost:3001/label', {
      label
    }).then((res) => {
      if (res.data.code === 2) {
        this.groomList = res.data.result.slice(-4)
      } else {
        alert(res.data.msg)
      }
    })
    this.selCarInfo()
  },
  watch: {
    // 监听全选反选
    checkboxList: {
      handler (val, oldVal) {
        if (this.checkboxList.length === this.carList.length) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
      deep: true
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
        cursor: pointer;
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
        cursor: pointer;
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
              width: 196px;
              line-height: 20px;
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
            button {
              width: 30px;
              height: 30px;
              outline: none;
              border: 1px solid #e7e7e7;
              color: #684029;
              cursor: pointer;
              background: #fff;
            }
            input {
              width: 50px;
              height: 30px;
              outline: none;
              border: 1px solid #e7e7e7;
              color: #684029;
              background: #fff;
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
