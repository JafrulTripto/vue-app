<template>
    <div>
        <todo></todo>
    </div>
</template>


<script>


    import todoGrid from './components/todo-grid';
    import 'bootstrap/dist/css/bootstrap.css';

    export default {
        components: {

            todo: todoGrid,
        },
        created() {

        }
    };

</script>

<style>

</style>

