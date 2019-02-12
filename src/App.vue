<template>

            <div class="ui horizontal segments">

                <div class="ui segment">
                    <h2 class="ui right floated header">Add To-Do</h2>
                    <div class="ui clearing divider"></div>
                    <main-file @todoAdded="newTodo"></main-file>
                </div>
                        <todo :lists="lists"></todo>
                </div>
</template>

<script>


    const STORAGE_KEY = 'todo-app';
    import main from './components/main-card';
    import todoGrid from './components/todo-grid';
    import moment from 'moment'

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

                this.lists.push({
                    title: newParagraph.title,
                    description: newParagraph.description,
                    startDate: newParagraph.startDate,
                    endDate: newParagraph.endDate,
                    status: "On progress"
                });

                console.log(moment(newParagraph.startDate).format('MM-DD-YYYY, h:mm:ss a'));
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists));

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

