<template>
    <!--<nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <router-link v-if="loggedIn" class="nav-link" to="todoTable">To-Do Table</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item my-2 my-sm-0" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
                <li class="nav-item" v-if="loggedIn">
                    <a class="nav-link disabled" href="#">{{userName}}</a>
                </li>
                <li class="nav-item my-2 my-sm-0">
                    <router-link v-if="!loggedIn" class="nav-link" to="/">Log in</router-link>
                    <router-link v-else class="nav-link pull-right" to="/logout">Log out</router-link>
                </li>
            </ul>
        </div>
    </nav>-->

    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">NavBar</b-navbar-brand>

            <b-navbar-toggle target="nav_collapse" />

            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item href="#">Link</b-nav-item>
                    <b-nav-item href="#" disabled>Disabled</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item-dropdown right>
                        <!-- Using button-content slot -->
                        <template slot="button-content"><em>User</em></template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Signout</b-dropdown-item>
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