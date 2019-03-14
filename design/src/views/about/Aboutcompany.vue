<template>
  <div class="aboutcompany container">
    <p v-for="(item,index) in companyList"
      :key="index">{{ item }}</p>
    <img src="http://localhost:8081/static/images/about.jpg">
  </div>
</template>

<script>
export default {
  data () {
    return {
      companyList: ['蛋糕店是长沙餐饮管理有限公司旗下的现烤蛋糕烘培品牌，是一个以快餐式现烤烘焙+特色休闲零食为主打的新零售品牌。为保证烘培的最佳口感，蛋糕店所有烘培产品在收银去柜台以现烤现卖的方式进行售卖，保证客户买到的面包都是现烤出炉的。在零售区，蛋糕店精选特色休闲零食+低温牛奶以量贩式方式售卖。', '现烤烘培有四大系列：现烤蛋糕，调理肉松蛋糕，果蔬软欧面包和酥饼点心。特色休闲零食主打手工蛋卷、年糕片、红薯片、油赞子和炒货。低温牛奶主打天润酸奶、宾格瑞牛奶等。蛋糕店创新性的烘焙产品和颠覆性餐饮化新零售方式一经推出，便受到顾客青睐。', '现在，长沙餐饮管理公司旗下品牌蛋糕店已经开放了全国市场加盟。希望更多的创业者可以加入到我们的大家庭中！']
    }
  }
}
</script>

<style lang="scss" scoped>
.aboutcompany {
  line-height: 1.8;
  font-size: 16px;
  text-align: left;
  color: #2a333c;
  p {
    margin-bottom: 10px;
  }
  img {
    margin: 20px auto 50px;
  }
}
</style>
