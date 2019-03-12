import Vue from 'vue'
import App from './App.vue'
//import 'semantic-ui-vue'
// You need a specific loader for CSS files


import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);


import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'


import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

Vue.use(Datetime)


window.toastr = require('toastr')
Vue.use(VueToastr2)

import {store} from "./store/store";

Vue.config.productionTip = false

import { routes } from './Routes';

Vue.use(VueRouter);

const router = new VueRouter({
    routes
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.loggedIN) {
            next({

                name:'login',
            })
        } else {
            next()
        }
    }
    else if (to.matched.some(record => record.meta.requiresVisitor)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (store.getters.loggedIN) {
            next({
                path:'/todoTable',
            })
        } else {
            next()
        }
    }
    else {
        next() // make sure to always call next()!
    }
})

new Vue({
    store,router,
    render: h => h(App),
}).$mount('#app')
