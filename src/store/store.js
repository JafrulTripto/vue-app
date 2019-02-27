import Vue from 'vue';
import Vuex from'vuex';
import Axios from'axios';

Vue.use(Vuex);

export let store = new Vuex.Store({
    state:{
        lists: [],

    },
    getters:{
        databaseRead: state => {
            Axios.get('http://127.0.0.1:8000/api/todo').then(function(response){
                state.lists = response.data.data;
            });
            setTimeout(() => {
                console.log(state.lists);
            }, 1000)
        },

    }
});