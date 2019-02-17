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
				<p>
					<span @click="login()">登录 </span>/
					<span @click="register()">注册</span>
				</p>
				<i class="iconfont icon-gouwuchekong"></i>
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
      isActive: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    if (this.$route.name === 'Category') {
      this.aindex = 1
    } else if (this.$route.name === 'NewsMenu' || this.$route.name === 'ShowNews') {
      this.aindex = 5
    } else if (this.$route.name === 'About') {
      this.aindex = 6
    }
  },
  methods: {
    handleScroll () {
      if (window.scrollY > 0) {
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
    },
    register () {
      this.$router.push({
        path: '/register'
      })
    },
    linkto (index) {
      this.aindex = index
      if (index === 0) {
        this.$router.push({
          path: '/'
        })
      } else if (index === 1) {
        this.$router.push({
          path: '/category'
        })
      } else if (index === 5) {
        this.$router.push({
          path: '/news'
        })
      } else if (index === 6) {
        this.$router.push({
          path: '/about'
        })
      }
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
	}
}
.nav_content {
	display: flex;
	justify-content: space-between;
	.logo {
		width: 150px;
		height: 68px;
		display: block;
		background: url(../../../static/images/logo.png);
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
