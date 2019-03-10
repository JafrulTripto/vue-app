import Vue from 'vue';
import Vuex from'vuex';
import Axios from'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        lists: [],
        token:localStorage.getItem('access_token')||null
    },
    getters:{
        databaseRead: state => {
            Axios.get('http://app.test/api/todo').then(function(response){
                state.lists = response.data.data;
            });
        },
        loggedIN(state){
            return state.token!== null;
        },
        getToken(state){
            return state.token;
        }

    },
    mutations:{
        retrieveToken(state,token){
            state.token = token;
        },
        destroyToken(state){
            state.token = null;
        }
    },
    actions:{
        retrieveToken(context,credentials){
            return new Promise((resolve, reject) =>{
                Axios.post('http://app.test/api/login',credentials)
                    .then(function(response){
                        console.log(response);
                        const token = response.data.access_token;
                        localStorage.setItem('access_token',token);
                        context.commit('retrieveToken',token);
                        resolve(response);
                    })
                    .catch(error=>{
                        console.log(error);
                        reject(error);
                    })
            } )

        },
        destroyToken(context){
                if (context.getters.loggedIN) {
                    const token={
                        token:this.state.token
                    }
                    return new Promise((resolve, reject) =>{
                        Axios.post('http://app.test/api/auth/logout',token)
                            .then(function(response){
                                localStorage.removeItem('access_token');
                                context.commit('destroyToken');
                                resolve(response);
                            })
                            .catch(error=>{
                                localStorage.removeItem('access_token');
                                context.commit('destroyToken');
                                reject(error);
                            })
                    } )
                }
        }
    }
});