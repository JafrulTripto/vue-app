<template>
    <div class="container col-md-10">
        <div class="jumbotron" >
            <h2 class="page-header float-right display-3 text-white">To-Do List</h2>
            <h2 class="page-header">Add To-Do</h2>
            <!-- Trigger the modal with a button -->
            <b-btn v-b-modal="'myModal'" class="btn-success" @click="edit=false">Add To-Do</b-btn>
        </div>

        <div style="margin-bottom: 30px">
            <form class="form">
                <div class="row justify-content-between">
                    <div class="col-4">
                        <div class="form-group">
                            <i class="fas fa-search" aria-hidden="true"></i>
                            <input class="form-control form-control-lg ml-3 w-45"
                                   type="text" placeholder="Search"
                                   aria-label="Search" v-model="search">
                        </div>
                    </div>
                    <div class="col-4 float-right">
                        <div class="form-group">
                            <select class="form-control form-control-lg"
                                    id="sel1"
                                    v-model="search_status">
                                <option value="">Select Status</option>
                                <option value="On progress">On Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <table class="table table-hover">
            <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>User</th>
                <th>Start time</th>
                <th>End Time</th>
                <th>Remaining Time</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <new-element
                    v-for="(card, index) in tasks"
                    :keyIndex="index"
                    :status="card.status"
                    :endTime="card.end_time"
                    @deleteTodolist="todoDeleted"
                    @changeStatus="statusChanged">

                <h5 slot="title">{{card.title}}</h5>
                <p slot="description">{{card.description}}</p>
                <h5 slot="user_name">{{card.user_name}}</h5>
                <h6 slot="start-date">{{moment(card.start_time)}}</h6>
                <h6 slot="end-date">{{moment(card.end_time)}}</h6>
                <h6 slot="status">{{card.status}}</h6>
                <button slot="edit"
                        class="btn btn-info"
                        v-b-modal="'myModal'"
                        @click="clicked(index)">Edit
                </button>
            </new-element>
            </tbody>
        </table>

        <main-element @todoAdded="newTodo" :edits="edit" :formData="form" :id="form.id" >
            <input slot="editTitle" class="form-control" type="text" v-model="form.title"/>
            <textarea slot="editDescription" class="form-control" v-model="form.description"></textarea>
            <datetime slot="editEndDate"
                      type="datetime"
                      input-class="form-control"
                      v-model="form.end_time"
                      id="end-date"
                      :min-datetime="minDatetime"
                      :format="{ month: 'short',day: 'numeric',year: 'numeric', hour: 'numeric', minute: '2-digit'}"
            ></datetime>
            <datetime slot="editStartDate"
                      type="datetime"
                      input-class="form-control"
                      v-model="form.start_time"
                      id="start-date">

            </datetime>
        </main-element>

    </div>
</template>

<script>

    import card from './Card-detail';
    import main from './main-card';
    import swal from 'sweetalert';
    import moment from 'moment';
    import Axios from'axios';





    export default {
        name: "todo-grid",
        components: {
            mainElement: main,
            newElement: card,

        },
        data:
            function () {
                return {
                    option: false,
                    search: '',
                    search_status:'',
                    login:false,
                    show: true,
                    edit: false,
                    minDatetime: '',
                    index:'',
                    searching: false,
                    form: {
                        id:'',
                        title: '',
                        description: '',
                        start_time: '',
                        end_time: '',
                    },


                }
            },
        methods: {
            newTodo(newParagraph) {
                console.log(this.edit);
                let _this = this;
                let userName= this.$store.state.userData.userName;
                if (newParagraph.title && newParagraph.description && newParagraph.startDate && newParagraph.endDate != '') {
                    _this.$store.state.lists.push({
                        user_name:userName,
                        title: newParagraph.title,
                        description: newParagraph.description,
                        start_time: newParagraph.startDate,
                        end_time: newParagraph.endDate,
                        status: "On progress"
                    });
                    let  startDate= moment(newParagraph.startDate).format('YYYY-MM-DD HH:mm:ss');
                    let endDate= moment(newParagraph.endDate).format('YYYY-MM-DD HH:mm:ss');
                    let form={
                        user_name:userName,
                        token:this.$store.getters.getToken,
                        title:newParagraph.title,
                        description:newParagraph.description,
                        startDate:startDate,
                        endDate:endDate,
                        status:'On progress'
                    };
                    Axios.post('http://app.test/api/todo',form).then(function(response){
                       _this.$store.state.lists = response.data.data;
                    });
                    _this.$toastr.success('New To-Do added', 'Message', {positionClass: "toast-bottom-right"});
                    return true;
                } else{

                    return false;
                }


            },
            clicked(id) {
                this.show = true;
                this.edit = true;
                let startDate= moment(this.$store.state.lists[id].start_time).format();
                let endDate= moment(this.$store.state.lists[id].end_time).format();
                this.form.id = this.$store.state.lists[id].id;
                this.form.title = this.$store.state.lists[id].title;
                this.form.description = this.$store.state.lists[id].description;
                this.form.start_time =startDate;
                this.form.end_time = endDate;
            },

            todoDeleted(key) {
                let _this = this;
                swal("Opps!!", "Are you sure?", "error")
                    .then((value) => {
                        if (value) {
                            let id = _this.$store.state.lists[key].id;
                            Axios.delete('http://app.test/api/todo/'+id+'?token='+this.$store.getters.getToken)
                                .then(function(response){
                                _this.$store.state.lists.splice(key, 1);
                                _this.$store.state.lists = response.data.data;
                            });

                            _this.$toastr.error('Deleted!!!', 'Message', {positionClass: "toast-bottom-right"});
                        } else {
                            return false;
                        }
                    });
            },

            statusChanged(key) {
                let _this = this;
                _this.$store.state.lists[key].status == 'Completed'?_this.$store.state.lists[key].status='On progress':_this.$store.state.lists[key].status='Completed';
                let form={
                    token:this.$store.getters.getToken,
                    status:_this.$store.state.lists[key].status
                }
                _this.$toastr.info('The task is completed!!!', 'Message', {positionClass: "toast-bottom-right"});
                Axios.post('http://app.test/api/update_status/'+ this.$store.state.lists[key].id,form).then(function(response){

                });
            },
            moment(dateTime) {
                return moment(dateTime).format('DD-MM-YYYY, h:mm:ss a')
            },

        },

        created() {
            this.$store.getters.databaseRead;
            console.log(this.login);


        },
        computed: {
            tasks() {
                let _this = this;
                return _this.$store.state.lists.filter(task => {
                    if (_this.search) {
                        return task.title.toLowerCase().includes(_this.search.toLowerCase())
                    }else
                        return true;
                }).filter(task => {
                    if (_this.search_status){
                        return task.status === _this.search_status;
                    } else{
                        return true;
                    }
                });
            },
        },
        watch: {
            startDate: function (val) {
                if (val == '') {

                    return false;
                }
                let newDateObj = moment(val).add(5, 'm').toDate();
                let another = moment(newDateObj).toISOString();
                this.minDatetime = another;
                return true;
            },
        }
    }
</script>

<style scoped>
    p {
        word-break: break-word;
        white-space: normal;
    }
    .jumbotron{
        background-image: url("../assets/background.jpg");
        background-size: cover;
        height: 100%;
    }
</style>