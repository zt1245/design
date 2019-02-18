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
import AboutContent from '@/views/about/AboutContent'
import Aboutcompany from '@/views/about/Aboutcompany'
import Aboutculture from '@/views/about/Aboutculture'
import Aboutgoodness from '@/views/about/Aboutgoodness'
import NewsMenu from '@/views/news/NewsMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/news',
      name: 'News',
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
      name: 'About',
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
      path: '',
      name: 'Home',
      component: Home
    }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
