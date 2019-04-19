import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  }
]
export const asyncRouterMap = [
  {
    path: '/platform',
    component: Layout,
    redirect: '/dashboard',
    name: 'Platform',
    meta: { title: '平台管理', icon: 'eye' },
    children: [
      {
        path: 'user',
        component: () => import('@/views/user/index'),
        name: 'User',
        meta: { title: '用户管理', icon: 'people' }
      },

      {
        path: 'shopping',
        component: () => import('@/views/product/index'),
        name: 'Product',
        meta: { title: '商品管理', icon: 'shopping' }
      },
      {
        path: 'publish',
        name: 'create',
        component: () => import('@/views/platform/index'),
        meta: { title: '新闻发布', icon: 'table' }
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'form' }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
