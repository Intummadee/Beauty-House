import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import { fab } from '@fortawesome/free-brands-svg-icons'

import 'bulma/css/bulma.css'



import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
Vue.component('iconComponent', FontAwesomeIcon)



import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
