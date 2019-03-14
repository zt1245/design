<template>
  <div class="recommad-bg">
    <div class="recommand container">
      <ITitle :title="title" :detail="detail" :sum="sum"></ITitle>
      <ul>
        <li v-for="(item,index) in remList"
          :key="index"
          @click="toDetail(item.id)">
          <div class="left">
            <i></i>
            <i></i>
            <img :src="item.imgSrc" alt="">
          </div>
          <div class="right">
            <h3>{{ item.title }}</h3>
            <p class="describe" v-for="(des,index) in item.describe"
              :key="index">
              {{ des }}
              <br/>
            </p>
            <p class="info">{{ item.detail }}</p>
            <div class="car_info">
              <p class="pay">￥{{ item.price }}.00/{{ item.spec }}磅</p>
              <p>尺寸: {{ item.size }}cm</p>
              <p>{{ item.suitEat }}</p>
              <div class="sel">
                <span>立即购买</span>
                <span>加入购物车</span>
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
      remList: [{
        id: '006',
        imgSrc: 'http://localhost:8081/static/images/recommand.jpg',
        title: 'Ice Cream Cake with Longan 桂圆冰淇淋',
        describe: ['/樱桃酒味从巧克力卷的缝隙飘出/', '/向往极北的黑森林，纷飞的雪花里有精灵的歌咏/'],
        detail: 'Thick dark chocolate and rich fruity Kirsch (cherry spirit) are locked in a Pandora’s Box of plump cake layers and chocolate. Don’t take a bite or you’ll free the passion!',
        price: '198',
        spec: '2.0',
        size: '13*13',
        suitEat: '适合3-4人食用'
      },
      {
        id: '007',
        imgSrc: 'http://localhost:8081/static/images/recommand.jpg',
        title: 'Ice Cream Cake with Longan 桂圆冰淇淋',
        describe: ['/樱桃酒味从巧克力卷的缝隙飘出/', '/向往极北的黑森林，纷飞的雪花里有精灵的歌咏/'],
        detail: 'Thick dark chocolate and rich fruity Kirsch (cherry spirit) are locked in a Pandora’s Box of plump cake layers and chocolate. Don’t take a bite or you’ll free the passion!',
        price: '198',
        spec: '2.0',
        size: '13*13',
        suitEat: '适合3-4人食用'
      },
      {
        id: '008',
        imgSrc: 'http://localhost:8081/static/images/recommand.jpg',
        title: 'Ice Cream Cake with Longan 桂圆冰淇淋',
        describe: ['/樱桃酒味从巧克力卷的缝隙飘出/', '/向往极北的黑森林，纷飞的雪花里有精灵的歌咏/'],
        detail: 'Thick dark chocolate and rich fruity Kirsch (cherry spirit) are locked in a Pandora’s Box of plump cake layers and chocolate. Don’t take a bite or you’ll free the passion!',
        price: '198',
        spec: '2.0',
        size: '13*13',
        suitEat: '适合3-4人食用'
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
      cursor: pointer;
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
          bottom: 15px;
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
