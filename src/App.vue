<template>
    <div>
        <app-header></app-header>
        <router-view> </router-view>

    </div>
</template>


<script>

    import header from './Header';


    export default {
        components: {
            appHeader:header
        },
        created() {

        }
    };

</script>

<style>

</style>

