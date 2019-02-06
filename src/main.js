import Vue from 'vue'
import App from './App.vue'
import 'semantic-ui-vue'


Vue.config.productionTip = false

window.$ = window.jQuery = require('jquery')
require('semantic-ui-css/semantic.css')
require('semantic-ui-css/semantic.js')



new Vue({
  render: h => h(App),
}).$mount('#app')
