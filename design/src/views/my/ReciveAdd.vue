<template>
  <div class="reciveadd">
    <p>收货地址</p>
    <ul>
      <li @click="add()">
        <i>+</i>
        <p>添加新地址</p>
      </li>
      <li v-for="(item,index) in adList" :key="index">
        <p>{{ item.name }}</p>
        <p>{{ item.phone }}</p>
        <p>{{ item.addr_ahead }}{{ item.addr }}</p>
        <div>
          <span @click="update(item.id)">修改</span>
          <span @click="del(item.id)">删除</span>
        </div>
      </li>
    </ul>
    <div class="add-address" v-show="addAddress">
      <p v-show="show === false">添加地址</p>
      <p v-show="show">修改地址</p>
      <div class="area">
        <span class="inarea">所在地区：</span>
        <el-input placeholder="江西省赣州市章贡区" :disabled="true"></el-input>
      </div>
      <div class="detail-address">
        <span>详细地址：</span>
        <input type="text" placeholder="请填写街道，门牌号等" ref="addr">
      </div>
      <div class="conginee">
        <span>收货人：</span>
        <input type="text" placeholder="收货人姓名" ref="name">
      </div>
      <div class="telephone">
        <span>手机号码：</span>
        <input type="text" placeholder="收货人手机" ref="tel">
      </div>
      <div class="icon">
        <i @click="cancel()">取消</i>
        <i class="sure" @click="sure()" v-show="show === false">确定</i>
        <i class="sure" @click="upd()" v-show="show">修改</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      adList: [],
      addAddress: false,
      list: [],
      show: false,
      num: ''
    }
  },
  methods: {
    addSel () {
      var uname = localStorage.getItem('uname')
      this.axios.post('http://localhost:3001/selAdd', {
        uname
      }).then(res => {
        if (res.data.code === 2) {
          this.adList = res.data.result
          console.log(111)
        } else {
          this.$notify.error({
            title: '错误',
            message: '查询失败，请重试！'
          })
        }
      })
    },
    add () {
      this.addAddress = true
      this.show = false
    },
    // 添加地址点击取消
    cancel () {
      this.addAddress = false
    },
    // 添加地址点击确定
    sure () {
      if (this.$refs.addr.value !== '' && this.$refs.name !== '' && this.$refs.tel.value !== '') {
        this.addAddress = false
        let addr = this.$refs.addr.value
        let name = this.$refs.name.value
        let tel = this.$refs.tel.value
        let add = '江西省赣州市章贡区'
        let username = localStorage.getItem('uname')
        this.axios.post('http://localhost:3001/addAddr', {
          addr,
          name,
          tel,
          username,
          add
        }).then((res) => {
          if (res.data.code === 2) {
            this.$notify({
              title: '成功',
              message: '添加成功！',
              type: 'success'
            })
            this.addSel()
          } else {
            this.$notify.error({
              title: '错误',
              message: '添加失败，请重试！'
            })
          }
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '请正确填写信息'
        })
      }
    },
    // 点击修改，查询
    update (id) {
      this.addAddress = true
      this.show = true
      this.num = id
      this.axios.post('http://localhost:3001/selectA', {
        id
      }).then((res) => {
        if (res.data.code === 2) {
          this.list = res.data.data[0]
          this.$refs.addr.value = this.list.addr
          this.$refs.name.value = this.list.name
          this.$refs.tel.value = this.list.phone
        } else {
          this.$notify.error({
            title: '错误',
            message: '查询失败，请重试！'
          })
        }
      })
    },
    // 修改
    upd () {
      if (this.$refs.addr.value !== '' && this.$refs.name !== '' && this.$refs.tel.value !== '') {
        this.addAddress = false
        let addr = this.$refs.addr.value
        let name = this.$refs.name.value
        let tel = this.$refs.tel.value
        let add = '江西省赣州市章贡区'
        console.log(tel)
        let id = this.num
        this.axios.post('http://localhost:3001/upaddress', {
          addr,
          name,
          tel,
          id,
          add
        }).then((res) => {
          if (res.data.code === 2) {
            this.$notify({
              title: '成功',
              message: '修改成功！',
              type: 'success'
            })
            this.addSel()
          } else {
            this.$notify.error({
              title: '错误',
              message: '修改失败，请重试！'
            })
          }
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '请正确填写信息'
        })
      }
    },
    // 删除
    del (id) {
      this.axios.post('http://localhost:3001/delAdd', {
        id
      }).then((res) => {
        if (res.data.code === 2) {
          this.$notify({
            title: '成功',
            message: '删除成功！',
            type: 'success'
          })
          this.addSel()
        } else {
          this.$notify.error({
            title: '错误',
            message: '删除失败，请重试！'
          })
        }
      })
    }
  },
  mounted () {
    this.addSel()
  }
}
</script>

<style lang="scss" scoped>
.reciveadd {
  background: #ffffff;
  width: 100%;
  padding: 40px 80px 0 80px;
  p {
    color: #262a2f;
    font-size: 30px;
    text-align: left;
    margin-bottom: 64px;
  }
  ul {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    li {
      width: 30%;
      border: 1px solid #dcdcdc;
      margin-right: 16px;
      padding: 33px 13px 11px 21px;
      margin-bottom: 20px;
      p:nth-child(1) {
        color: #3e3e3f;
        font-size: 18px;
        margin-bottom: 35px;
      }
      p:nth-child(2),
      p:nth-child(3) {
        color: #7b7b7b;
        font-size: 14px;
        margin-bottom: 14px;
      }
      p:nth-child(3) {
        line-height: 20px;
      }
      div {
        padding-top: 15px;
        span {
          color: #f80000;
          cursor: pointer;
        }
        span:nth-child(2) {
          margin-left: 50px;
        }
      }
    }
    li:nth-child(1) {
      cursor: pointer;
      i {
        width: 42px;
        height: 42px;
        background: #dcdcdc;
        border-radius: 50%;
        display: block;
        font-size: 36px;
        color: #ffffff;
        line-height: 36px;
        margin: 65px auto 14px;
      }
      p {
        font-size: 14px;
        color: #4a4a4a;
        text-align: center;
      }
    }
  }
  .add-address {
    padding: 28px 42px;
    text-align: left;
    font-size: 14px;
    position: fixed;
    background: #ffffff;
    border: 1px solid #dcdfe6;
    z-index: 1000;
    left: 50%;
    top: 40%;
    margin-left: -296px;
    margin-top: -152px;
    div {
      margin: 20px 0;
    }
    p {
      color: #cacaca;
      margin-bottom: 20px;
    }
    input::-webkit-input-placeholder {
      color: #dcdfe6;
    }
    input {
      padding-left: 10px;
      border: none;
      outline: none;
      border: 1px solid #dcdfe6;
      height: 40px;
      border-radius: 5px;
    }
    .detail-address {
      input {
        width: 420px;
      }
    }
    .conginee {
      input {
        width: 200px;
        margin-left: 14px;
      }
    }
    .telephone {
      input {
        width: 200px;
      }
    }
    .icon {
      padding-top: 30px;
      text-align: right;
      i {
        width: 140px;
        height: 42px;
        display: inline-block;
        border: 1px solid #e1e1e1;
        color: #686868;
        text-align: center;
        line-height: 42px;
        cursor: pointer;
      }
      .sure {
        background: #cf4248;
        border-color: #cf4248;
        color: #ffffff;
        margin-left: 20px;
      }
    }
  }
}
</style>
