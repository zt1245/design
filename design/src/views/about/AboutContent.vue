<template>
  <div class="aboutcontent">
    <ul>
      <li v-for="(item,index) in aboutList"
        :key="index">
        <div class="company-content container">
          <h3>{{ item.title }}</h3>
          <i></i>
          <p>{{ item.describe }}</p>
          <span>了解更多</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      aboutList: [{
        title: '公司介绍',
        describe: '蛋糕店是长沙餐饮管理有限公司旗下的现烤蛋糕烘培品牌，是一个以快餐式现烤烘焙+特色休闲零食为主打的新零售品牌。为保证烘培的最佳口感，蛋糕店所有烘培产品在收银去柜台以现烤现卖的方式进行售卖，保证客户买到的面包都是现烤出炉的。现在，长沙餐饮管理公司旗下品牌蛋糕店已经开放了全国市场加盟。希望更多的创业者可以加入到我们的大家庭中！'
      },
      {
        title: '企业文化',
        describe: '追求卓越 PURSUING EXCELLENCE 不断创新，勇争第一，让客户满意，一直是港基人追求的目标以人为本 PEOPLE ORIENTED员工是企业最大的财富，我们坚信，培养优秀的人才是港基成功的基石群策群力 WORK AND PULL TOGETHER我们倡导协同一致的团队精神，企业内部以及与合作伙伴的团结合作是群策群力的具体表现'
      },
      {
        title: '品牌优势',
        describe: '我们坚持采摘纯天然水果，小产区原野原味，至美至鲜的甜品，源于天然雨水和阳光，让您尽情品尝大自然的味道。在晴朗的午后，明媚的下午四点，饱满多汁的原季水果在酸性和糖分平衡瞬间成熟，便被经验丰富的水果采集师傅及时采摘。果实的原味在恰到好吃的阳光催化下，最张扬的味道得以保留，同时锁住果汁原味，驱除露水对糖分的稀释和潮气的影响，味道更为浓郁，口感富有活力。我们保持对新水果的苛刻态度，满足最挑剔的味蕾。'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.aboutcontent {
  ul {
    li:nth-child(1) {
      background: url(http://localhost:8081/static/images/company.jpg) no-repeat;
      background-size: cover;
      text-align: left;
    }
    li:nth-child(2) {
      background: url(http://localhost:8081/static/images/culture.jpg) no-repeat;
      background-size: cover;
      background-position: center;
      p {
        margin: 20px auto !important;
      }
      i {
        margin: 0 auto;
      }
    }
    li:nth-child(3) {
      background: url(http://localhost:8081/static/images/probg.jpg) no-repeat;
      background-size: cover;
      text-align: right;
      p {
        position: relative !important;
        left: 50% !important;
        margin: 0px !important;
        padding-top: 20px;
      }
      i {
        position: absolute !important;
        right: 50px !important;
        left: auto !important;
      }
    }
    li {
      margin-bottom: 30px;
      .company-content {
        background: rgba(0, 0, 0, 0.08);
        padding: 50px;
        position: relative;
        overflow: hidden;
        h3 {
          color: #333333;
          height: 60px;
          font-size: 24px;
        }
        i {
          width: 100px;
          display: block;
          height: 1px;
          background: #cf4248;
          transition: .5s;
        }
        p {
          margin: 20px 0;
          width: 50%;
          line-height: 2;
          color: #666666;
        }
        span {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          border: 1px solid #666666;
          padding: 0 20px;
          color: #666666;
          transition: .6s;
        }
      }
    }
    li:hover i {
      width: 50px;
      transition: .5s;
    }
    li:hover span {
      background: #cf4248;
      color: #ffffff;
      border: 1px solid #cf4248;
      transform: .6s;
    }
  }
}
</style>
