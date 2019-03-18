<template>
  <div class="product container">
    <ITitle :title="title" :detail="detail" :sum="sum"></ITitle>
    <ul>
      <li v-for="(item,index) in NewPro"
        :key="index">
        <img :src="item.pro_img" alt="" @click="toDetail(item.id)">
        <h6>{{ item.title }}</h6>
        <p>{{ item.describe }}</p>
        <i class="line"></i>
        <div class="info">
          <span class="spec">￥{{ item.unit_price.split(',')[0] }}/2.0磅</span>
          <span class="car">加入购物车</span>
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
      </li>
    </ul>
  </div>
</template>

<script>
import ITitle from '@/views/home/I-Title.vue'
export default {
  name: 'IProduct',
  components: {
    ITitle
  },
  data () {
    return {
      title: '新品上市',
      detail: 'New products listed',
      sum: '理应追逐最新的，向更好、更高处进发',
      NewPro: []
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
    let label = '1'
    this.axios.post('http://localhost:3001/label', {
      label
    }).then((res) => {
      if (res.data.code === 2) {
        this.NewPro = res.data.result.slice(-4)
      } else {
        alert(res.data.msg)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.product {
  ul {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    li {
      width: 263px;
      position: relative;
      img {
        width: 263px;
        cursor: pointer;
      }
      h6 {
        text-align: left;
        padding: 10px 0;
        font-size: 16px;
        width: 263px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      p {
        text-align: left;
        font-size: 14px;
        color: #616161;
        padding-bottom: 20px;
        width: 263px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .line {
        display: block;
        border-top: 1px dashed #cf4248;
      }
      .info {
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        .spec {
          font-size: 14px;
          color: #cf4248;
          padding-top: 4px;
        }
        .car {
          display: inline-block;
          padding: 6px 12px;
          background: #cf4248;
          font-size: 12px;
          color: #ffffff;
          cursor: pointer;
        }
      }
      .spec-detail {
        position: absolute;
        width: 263px;
        bottom: -10px;
        background: #f5f5f5;
        padding: 5px 0;
        p {
          font-size: 16px;
          color: #cf4248;
          padding-bottom: 0;
          position: relative;
          i {
            color: #333333;
            position: absolute;
            right: 8px;
            cursor: pointer;
          }
          i:hover {
            color: #cf4248;
          }
        }
        ul {
          display: flex;
          margin-top: 10px;
          li {
            border: 1px solid #D0C3BB;
            padding: 5px 0;
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
          background: #ffffff;
        }
        .car {
          color: #ffffff;
          background: #cf4248;
        }
      }
    }
  }
}
</style>
