import './styles/bulma_custom.scss'
import 'animate.css'
import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import router from './router'
import { toName, toYear } from './filters'

Vue.filter('toName', toName)
Vue.filter('toYear', toYear)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

// import helpers from './helpers'

// const plugin = {
//     install () {
//         Vue.helpers = helpers
//         Vue.prototype.$helpers = helpers
//     }
// }

// Vue.use(plugin)
