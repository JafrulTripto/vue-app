<template>

    <div class="ui segment">
            <h2 class="ui right floated header">To-Do List</h2>
        <h2 class="ui left floated header">Add To-Do</h2>
        <!-- Trigger the modal with a button -->
        <b-btn v-b-modal="'myMainModal'">Add To-Do</b-btn>
            <div class="ui clearing divider"></div>
            <table class="ui celled table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Start time</th>
                    <th>End Time</th>
                    <th>Remaining Time</th>
                    <th>Status</th>
                    <th>Action</th>

                </tr>
                </thead>
        <new-element
                v-for="(card, index) in lists"
                :keyIndex="index"
                :status="card.status"
                :endTime="card.endDate"
                @deleteTodolist="todoDeleted"
                @changeStatus="statusChanged">

            <h3 slot="title">{{card.title}}</h3>
            <h6 slot="description">{{card.description}}</h6>
            <h5 slot="start-date">{{moment(card.startDate)}}</h5>
            <h5 slot="end-date">{{moment(card.endDate)}}</h5>
            <h4 slot="status">{{card.status}}</h4>
        </new-element>
            </table>
        </div>
</template>

<script>

    import card from './Card-detail';
    import swal from 'sweetalert';
    import moment from 'moment'

    const STORAGE_KEY = 'todo-app';

    export default {
        name: "todo-grid",
        props: ['lists'],
        components: {
            newElement: card
        },
        methods: {
            todoDeleted(key) {

                swal("Opps!!", "Are you sure?", "error")
                    .then((value) => {
                        if (value){
                            this.lists.splice(key, 1);
                            localStorage.setItem(STORAGE_KEY,JSON.stringify(this.lists));
                            swal("Successfully","Deleted","success");
                        }
                        else{

                            return false;
                        }
                    });
            },
            statusChanged(key){
                this.lists[key].status='done';
                localStorage.setItem(STORAGE_KEY,JSON.stringify(this.lists));
            },

            moment(dateTime){
                return moment(dateTime).format('MM-DD-YYYY, h:mm:ss a')
            }
        }
    }
</script>

<style scoped>

</style>