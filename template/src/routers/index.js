// 桉需加载
const Home = resolve => {
  require.ensure(['../pages/home/home.vue'], () => {
    resolve(require('../pages/home/home.vue'))
  })
}

const routes = [{
  path: '/',
  name: 'Home',
  meta: {
    title: '首页'
  },
  component: Home,
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
