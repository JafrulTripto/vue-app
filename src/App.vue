<template>
    <div>
        <div class="col-sm-6"></div>

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
            this.$toastr.error('Message', 'Title', {positionClass: "toast-bottom-right"});
        }
    };

</script>

<style>

</style>

