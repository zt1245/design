import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Category from '@/components/Category'
import News from '@/components/News'
import ShowNews from '@/components/ShowNews'
import About from '@/components/About'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Agreement from '@/components/Agreement'
import Detail from '@/components/Detail'
import Car from '@/components/Car'
import CarCheckout from '@/components/CarCheckout'
import My from '@/components/My'
import Payment from '@/components/Payment'
import Success from '@/components/Success'
import Fail from '@/components/Fail'
import AboutContent from '@/views/about/AboutContent'
import Aboutcompany from '@/views/about/Aboutcompany'
import Aboutculture from '@/views/about/Aboutculture'
import Aboutgoodness from '@/views/about/Aboutgoodness'
import NewsMenu from '@/views/news/NewsMenu'
import PerCenter from '@/views/my/PerCenter'
import ReciveAdd from '@/views/my/ReciveAdd'
import ChangePwd from '@/views/my/ChangePwd'
import Allorders from '@/views/my/Allorders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/category/:type',
      name: 'Category',
      component: Category
    },
    {
      path: '/news',
      component: News,
      children: [{
        path: '',
        name: 'NewsMenu',
        component: NewsMenu
      },
      {
        path: 'shownews/:id',
        name: 'ShowNews',
        component: ShowNews
      }]
    },
    {
      path: '/about',
      component: About,
      children: [{
        path: '',
        name: 'AboutContent',
        component: AboutContent
      },
      {
        path: 'aboutcompany',
        name: '/Aboutcompany',
        component: Aboutcompany
      },
      {
        path: 'aboutculture',
        name: 'Aboutculture',
        component: Aboutculture
      },
      {
        path: 'aboutgoodness',
        name: 'Aboutgoodness',
        component: Aboutgoodness
      }]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/car',
      name: 'Car',
      component: Car,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('uname')) {
          next()
        } else {
          alert('未登录，请登录！')
          this.$router.push({
            path: '/login'
          })
        }
      }
    },
    {
      path: '/carCheckout',
      name: 'CarCheckout',
      component: CarCheckout,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('uname')) {
          next()
        } else {
          next({
            path: '/'
          })
        }
      }
    },
    {
      path: '/my',
      component: My,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('uname')) {
          next()
        } else {
          alert('未登录，请登录！')
          next({
            path: '/login'
          })
        }
      },
      children: [{
        path: '',
        name: 'PerCenter',
        component: PerCenter
      },
      {
        path: 'reciveAdd',
        name: 'ReciveAdd',
        component: ReciveAdd
      },
      {
        path: 'changePwd',
        name: 'ChangePwd',
        component: ChangePwd
      },
      {
        path: 'allorders',
        name: 'Allorders',
        component: Allorders
      }]
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('uname')) {
          next()
        } else {
          next({
            path: '/'
          })
        }
      }
    },
    {
      path: '/success',
      name: 'Success',
      component: Success,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('uname')) {
          next()
        } else {
          next({
            path: '/'
          })
        }
      }
    },
    {
      path: '/fail',
      name: 'Fail',
      component: Fail,
      beforeEnter: (to, from, next) => {
        console.log(to, from, next)
        if (localStorage.getItem('uname')) {
          next()
        } else {
          next({
            path: '/'
          })
        }
      }
    },
    {
      path: '',
      component: Home
    }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
