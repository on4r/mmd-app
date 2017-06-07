import Vue          from 'vue'
import VueRouter    from 'vue-router'
import Bootstrap    from 'bootstrap'
import BootstrapCSS from 'bootstrap/dist/css/bootstrap.min.css'

// Load Components:
import App          from './App.vue'
import Movie        from './Movie.vue'
import MovieSearch  from './MovieSearch.vue'
import PlanToWatch  from './PlanToWatch.vue'
import Watched      from './Watched.vue'

Vue.component("movie", Movie);

// Enable the vue-router plugin
Vue.use(VueRouter);

var routes = [
  {
    path: "/",
    component: MovieSearch },
  {
    path: "/plan-to-watch",
    component: PlanToWatch
  },
  {
    path: "/watched",
    component: Watched
  }
];

var router = new VueRouter({
  routes: routes
});

var app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

