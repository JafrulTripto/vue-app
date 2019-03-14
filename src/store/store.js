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
                return state.lists;
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
        },
        setTodoList(state,todo){
            state.lists = todo.data.data;
        }
    },
    actions:{
        retrieveUserData(context,credentials){
            return new Promise((resolve, reject) =>{
                Axios.post('http://safaratodo.us-east-1.elasticbeanstalk.com/api/login',credentials)
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
                        Axios.post('http://safaratodo.us-east-1.elasticbeanstalk.com/api/auth/logout',token)
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
        },
        setTodoList(context){
            console.log(this.state.userData.token);
            if (context.getters.loggedIN){
                return new Promise((resolve, reject)=>{
                    Axios.get('http://safaratodo.us-east-1.elasticbeanstalk.com/api/todo?token='+this.state.userData.token)
                        .then(function (response) {
                            context.commit('setTodoList',response);
                            console.log(response);
                            resolve(response);
                        })
                        .catch(error=>{
                            reject(error);
                        })
                })
            }
        }
    },


});