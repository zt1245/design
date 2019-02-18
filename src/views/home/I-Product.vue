<template>
  <div class="product container">
    <ITitle :title="title" :detail="detail" :sum="sum"></ITitle>
    <ul>
      <li v-for="(item,index) in NewPro"
        :key="index"
        @click="toDetail(item.id)">
        <img :src="item.imgSrc" alt="">
        <h6>{{ item.title }}</h6>
        <p>{{ item.detail }}</p>
        <i></i>
        <div class="info">
          <span class="spec">￥{{ item.price }}.00/{{ item.spec }}磅</span>
          <span class="car">加入购物车</span>
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
      NewPro: [{
        id: '001',
        imgSrc: '../../../static/images/cake.jpg',
        title: '草莓奶油蛋糕',
        detial: '甜润奶油，与草莓的自然甜度搭配',
        price: '198',
        spec: '2.0'
      },
      {
        id: '002',
        imgSrc: '../../../static/images/cake.jpg',
        title: '草莓奶油蛋糕',
        detial: '甜润奶油，与草莓的自然甜度搭配',
        price: '198',
        spec: '2.0'
      },
      {
        id: '003',
        imgSrc: '../../../static/images/cake.jpg',
        title: '草莓奶油蛋糕',
        detial: '甜润奶油，与草莓的自然甜度搭配',
        price: '198',
        spec: '2.0'
      },
      {
        id: '004',
        imgSrc: '../../../static/images/cake.jpg',
        title: '草莓奶油蛋糕',
        detial: '甜润奶油，与草莓的自然甜度搭配',
        price: '198',
        spec: '2.0'
      }]
    }
  },
  methods: {
    toDetail (id) {
      this.$router.push({
        path: `/detail/${id}`
      })
    }
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
      img {
        width: 263px;
        cursor: pointer;
      }
      h6 {
        text-align: left;
        padding: 10px 0;
        font-size: 16px;
        cursor: pointer;
      }
      p {
        text-align: left;
        font-size: 14px;
        color: #616161;
        padding-bottom: 20px;
        cursor: pointer;
      }
      i {
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
    }
  }
}
</style>
