import Vue from 'vue'
import App from './App.vue'
//import 'semantic-ui-vue'
// You need a specific loader for CSS files


import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(BootstrapVue);


import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'


import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)


window.toastr = require('toastr')

Vue.use(VueToastr2)

Vue.config.productionTip = false



new Vue({
    render: h => h(App),
}).$mount('#app')
