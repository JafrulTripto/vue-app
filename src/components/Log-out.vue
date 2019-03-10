<template>
    
</template>

<script>
    export default {
        name: "Log-out",
        created() {
            this.$store.dispatch('destroyToken')
                .then(response=>{
                    this.$router.push({path:'/login'});
                });
        }

    }
</script>

<style scoped>

</style>