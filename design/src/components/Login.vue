<template>
  <div class="login">
    <div class="content">
			<div class="login_top">
				<h2 class="active">账号密码登录</h2>
			</div>
			<div class="login_form">
					<input type="text" ref="uname" placeholder="请输入您的账号" />
					<input type="password" ref="upwd" placeholder="请输入密码" />
					<i>立即登陆</i>
					<p>
            <span @click="goRegister()">去注册</span>
            <span>忘记密码</span>
          </p>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  methods: {
    goRegister () {
      this.$router.push({
        path: '/register'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  background: url(../../static/images/loginbg.jpg) no-repeat;
  padding: 500px 0 200px;
  background-size: cover;
  position: relative;
  .content {
    width: 370px;
    padding: 20px 60px 30px;
    border: 1px solid #e4eaec;
    background: #ffffff;
    position: absolute;
    right: 12%;
    top: 30%;
    .login_top {
      h2 {
        font-size: 20px;
        line-height: 3;
      }
    }
    .login_form {
      input:nth-child(1),input:nth-child(2) {
        width: 238px;
        border: none;
        outline: none;
        border-bottom: 1px solid #e4eaec;
        height: 40px;
        padding-left: 10px;
      }
      i {
        height: 40px;
        line-height: 40px;
        width: 240px;
        display: block;
        background: #cf4248;
        margin: 20px auto;
        color: #ffffff;
        cursor: pointer;
      }
      p {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        cursor: pointer;
        span:hover {
          color: #cf4248;
        }
      }
    }
  }
}
</style>
