import Vue from 'vue';
import Vuex from'vuex';
import Axios from'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        lists: [],
        userData: JSON.parse(localStorage.getItem('user_data'))
    },
    getters:{
        databaseRead: state => {

            Axios.get('http://app.test/api/todo?token='+state.userData.token).then(function(response){
                state.lists = response.data.data;
            });
        },
        loggedIN(state){
            if (!state.userData || !state.userData.token)
                return null;

            return true;
        },
        getToken(state){
            return state.userData.token;
        }

    },
    mutations:{
        retrieveUserData(state,user_Data){
            state.userData = user_Data;

        },
        destroyToken(state){
            state.userData.token = null;
        }
    },
    actions:{
        retrieveUserData(context,credentials){
            return new Promise((resolve, reject) =>{
                Axios.post('http://app.test/api/login',credentials)
                    .then(function(response){

                        let user_Data = {
                            token:response.data.access_token,
                            user_id:response.data.user.id,
                            userName:response.data.user.name
                        };
                        localStorage.setItem('user_data',JSON.stringify(user_Data));
                        context.commit('retrieveUserData',user_Data);
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
                        token:this.state.userData.token
                    }
                    return new Promise((resolve, reject) =>{
                        Axios.post('http://app.test/api/auth/logout',token)
                            .then(function(response){
                                localStorage.removeItem('user_data');
                                context.commit('destroyToken');
                                resolve(response);
                            })
                            .catch(error=>{
                                localStorage.removeItem('user_data');
                                context.commit('destroyToken');
                                reject(error);
                            })
                    } )
                }
        }
    }
});