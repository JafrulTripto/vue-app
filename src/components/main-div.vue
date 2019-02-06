<template>
    <div class="ui raised very padded text container segment">
        <h2 class="ui header">Writings</h2>
        <div class="ui input focus">
            <input type="text" placeholder="Search..." />
        </div>
        <card-detail></card-detail>
        <card-detail></card-detail>
        <card-detail></card-detail>
        <card-detail></card-detail>
        <h1>hell</h1>
    </div>
</template>

<script>
    import card from './my-components'
    export default {
        components:{
            'card-detail':card
        }

    }
</script>

<style scoped>

</style>