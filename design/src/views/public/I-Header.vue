<template>
  <div class="i_nav" :class="{ active: isActive }">
		<div class="nav_content container">
			<h1>
				<a href="/" class="logo">i-dessert</a>
			</h1>
			<ul>
				<li v-for="(item,index) in navList"
					:key=index
          @click="linkto(index)">
				<span :class="{ turn: aindex === index }">{{ item }}</span>
				</li>
			</ul>
			<div class="nav_fun">
				<p v-show="!username">
					<span @click="login()">登录 </span>/
					<span @click="register()">注册</span>
				</p>
        <p v-show="username" class="mine" @mouseover="showMy()" @mouseout="hideMy()">{{ username }}
          <ul v-show="isOrder" class="myOrder">
            <li @click="toMy()">个人中心</li>
            <li @click="signOut()">退出登录</li>
          </ul>
        </p>
				<i class="iconfont icon-gouwuchekong"
          @click="goShop()"></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      navList: ['首页', '蛋糕', '果汁', '冰淇淋', '甜甜圈', '新闻资讯', '关于我们'],
      aindex: 0,
      isActive: false,
      isOrder: false,
      username: ''
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    if (this.$route.params.type === 'cake') {
      this.aindex = 1
    } else if (this.$route.name === 'NewsMenu' || this.$route.name === 'ShowNews') {
      this.aindex = 5
    } else if (this.$route.name === 'About') {
      this.aindex = 6
    } else if (this.$route.name === 'Agreement' || this.$route.name === 'Detail' || this.$route.name === 'Car' || this.$route.name === 'My') {
      this.aindex = null
    } else if (this.$route.name === 'Register' || this.$route.name === 'Login') {
      this.aindex = null
      this.isActive = true
    } else if (this.$route.params.type === 'drink') {
      this.aindex = 2
    } else if (this.$route.params.type === 'ice') {
      this.aindex = 3
    } else if (this.$route.params.type === 'sweet') {
      this.aindex = 4
    }
    this.username = localStorage.getItem('uname')
  },
  methods: {
    handleScroll () {
      if (window.scrollY > 0) {
        this.isActive = true
      } else if (this.$route.name === 'Login' || this.$route.name === 'Register') {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    login () {
      this.aindex = null
      this.$router.push({
        path: '/login'
      })
      this.isActive = true
    },
    register () {
      this.$router.push({
        path: '/register'
      })
      this.isActive = true
    },
    linkto (index) {
      this.aindex = index
      if (index === 0) {
        this.$router.push({
          path: '/'
        })
      } else if (index === 1) {
        window.location.reload()
        this.$router.push({
          name: 'Category',
          params: {
            type: 'cake'
          }
        })
      } else if (index === 5) {
        this.$router.push({
          path: '/news'
        })
      } else if (index === 6) {
        this.$router.push({
          path: '/about'
        })
      } else if (index === 2) {
        window.location.reload()
        this.$router.push({
          name: 'Category',
          params: {
            type: 'drink'
          }
        })
      } else if (index === 3) {
        window.location.reload()
        this.$router.push({
          name: 'Category',
          params: {
            type: 'ice'
          }
        })
      } else if (index === 4) {
        window.location.reload()
        this.$router.push({
          name: 'Category',
          params: {
            type: 'sweet'
          }
        })
      }
      this.isActive = false
    },
    goShop () {
      if (localStorage.getItem('uname')) {
        this.$router.push({
          path: '/car'
        })
      } else {
        alert('用户没有登录，请登录')
        this.$router.push({
          path: '/login'
        })
      }
      this.isActive = false
    },
    toMy () {
      this.$router.push({
        path: '/my'
      })
    },
    showMy () {
      this.isOrder = true
    },
    hideMy () {
      this.isOrder = false
    },
    signOut () {
      localStorage.setItem('uname', '')
      this.username = localStorage.getItem('uname')
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  background: #ffffff;
  transition: 1s;
  box-shadow: 0 2px 2px 0 rgba(195,195,195,0.50);
}
.i_nav {
	position: fixed;
	width: 100%;
  z-index: 1000;
  transition: 1s;
	.nav_fun {
		line-height: 75px;
		display: flex;
    .myOrder {
      display: flex;
      flex-direction: column;
      padding: 5px 0;
      background: #ffffff;
      li {
        padding: 0 18px;
        line-height: 30px;
      }
    }
    .mine {
      cursor: pointer;
      width: 100px;
      position: relative;
    }
		p {
			margin-right: 20px;
		}
		i {
			display: block;
			font-size: 22px;
		}
    span:hover {
      color: #cf4248;
    }
    span {
      cursor: pointer;
    }
    .icon-gouwuchekong {
      cursor: pointer;
    }
	}
}
.nav_content {
	display: flex;
	justify-content: space-between;
	.logo {
		width: 150px;
		height: 68px;
		display: block;
		background: url(http://localhost:8081/static/images/logo.png);
		text-indent: -9999px;
	}
	ul {
		display: flex;
		li {
			padding: 0 20px;
			line-height: 75px;
			cursor: pointer;
			.turn {
				padding: 6px 15px;
				background: #cf4248;
				border-radius: 5%;
				color: #ffffff;
			}
		}
    li:hover {
      color: #cf4248;
    }
	}
}
</style>
