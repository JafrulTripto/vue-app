<template>
    <div>
        <div class="ui clearing divider"></div>
        <main-file @todoAdded="newTodo"></main-file>

        <todo :lists="lists"></todo>
        <vue-toastr ref="toastr">hi</vue-toastr>
    </div>
</template>

<script>


    const STORAGE_KEY = 'todo-app';
    import main from './components/main-card';
    import todoGrid from './components/todo-grid';
    import moment from 'moment'
    import 'bootstrap/dist/css/bootstrap.css'



    export default {
        components: {
            mainFile: main,
            todo: todoGrid
        },
        data: function () {
            return {
                lists: []
            }
        },
        methods: {
            newTodo(newParagraph) {
                if (newParagraph.title && newParagraph.description && newParagraph.startDate&& newParagraph.endDate !='') {
                    this.lists.push({
                        title: newParagraph.title,
                        description: newParagraph.description,
                        startDate: newParagraph.startDate,
                        endDate: newParagraph.endDate,
                        status: "On progress"
                    });

                    //console.log(moment(newParagraph.startDate).format('MM-DD-YYYY, h:mm:ss a'));
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists));
                    this.$toastr.e("ERRROR MESSAGE");
                    return true;
                }
                else
                    return false;

            }
        },

        created() {
            this.lists = JSON.parse(localStorage.getItem(STORAGE_KEY) || []);
        }

    };

    // :paragraph="title"
</script>

<style>

</style>

