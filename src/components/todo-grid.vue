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
                    <button slot="edit" class="btn btn-info" v-b-modal="'myMainModal'" @click="clicked(index)">Edit</button>
                </new-element>
            </table>
            <main-element @todoAdded="newTodo"  :edits="edit">
                <input slot="editTitle" class="form-control" type="text" v-model="form.title"/>
                <textarea slot="editDescription" class="form-control" v-model="form.description"></textarea>
                <datetime
                        slot="editEndDate"
                        type="datetime"
                        input-class="form-control"
                        v-model="form.endDate"
                        id="end-date"
                        :min-datetime="minDatetime"
                        :format="{ month: 'short',day: 'numeric',year: 'numeric', hour: 'numeric', minute: '2-digit'}"
                ></datetime>
                <datetime slot="editStartDate" type="datetime" input-class="form-control" v-model="form.startDate" id="start-date"></datetime>
            </main-element>
        </div>
    </div>
</template>

<script>

    import card from './Card-detail';
    import main from './main-card';
    import swal from 'sweetalert';
    import moment from 'moment'

    const STORAGE_KEY = 'todo-app';

    export default {
        name: "todo-grid",
        components: {
            mainElement: main,
            newElement: card
        },
        data:
            function () {
                return {
                    lists: [],
                    show: true,
                    edit:false,
                    minDatetime:'',
                    index:'',
                    form: {
                        title: '',
                        description: '',
                        startDate: '',
                        endDate: '',
                        status: ''
                    },

                }
            },
        methods: {
            newTodo(newParagraph) {
                if (newParagraph.title && newParagraph.description && newParagraph.startDate && newParagraph.endDate != '') {
                    this.lists.push({
                        title: newParagraph.title,
                        description: newParagraph.description,
                        startDate: newParagraph.startDate,
                        endDate: newParagraph.endDate,
                        status: "On progress"
                    });

                    //console.log(moment(newParagraph.startDate).format('MM-DD-YYYY, h:mm:ss a'));
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists));
                    this.$toastr.success('New To-Do added', 'Message', {positionClass: "toast-bottom-right"});
                    return true;
                } else
                    return false;
        },
            clicked(id){
                this.edit=true;
                this.form.title = this.lists[id].title;
                this.form.description=this.lists[id].description;
                this.form.startDate=this.lists[id].startDate;
                this.form.endDate=this.lists[id].endDate;
                this.form.status=this.lists[id].status;
                this.lists.splice(id,1,this.form);
            },

        todoDeleted(key) {

            swal("Opps!!", "Are you sure?", "error")
                .then((value) => {
                    if (value) {
                        this.lists.splice(key, 1);
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists));
                        this.$toastr.error('Deleted!!!', 'Message', {positionClass: "toast-bottom-right"});
                    } else {
                        return false;
                    }
                });
        },

        statusChanged(key) {
            this.lists[key].status = 'Completed';
            this.$toastr.info('The task is completed!!!', 'Message', {positionClass: "toast-bottom-right"});
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists));
        },
        moment(dateTime) {
            return moment(dateTime).format('DD-MM-YYYY, h:mm:ss a')
        },


        },

        created() {
            this.lists = JSON.parse(localStorage.getItem(STORAGE_KEY) || []);
            console.log(this.edit);
        },
        watch:{
            startDate: function (val) {
                if (val == '') {

                    return false;
                }
                let newDateObj = moment(val).add(5, 'm').toDate();
                console.log(newDateObj);
                let another = moment(newDateObj).toISOString();
                console.log(another);
                this.minDatetime = another;
                return true;
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