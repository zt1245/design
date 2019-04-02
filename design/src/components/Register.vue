<template>
  <div class="register">
    <div class="content">
			<div class="login_top">
				<h2 class="active">用户注册</h2>
			</div>
			<div class="login_form">
					<input type="text" ref="uname" placeholder="输入用户名" />
					<input type="password" ref="password" placeholder="密码：请输入8-20位字符" />
					<input type="password" ref="spwd" placeholder="确认密码" />
          <input type="text" ref="tel" placeholder="输入手机号">
					<i @click="Register()">注册</i>
					<p>
            <span @click="goLogin()">已有账号，去登陆</span>
          </p>
          <input type="checkbox" name="rember" id="rember" checked="checked">已阅读并同意
          <span class="protocol" @click="toprotocol()">《i甜点idessert用户服务协议》</span>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  methods: {
    goLogin () {
      this.$router.push({
        path: '/login'
      })
    },
    toprotocol () {
      this.$router.push({
        path: '/agreement'
      })
    },
    Register () {
      if (this.$refs.uname.value === '') {
        alert('请输入用户名')
      } else if (this.$refs.password.value === '') {
        alert('请输入密码')
      } else if (this.$refs.spwd.value === '') {
        alert('确认密码不能为空')
      } else if (this.$refs.password.value !== this.$refs.spwd.value) {
        alert('密码输入错误，请重试')
      } else if (this.$refs.tel.value === '') {
        alert('手机号不能为空')
      } else if (this.$refs.uname.value !== '' && this.$refs.password.value !== '' && this.$refs.spwd.value !== '' && this.$refs.password.value === this.$refs.spwd.value && this.$refs.tel.value !== '') {
        let uname = this.$refs.uname.value
        let password = this.$refs.password.value
        let phone = this.$refs.tel.value
        console.log(uname, password)
        this.axios.post('http://localhost:3001/register', {
          uname,
          password,
          phone
        }).then((res) => {
          console.log(res)
          if (res.data.code === 2) {
            this.$router.push({
              path: '/login'
            })
          } else {
            alert(res.data.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  background: url(http://localhost:8081/static/images/loginbg.jpg) no-repeat;
  padding: 500px 0 200px;
  position: relative;
  background-size: cover;
  .content {
    width: 385px;
    padding: 20px 60px 30px;
    border: 1px solid #e4eaec;
    background: #ffffff;
    position: absolute;
    right: 12%;
    top: 25%;
    font-size: 12px;
    .login_top {
      h2 {
        font-size: 20px;
        line-height: 3;
      }
    }
    .login_form {
      input:nth-child(1),input:nth-child(2),input:nth-child(3),input:nth-child(4) {
        width: 238px;
        border: none;
        outline: none;
        border-bottom: 1px solid #e4eaec;
        height: 40px;
        padding-left: 10px;
        margin-bottom: 10px;
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
        padding-left: 8px;
        padding-bottom: 10px;
        span:hover {
          color: #cf4248;
        }
      }
      .permission {
        display: inline-block;
      }
      .protocol {
        color: #cf4248;
        cursor: pointer;
      }
    }
  }
}
</style>
