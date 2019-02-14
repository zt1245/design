import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Category from '@/components/Category'
import News from '@/components/News'
import ShowNews from '@/components/ShowNews'
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
    }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
