import Vue from 'vue'
import App from './App'
import API from './api'
import store from './store'
import uView from 'uview-ui'
import VuePlugin from "@/utils/vue.plugin"
import HttpInterceptor from '@/utils/http.interceptor'
Vue.config.productionTip = false

Vue.prototype.$api = API
Vue.prototype.$store = store

App.mpType = 'app'

Vue.use(uView)
const app = new Vue({
	store,
	...App
});
Vue.use(VuePlugin, app)
Vue.use(HttpInterceptor, app)
app.$mount()

export default app;

