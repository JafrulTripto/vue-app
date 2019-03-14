<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">NavBar</b-navbar-brand>

            <b-navbar-toggle target="nav_collapse" />

            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item href="#">Home</b-nav-item>
                    <router-link v-if="loggedIn" class="nav-link" to="todoTable">To-Do Table</router-link>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <router-link v-if="!loggedIn" to="/" class="nav-link">Login</router-link>
                        <b-nav-item-dropdown v-else>
                            <!-- Using button-content slot -->
                            <template slot="button-content"><em>{{userName}}</em></template>
                            <b-dropdown-item href="#">Profile</b-dropdown-item>
                            <b-dropdown-item>
                                <router-link to="/logout">Sign out</router-link>
                            </b-dropdown-item>
                        </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return{

            }
        },
        computed:{
            loggedIn(){
                return this.$store.getters.loggedIN;
            },
            userName(){
                return this.$store.state.userData.userName;
            }
        }
    }
</script>

<style scoped>

</style>