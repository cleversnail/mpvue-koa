import Vue from 'vue'
import App from './App'
import store from './store/index'
// 把store挂载到全局
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
