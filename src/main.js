import Vue from 'vue'
import App from './App.vue'
//import 'semantic-ui-vue'
import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

import BootstrapVue from 'bootstrap-vue'




Vue.use(BootstrapVue);

Vue.use(Datetime);

Vue.config.productionTip = false

window.$ = window.jQuery = require('jquery')
require('semantic-ui-css/semantic.css')
require('semantic-ui-css/semantic.js')



new Vue({
  render: h => h(App),
}).$mount('#app')
