<template>
    <div>
        <div class="col-sm-6"></div>
        <main-file @todoAdded="newTodo"></main-file>
        <todo :lists="lists"></todo>

    </div>
</template>

<script>


    const STORAGE_KEY = 'todo-app';
    import main from './components/main-card';
    import todoGrid from './components/todo-grid';

    import 'bootstrap/dist/css/bootstrap.css';



    export default {
        components: {
            mainFile: main,
            todo: todoGrid,
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
                    this.$toastr.success('New To-Do added', 'Message',{positionClass: "toast-bottom-right"});

                    return true;
                }
                else
                    return false;

            }
        },

        created() {
            this.lists = JSON.parse(localStorage.getItem(STORAGE_KEY) || []);
            this.$toastr.error('Message', 'Title',{positionClass: "toast-bottom-right"});
        }

    };

</script>

<style>

</style>

