import { SignIn, SignUp } from '@/Routes'

// 桉需加载
const Home = resolve => {
  require.ensure(['./views/Home/Home.vue'], () => {
    resolve(require('./views/Home/Home.vue'))
  })
}

const routes = [{
	path: '/',
	name: 'Home',
	meta: {
		title: '首页'
	},
	component: Home,
}, {
	path: '/signIn',
	name: 'SignIn',
	meta: {
		title: '注册'
	},
	component: SignIn,
}, {
	path: '/signUp',
	name: 'SignUp',
	meta: {
		title: '登录'
	},
	component: SignUp,
}]

function scrollBehavior(to, from, savedPosition) {
	if (savedPosition) {
		return savedPosition
	} else {
		return { x: 0, y: 0 }
	}
}

export default {
	routes,
	mode: 'history',
	scrollBehavior,
	base: '/'
}
