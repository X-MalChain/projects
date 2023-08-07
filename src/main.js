import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

// 导入全局样式表
import './assets/css/global.css'


Vue.config.productionTip = false

// 配置axios默认的请求路径
axios.defaults.baseURL = 'http://172.26.204.238:8888'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.withCredentials = true
// 全局注册，使用方法为 this.axios
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
