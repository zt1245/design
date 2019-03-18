<template>
  <div class="recommad-bg">
    <div class="recommand container">
      <ITitle :title="title" :detail="detail" :sum="sum"></ITitle>
      <ul>
        <li v-for="(item,index) in remList"
          :key="index">
          <div class="left">
            <i></i>
            <i></i>
            <img :src="item.pro_img" alt="" @click="toDetail(item.id)">
          </div>
          <div class="right">
            <h3>{{ item.title }}</h3>
            <p class="describe" v-for="(des,index) in item.detail.split(',')"
              :key="index">
              {{ des }}
              <br/>
            </p>
            <p class="info">{{ item.describe }}</p>
            <div class="car_info">
              <p class="pay">￥{{ item.unit_price.split(',')[0] }}/2.0磅</p>
              <p>尺寸: 13*13cm</p>
              <p>适合3-4人食用</p>
              <div class="sel">
                <span>立即购买</span>
                <span>加入购物车</span>
              </div>
            </div>
            <div class="spec-detail">
              <p>￥250.00/2.0磅<i class="iconfont icon-cuo"></i></p>
              <ul>
                <li>1.0磅</li>
                <li>2.0磅</li>
                <li>3.0磅</li>
                <li>5.0磅</li>
              </ul>
              <div class="btn">
                <span class="now">立即购买</span>
                <span class="car">加入购物车</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ITitle from '@/views/home/I-Title.vue'
export default {
  name: 'IRecommand',
  components: {
    ITitle
  },
  data () {
    return {
      title: '产品推荐',
      detail: 'Product recommendations',
      sum: '他人的参考，仅供参考',
      remList: []
    }
  },
  methods: {
    toDetail (id) {
      this.$router.push({
        path: `/detail/${id}`
      })
    }
  },
  mounted () {
    let label = '0'
    this.axios.post('http://localhost:3001/label', {
      label
    }).then((res) => {
      if (res.data.code === 2) {
        this.remList = res.data.result.slice(-4)
      } else {
        alert(res.data.msg)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.recommad-bg {
  background: url(http://localhost:8081/static/images/rebg.jpg);
}
.recommand {
  ul {
    overflow: hidden;
    margin-top: 30px;
    padding-bottom: 50px;
    li {
      overflow: hidden;
      padding-bottom: 50px;
      img {
        cursor: pointer;
        border: 1px solid #cccccc;
      }
      .left {
        position: relative;
      }
      .right {
        width: 600px;
        text-align: left;
        position: relative;
        h3 {
          margin-top: 90px;
          font-family: MicrosoftYaHei;
          font-size: 20px;
          line-height: 24px;
          letter-spacing: 5px;
          margin-bottom: 20px;
        }
        .describe {
          font-family: MicrosoftYaHei;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 4px;
          color: #333333;
          margin-bottom: 10px;
        }
        .info {
          width: 296px;
          font-family: MicrosoftYaHei;
          font-size: 14px;
          line-height: 24px;
          letter-spacing: 3px;
          color: #333333;
        }
        .car_info {
          font-family: MicrosoftYaHei;
          color: #cf4248;
          position: absolute;
          bottom: -8px;
          right: 40px;
          p {
            font-size: 16px;
            line-height: 24px;
          }
          .pay {
            font-size: 26px;
            line-height: 24px;
            padding-bottom: 5px;
          }
          .sel {
            margin-top: 15px;
            span {
              width: 104px;
              height: 25px;
              padding: 5px 10px;
            }
            span:nth-child(1) {
              background: #f1edea;
              margin-right: 10px;
              cursor: pointer;
            }
            span:nth-child(2) {
              background: #cf4248;
              color: #ffffff;
              cursor: pointer;
            }
          }
        }
        .spec-detail {
          position: absolute;
          width: 263px;
          bottom: -18px;
          background: #ffffff;
          padding: 12px 0;
          right: 0;
          p {
            font-size: 16px;
            color: #cf4248;
            padding-left: 5px;
            position: relative;
            i {
              color: #333333;
              position: absolute;
              right: 0;
              cursor: pointer;
            }
            i:hover {
              color: #cf4248;
            }
          }
          ul {
            display: flex;
            margin-top: 10px;
            padding-bottom: 0;
            li {
              border: 1px solid #D0C3BB;
              padding: 5px 10px;
              margin: 5px;
              font-size: 14px;
            }
          }
          .btn {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
          }
          span {
            font-size: 14px;
            display: inline-block;
            padding: 6px 12px;
          }
          .now {
            background: #f5f5f5;
          }
          .car {
            color: #ffffff;
            background: #cf4248;
          }
        }
      }
    }
    li:nth-child(2n+1) {
      padding-left: 70px;
      .left {
        float: left;
        i:nth-child(1) {
          display: block;
          width: 300px;
          height: 400px;
          background: #d4bea6;
        }
        i:nth-child(2) {
          width: 300px;
          height: 400px;
          border: 1px solid #000000;
          position: absolute;
          top: 20px;
          left: 20px;
        }
        img {
          width: 300px;
          height: 400px;
          position: absolute;
          top: 40px;
          left: 40px;
        }
      }
      .right {
        float: left;
        margin-left: 158px;
        .car_info {
          text-align: right;
        }
      }
    }
    li:nth-child(2n) {
      padding-right: 70px;
      .left {
        float: right;
        i:nth-child(1) {
          display: block;
          width: 300px;
          height: 400px;
          background: #d4bea6;
        }
        i:nth-child(2) {
          width: 300px;
          height: 400px;
          border: 1px solid #000000;
          position: absolute;
          top: 20px;
          right: 20px;
        }
        img {
          width: 300px;
          height: 400px;
          position: absolute;
          top: 40px;
          right: 40px;
        }
      }
      .right {
        float: right;
        margin-right: 108px;
      }
    }
  }
}
</style>
