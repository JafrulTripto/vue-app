<template>
<div class="container col-md-10">
    <div class="jumbotron">
            <h2 class="page-header float-right display-3">To-Do List</h2>
        <h2 class="page-header">Add To-Do</h2>
        <!-- Trigger the modal with a button -->
        <b-btn v-b-modal="'myMainModal'" class="btn-success">Add To-Do</b-btn>
    </div>
    <div class="col-lg-12">
        <table class="table table-hover">
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

                <h5 slot="title">{{card.title}}</h5>
                <p slot="description">{{card.description}}</p>
                <h6 slot="start-date">{{moment(card.startDate)}}</h6>
                <h6 slot="end-date">{{moment(card.endDate)}}</h6>
                <h6 slot="status">{{card.status}}</h6>
                <button slot="edit"></button>
            </new-element>
        </table>
    </div>

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
                            this.$toastr.error('Deleted!!!', 'Message',{positionClass: "toast-bottom-right"});
                        }
                        else{

                            return false;
                        }
                    });
            },
            statusChanged(key){
                this.lists[key].status='Completed';
                this.$toastr.info('The task is completed!!!', 'Message',{positionClass: "toast-bottom-right"});
                localStorage.setItem(STORAGE_KEY,JSON.stringify(this.lists));
            },

            moment(dateTime){
                return moment(dateTime).format('DD-MM-YYYY, h:mm:ss a')
            }
        }
    }
</script>

<style scoped>
    p {
        word-break: break-word;
        white-space: normal;
    }
</style>