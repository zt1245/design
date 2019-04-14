import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import '../static/style/reset.css'
import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import axios from 'axios'
import './mock'

Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.config.productionTip = false
Vue.prototype.axios = axios

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
