<template>
  <div class="my">
    <div class="content">
      <div class="container con-box">
        <div class="tabBar">
          <h2>
            个人中心
            <span></span>
          </h2>
          <el-col style="text-align: left;">
            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              active-text-color="#f80000"
              router
              style="border: none;"
            >
              <el-submenu index="1">
                <template slot="title">
                  <span style="color: #4A4A4A;font-size: 18px;font-weight: 700;">个人中心</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/my">我的个人中心</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="/my/reciveAdd">收货地址</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <span style="color: #4A4A4A;font-size: 18px;font-weight: 700;">账户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/my/ChangePwd">修改密码</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <span style="color: #4A4A4A;font-size: 18px;font-weight: 700;">订单中心</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/my/allorders">全部订单</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {},
    handleClose (key, keyPath) {}
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.my {
  padding-top: 90px;
  font-family: 'PingFang-SC-Bold';
  .content {
    background: #f5f5f5;
    .con-box {
      padding: 78px 0 220px;
      display: flex;
    }
  }
  .tabBar {
    width: 308px;
    background: #ffffff;
    padding: 40px 35px;
    box-sizing: border-box;
    overflow: hidden;
    margin-right: 24px;
    h2 {
      font-size: 24px;
      color: #4a4a4a;
      text-align: left;
      border-bottom: 1px solid #dcdcdc;
      padding-bottom: 15px;
      position: relative;
      margin-bottom: 20px;
      font-weight: 700;
      span {
        width: 100px;
        height: 4px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: #ff0000;
      }
    }
    .active {
      color: #ff0000;
    }
  }
}
</style>
