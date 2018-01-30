import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Resource from 'vue-resource'

import { vuex, routers } from './Config'
// import { filters } from './common'

import './Scss/global'

Vue.use(Vuex)
Vue.use(Router)
Vue.use(Resource)

// 实例化
const router = new Router(routers),
	store = new Vuex.Store(vuex)

// 加载过滤器
// Object.keys(filters).forEach((key) => {
//   Vue.filter(key, filters[key]);
// });

function afterEach(transition) {
	if (transition.meta.title) {
		document.title = transition.meta.title
	}
}

router.afterEach(afterEach)

new Vue({
	router,
	store
}).$mount('#app')