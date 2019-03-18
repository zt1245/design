<template>
  <div class="category">
    <img src="http://localhost:8081/static/images/newban.png" class="ban">
    <div class="type container">
      <dl class="cat-list">
        <dt>分类：</dt>
        <dd v-for="(item,index) in typeList"
          :key="index"
          :class="{ select: selnum === index }"
          @click="selection(index)">
        {{ item }}
        </dd>
      </dl>
    </div>
    <div class="pro-list container">
      <ul>
        <li v-for="(item,index) in proList"
          :key="index">
          <img :src="item.pro_img">
          <p>{{ item.title }}</p>
          <span>￥{{ item.unit_price.split(",")[0] }}/2.0磅</span>
          <div class="label-entrance">
            <i v-for="(tab,tabindex) in item.tab.split(',')"
              :key="tabindex">{{ tab }} ></i>
          </div>
          <div class="car" @click="toDetail(item.id)">
            <i class="iconfont icon-xiangqing"></i>
            查看详情
          </div>
          <div class="label">
            <i class="iconfont icon-renqibiaoqian1"
              v-show="item.label === '1'"></i>
            <i class="iconfont icon-xinpinbiaoqian1"
              v-show="item.label === '0'"
              :class="{ green: item.label === '0' }"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      typeList: ['全部分类', '蛋糕', '果汁', '冰淇淋', '甜甜圈'],
      selnum: 0,
      proList: [],
      tabList: []
    }
  },
  mounted () {
    if (this.$route.params.type === 'cake') {
      this.selnum = 1
    } else if (this.$route.params.type === 'drink') {
      this.selnum = 2
    } else if (this.$route.params.type === 'ice') {
      this.selnum = 3
    } else if (this.$route.params.type === 'sweet') {
      this.selnum = 4
    }
    let type = this.$route.params.type
    this.axios.post('http://localhost:3001/category', {
      type
    }).then((res) => {
      if (res.data.code === 2) {
        this.proList = res.data.result
      } else {
        alert(res.data.msg)
      }
    })
  },
  methods: {
    selection (index) {
      if (index === 0) {
        this.axios.post('http://localhost:3001/all').then((res) => {
          if (res.data.code === 2) {
            this.proList = res.data.result
          } else {
            alert(res.data.msg)
          }
        })
      } else {
        if (index === 1) {
          var type = 'cake'
        } else if (index === 2) {
          type = 'drink'
        } else if (index === 3) {
          type = 'ice'
        } else if (index === 4) {
          type = 'sweet'
        }
        this.axios.post('http://localhost:3001/category', {
          type
        }).then((res) => {
          if (res.data.code === 2) {
            this.proList = res.data.result
          } else {
            alert(res.data.msg)
          }
        })
      }
      this.selnum = index
    },
    toDetail (id) {
      this.$router.push({
        path: `/detail/${id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  .ban {
    width: 100%;
  }
  .car {
    font-size: 14px;
    line-height: 18px;
    margin-top: 10px;
    cursor: pointer;
    i {
      display: inline-block;
      font-size: 18px;
      padding-right: 5px;
    }
  }
  .car:hover {
    color: #cf4248;
  }
  .type {
    margin-top: 20px;
    font-size: 13px;
    margin-bottom: 35px;
    border-top: #f2f2f2 solid 1px;
    border-bottom: #f2f2f2 solid 1px;
    padding: 8px 0;
    .cat-list {
      line-height: 50px;
      height: 50px;
      display: flex;
      dt {
        color: #9B9B9B;
        margin-right: 38px;
        text-align: left;
        margin: 0 13px;
      }
      dd {
        margin: 0 13px;
        cursor: pointer;
      }
      .select {
        color: #cf4248;
      }
    }
  }
  .pro-list {
    ul {
      overflow: hidden;
      li {
        float: left;
        padding: 0 18px;
        margin: 0 18px;
        position: relative;
        margin-bottom: 50px;
        .label {
          .green {
            color: rgb(5, 181, 112);
          }
          i {
            display: inline-block;
            color: #cf4248;
            font-size: 30px;
          }
          position: absolute;
          top: 0;
        }
        .label-entrance {
          padding-top: 5px;
          i {
            display: inline-block;
            padding: 5px 10px;
            border: 1px solid #cf4248;
            font-size: 14px;
            border-radius: 100px;
            color: #cf4248;
            margin-right: 5px;
          }
        }
        img {
          width: 228px;
          height: 246px;
          cursor: pointer;
        }
        p {
          font-size: 14px;
          line-height: 20px;
          width: 228px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          display: block;
          line-height: 18px;
          margin-top: 5px;
          font-size: 14px;
          color: #cf4248;
        }
      }
    }
  }
}
</style>
