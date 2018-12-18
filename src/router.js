import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./views/Home.vue')
const Register = () => import('./views/Register.vue')
const Login = () => import('./views/Login.vue')
const PlanToWatch = () => import('./views/PlanToWatch.vue')
const Watched = () => import('./views/Watched.vue')
const Search = () => import('./views/Search.vue')
const NotFound = () => import('./views/NotFound')

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'is-active',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/plan-to-watch',
      name: 'plan-to-watch',
      component: PlanToWatch
    },
    {
      path: '/watched',
      name: 'watched',
      component: Watched
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.onError((error) => {
  // Redirect 'Unauthorized' status code to 'Login' route
  if (error.response.status === 401) {
    router.push('login')
  }
})

export default router
