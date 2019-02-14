<template>
  <div class="shownews">
    <h4>{{ this.newList[0].title }}</h4>
    <span>{{ this.newList[0].date }}</span>
    <span>{{ this.newList[0].time }}</span>
    <p v-for="(item,index) in newList[0].section"
      :key="index">{{ item }}</p>
    <div class="navgation">
      <i @click="prevto()">上一页：{{ prev }}</i>
      <i @click="nextto()">下一页：{{ next }}</i>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sideBar: ['新闻资讯', '行业资讯', '公司资讯'],
      sideActive: 0,
      prev: '',
      next: '',
      num: null,
      prevnum: null,
      nextnum: null,
      newList: [{
        id: 0,
        time: '17:08:25',
        title: '2019年港式甜品加盟加盟都会走多元化道路吗？',
        date: '2012-02-10',
        section: ['现在有越来越多的港式甜品店采用了多元化产品策略，不仅是为了增加店铺的利润，更多是为了开拓新的顾客群，对于现在消费者需求多变，多元化的甜品市场，从长远来说，做出这些改变，港式甜品店的号召力也会更强，那么港式甜品加盟店如何更好地运用多元化产品策略呢？', '综合品牌经营定位', '奶茶店在采取多元化产品策略时，一定要结合自己品牌定位，增加的产品必须符合奶茶品牌，服务体验与产品相匹配，以及拥有足够的资本延伸新品类，例如茶邦，不仅提供奶茶，还为消费者提供一个休闲的社交互动地方，类似的，因此增加新的品类可以吸引更多非奶茶消费者，占据更多的非奶茶消费时段，因此蛋糕店推出怀旧粤式甜品系列，为消费者提供下午茶的时间，虽然增加了品类，但在特定时段供应就显得不会太违和。']
      },
      {
        id: 1,
        time: '17:08:25',
        title: '为什么港式甜品加盟店蜜月期这么短？原来原因在这里！',
        date: '2012-02-10',
        section: ['在日常生活中，我们不难发现无论是小区还是办公区，抑或是商业区，在这种人群比较集中地方，如果开起了一家港式甜品加盟店，一旦其生意红火起来，便会迅速引来无数跟风者相继开店，不过多少时日我们会发现最后只剩下一家店，即最先开业的店，其它的港式甜品店为什么做不长久?下面我们一起来分析一下吧。', '伪商圈+盲目跟风', '很多甜品加盟店在选址的时候总是喜欢跟风，认为开在繁华热闹的区域，营业收入也应当非常乐观，事实上，开港式甜品加盟店，在商圈选择的标准上，一方面要考虑商圈的稳定度和成熟度，另一方面要考虑港式甜品加盟店自身的市场定位，一个商圈有没有主要聚客点是这个商圈成熟度的重要标志：大型商业购物中心，商业圈已经往往自带客流量，人群定位已十分明朗，因此港式甜品加店在选择的时候，一定要考虑该商圈的消费群体特征，包括年龄段，性别，收入等等。']
      },
      {
        id: 2,
        time: '17:08:25',
        title: '生活如此多娇,蛋糕店伴随着您',
        date: '2012-02-10',
        section: ['生活总是与美食二字如影随形，每个城市都有自己的style，承载的不单单是多方地区融合的人文风情，所更能体现在饮食方面，各色风味独特的甜品美食便由此诞生。中国人的饮食文化不是用舌品尝那么简单，更多是关乎所处于场所与当时的心态。一个城市的style，很难于直观去判断繁华与否，可能还要加上一道甜点—杏记港式甜品，是否会入得你心。', '随着社会经济的发展，越来越多的港式甜品店出现在大家的生活中，这也为大家的生活带来了非常多的改变。比如大家可以足不出户就能品尝到多种口味甜点，甚至只是在一个地方，大家就可以品尝到香港的甜品，这为大家的生活带来了非常多的便利，也更好地丰富了大家的味蕾。现在的港式甜品店是非常受大家欢迎的，市面上也出现了各种各样的港式甜品店，只要经营方法得当，这些甜品店基本上都会为投资者带来非常大的回报。', '如果你也想要经营一家港式甜品店，想要将这家店经营好，大家不妨前来了解一下蛋糕店这个项目。蛋糕店是一个专门制作港式甜品的品牌，主要推出的就是各类口味甜点，有经典的粤式甜品，还有冷热交替的糖水，时尚饮品、糕点之类的美食更是应有尽有，每一份都有好口味，还有众多的甜品饮品可以供消费者进行选择。']
      },
      {
        id: 3,
        time: '17:08:25',
        title: '想开港式甜品加盟店？让蛋糕店助你一臂之力！',
        date: '2012-02-10',
        section: ['现如今，甜品效益吸引了无数餐饮人前仆后继，小编身边也有一个朋友，跟风开了一家港式甜品加盟店，但是没多久就关店了，后来他又开了一家，从之前的失败经验中也渐渐摸索出一些套路，这里小编整理了他的经验之谈，整理了几点经营之道，希望给正想开港式甜品加盟店的同行一些启示。', '港式甜品口味的多样化', '开港式甜品加盟店，要开什么类型的港式甜品店才更合适呢?其实，要搞清楚什么才叫港式甜品加盟店，就是使用优质原料制作各种甜点，因此对甜点做工以及材料的质量有着较高的要求。口味丰富的港式甜品消费者更容易接受，因此是开甜品店的首选品类。鲜榨水果汁和鲜牛奶类甜点的港式甜品店，如果没有成熟的供应链以及灵活的损耗管理，还是不要开为好。']
      },
      {
        id: 4,
        time: '17:08:25',
        title: '港式甜品店学会这套“撩客”技能，利润还能再涨涨!',
        date: '2012-02-10',
        section: ['相信很多追过剧的朋友们都知道，剧中带着主角光环的“美男”撩起妹来是一套一套的，他们不仅会说话，在行动上也给人耳目一新的感觉，现在开港式甜品店也是一样，做甜品“撩”顾客，港式甜品店不再铺天盖地的进行自嗨式宣传，而是经过背后一系列“计谋”达成，下面就由蛋糕店来给大家分享几招甜品店的撩客技能!', '胸有成竹，却装作漫不经心', '如今，超低折扣和酷炫的营销活动满天飞，每家港式甜品店恨不得在店门口放一块展板，写上港式甜品店的所有特色和优惠，以此吸引消费者。然而，消费者早已对此感到麻木，有的时候，意外的惊喜反而能带来独特的感受。', '前段时间蛋糕店就另辟蹊径，事先港式甜品店门口以及网上并没有说明有关港式甜品店的任何活动，而是在等待顾客买完港式甜品时，送上一份免费的蛋糕店定制公仔，这样一个小小的细节给人意外惊喜，同时让消费者有种“今天好幸运，突然占了便宜”感觉。再加上惊喜是消费者即将离开时所获得，更能加深对品牌甜品店的好感，利用“反差”制造独一无二的效果，也更容易让顾客帮帮助店铺主动宣传。']
      }]
    }
  },
  mounted () {
    this.num = parseInt(this.$route.params.id)
    console.log(this.num)
    if (this.num === 0) {
      this.prev = '没有了'
    } else if (this.num === this.newList.length - 1) {
      this.next = '没有了'
      this.prev = this.newList[this.num - 1].title
    } else if (this.num > 0 && this.num < this.newList.length - 1) {
      this.prev = this.newList[this.num - 1].title
      this.next = this.newList[this.num + 1].title
    }
  },
  methods: {
    prevto () {
      this.prevnum = this.num--
      if (this.num !== 0 && this.num > 0) {
        this.$router.push({
          path: `/news/showNews/${this.prevnum}`
        })
      }
      if (this.prevnum === 0) {
        this.prev = '没有了'
      } else if (this.num > 0 && this.num < this.newList.length - 1) {
        this.prev = this.newList[this.prevnum].title
      }
    },
    nextto () {
      this.nextnum = this.num++
      if (parseInt(this.$route.params.id) !== this.newList.length - 1) {
        this.$router.push({
          path: `/news/showNews/${this.nextnum}`
        })
      }
      if (this.nextnum === 0) {
        this.next = '没有了'
      } else if (this.num > 0 && this.num < this.newList.length - 1) {
        this.next = this.newList[this.nextnum].title
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shownews {
  text-align: left;
  h4 {
    margin: 20px 0 20px 0;
    font-size: 30px;
    color: #cf4248;
  }
  span {
    color: #a3afb7;
    font-size: 16px;
    padding-right: 10px;
    display: inline-block;
    padding-bottom: 40px;
  }
  p {
    line-height: 30px;
    text-indent: 30px;
    margin-bottom: 10px;
    font-size: 18px;
    color: #222222;
  }
  .navgation {
    margin: 20px 0 10px 0;
    border-top: 1px solid #e4eaec;
    border-bottom: 1px solid #e4eaec;
    padding: 30px 10px;
    display: flex;
    justify-content: space-between;
    i {
      display: block;
      color: #999999;
      padding: 10px;
      border: 1px solid #e4eaec;
      transition: .5s;
      cursor: pointer;
      max-width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    i:hover {
      background: #cf4248;
      border: 1px solid #cf4248;
      color: #ffffff;
      transition: .5s;
    }
  }
}
</style>
