import Vue from 'vue';
import Vuex from'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        lists: [],
        STORAGE_KEY:'todo-app'
    },
    getters:{
        setLocalStorage: state => {
            return localStorage.setItem(state.STORAGE_KEY, JSON.stringify(state.lists));

        }
    }
});