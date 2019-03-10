<template>
    <div>
        <app-header></app-header>
        <router-view> </router-view>

    </div>
</template>


<script>


    import todoGrid from './components/todo-grid';
    import header from './Header';
    import 'bootstrap/dist/css/bootstrap.css';

    export default {
        components: {

            todo: todoGrid,
            appHeader:header
        },
        created() {

        }
    };

</script>

<style>

</style>

