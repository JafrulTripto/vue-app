<template>
    <div class="container col-md-10">
        <div class="jumbotron">
            <h2 class="page-header float-right display-3">To-Do List</h2>
            <h2 class="page-header">Add To-Do</h2>
            <!-- Trigger the modal with a button -->
            <b-btn v-b-modal="'myModal'" class="btn-success">Add To-Do</b-btn>
        </div>

        <div style="margin-bottom: 30px">
            <form class="form-inline">
                <i class="fas fa-search" aria-hidden="true"></i>
                <input class="form-control form-control-sm ml-3 w-45"
                       type="text" placeholder="Search"
                       aria-label="Search" v-model="search">
            </form>
        </div>




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
                <tbody v-if="!searching">
                <new-element
                        v-for="(card, index) in $store.state.lists"
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
                    <button slot="edit" class="btn btn-info" v-b-modal="'myModal'" @click="clicked(index)">Edit</button>
                </new-element>
                </tbody>
                <tbody v-else>
                <new-element
                        v-for="(card, index) in tasks"
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
                    <button slot="edit" class="btn btn-info" v-b-modal="'myModal'" @click="clicked(index)">Edit</button>
                </new-element>
                </tbody>





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
</template>

<script>

    import card from './Card-detail';
    import main from './main-card';
    import swal from 'sweetalert';
    import moment from 'moment';

    const STORAGE_KEY = 'todo-app';

    export default {
        name: "todo-grid",
        components: {
            mainElement: main,
            newElement: card,
        },
        data:
            function () {
                return {
                    search:'',
                    show: true,
                    edit:false,
                    minDatetime:'',
                    index:'',
                    searching:false,
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
                    this.$store.state.lists.push({
                        title: newParagraph.title,
                        description: newParagraph.description,
                        startDate: newParagraph.startDate,
                        endDate: newParagraph.endDate,
                        status: "On progress"
                    });

                    //console.log(moment(newParagraph.startDate).format('MM-DD-YYYY, h:mm:ss a'));
                    this.$store.getters.setLocalStorage;
                    this.$toastr.success('New To-Do added', 'Message', {positionClass: "toast-bottom-right"});
                    return true;
                } else
                    return false;
        },
            clicked(id){
                this.show=true;
                this.edit=true;
                this.form.title =this.$store.state.lists[id].title;
                this.form.description=this.$store.state.lists[id].description;
                this.form.startDate=this.$store.state.lists[id].startDate;
                this.form.endDate=this.$store.state.lists[id].endDate;
                this.form.status=this.$store.state.lists[id].status;
                this.$store.state.lists.splice(id,1,this.form);
                console.log('hi')
            },

        todoDeleted(key) {

            swal("Opps!!", "Are you sure?", "error")
                .then((value) => {
                    if (value) {
                        this.$store.state.lists.splice(key, 1);
                        this.$store.getters.setLocalStorage;
                        this.$toastr.error('Deleted!!!', 'Message', {positionClass: "toast-bottom-right"});
                    } else {
                        return false;
                    }
                });
        },

        statusChanged(key) {
            this.$store.state.lists[key].status = 'Completed';
            this.$toastr.info('The task is completed!!!', 'Message', {positionClass: "toast-bottom-right"});
            this.$store.getters.setLocalStorage;
        },
        moment(dateTime) {
            return moment(dateTime).format('DD-MM-YYYY, h:mm:ss a')
        },


        },

        created() {
            this.$store.state.lists = JSON.parse(localStorage.getItem(STORAGE_KEY) || []);

        },
        computed:{
            tasks(){
                return this.$store.state.lists.filter(task => {
                    return task.title.toLowerCase().includes(this.search.toLowerCase())
                });
            }
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
            },
            search:function (val) {
                if (val==''){

                    return false;
                }
                else{
                    console.log(val);
                    return this.searching=true;
                }

            },
        }
    }
</script>

<style scoped>
    p {
        word-break: break-word;
        white-space: normal;
    }
</style>