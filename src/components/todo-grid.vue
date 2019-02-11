<template>
    <div>

        <div class="ui segment">
            <h2 class="ui right floated header">To-Do List</h2>
            <div class="ui clearing divider"></div>
            <table class="ui celled table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Start time</th>
                    <th>End Time</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
        <new-element v-for="(card, index) in lists" :keyIndex="index" @deleteTodolist="todoDeleted" @changeStatus="statusChanged">
            <h5 slot="title">{{card.title}}</h5>
            <h5 slot="description">{{card.description}}</h5>
            <h6 slot="start-date">{{card.startDate}}</h6>
            <h6 slot="end-date">{{card.endDate}}</h6>
            <h3 slot="status">{{card.status}}</h3>
        </new-element>
            </table>
        </div>


    </div>
</template>

<script>

    import card from './Card-detail';
    import swal from 'sweetalert';

    const STORAGE_KEY = 'todo-app';

    export default {
        name: "todo-grid",
        props: ['lists'],
        components: {
            newElement: card
        },
        methods: {
            todoDeleted(key) {

                swal("Click on either the button or outside the modal.")
                    .then((value) => {
                        if (value){
                            console.log(key);
                            this.lists.splice(key, 1);
                            localStorage.setItem(STORAGE_KEY,JSON.stringify(this.lists));
                        }
                        else{
                            return false;
                        }


                    });





            },
            statusChanged(key){
                this.lists[key].status='done';
                console.log(key);
            }
        }
    }
</script>

<style scoped>

</style>