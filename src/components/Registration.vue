<template>
    <div id="login">
        <h3 class="text-center text-white pt-5">Registration form</h3>
        <div class="container">
            <div id="login-row" class="row justify-content-center align-items-center">
                <div id="login-column" class="col-md-6">
                    <div id="login-box" class="col-md-12" style="height:auto">
                        <form id="login-form" class="form" action="" method="post">
                            <h3 class="text-center text-info">Register</h3>
                            <div class="form-group">
                                <label for="username" class="text-info">Name:</label><br>
                                <input type="text"
                                       name="username"
                                       id="username"
                                       class="form-control"
                                       v-model="regForm.name">
                            </div>
                            <div class="form-group">
                                <label for="company" class="text-info">Company:</label><br>
                                <input type="text"
                                       name="company"
                                       id="company"
                                       class="form-control"
                                       v-model="regForm.company">
                            </div>
                            <div class="form-group">
                                <label for="email" class="text-info">Email:</label><br>
                                <input type="text"
                                       name="email"
                                       id="email"
                                       class="form-control"
                                       v-model="regForm.email">
                            </div>
                            <div class="form-group">
                                <label for="password" class="text-info">Password:</label><br>
                                <input type="text"
                                       name="password"
                                       id="password"
                                       class="form-control"
                                       v-model="regForm.password">
                            </div>
                            <div class="form-group">
                                <label for="remember-me" class="text-info text-right"><span>Remember me</span><span><input id="remember-me" name="remember-me" type="checkbox"></span></label><br>
                                <button class="btn btn-primary" @click.prevent="registerUser">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from'axios';

    export default {
        name: "Registration",

        data(){
            return{
                regForm:{
                    name:'',
                    company:'',
                    password:'',
                    email:''
                }
            }
        },
        methods:{
            registerUser(){
                Axios.post('http://app.test/api/createUser',this.regForm).then(function(response){
                    console.log(response);
                });
            }
        },
    }
</script>

<style scoped>
    body {
        margin: 0;
        padding: 0;
        background-color: #17a2b8;
        height: 100vh;
    }
    #login .container #login-row #login-column #login-box {
        margin-top: 120px;
        max-width: 600px;
        height: 320px;
        border: 1px solid #9C9C9C;
        background-color: #EAEAEA;
    }
    #login .container #login-row #login-column #login-box #login-form {
        padding: 20px;
    }
</style>