<template>
        <bModal id="myMainModal" @ok="addMore"
                v-model="show"
                title="Add To-Do"
                :header-bg-variant="'info'"
                :header-text-variant="'light'"
                :body-bg-variant="'light'"
                :body-text-variant="'dark'">

            <div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input class="form-control" type="text" id="title" placeholder="Add a title..." v-model="title"/>

                </div>

                <div class="form-group">
                    <label>Text</label>
                    <textarea class="form-control" v-model="description"></textarea>

                </div>
                <div class="form-group-sm">
                    <label for="start-date">Start date</label>
                    <datetime type="datetime" input-class="form-control" v-model="startDate" id="start-date"></datetime>

                </div>
                <div class="form-group">
                    <label for="end-date">End date</label>
                    <datetime
                            type="datetime"
                            input-class="form-control"
                            v-model="endDate"
                            id="end-date"
                            :min-datetime="minDatetime"
                            :format="{ month: 'short',day: 'numeric',year: 'numeric', hour: 'numeric', minute: '2-digit'}"
                    ></datetime>

                </div>
            </div>
        </bModal>


</template>

<script>

    import moment from 'moment'
    import 'bootstrap/dist/css/bootstrap.css';




    export default {
        name: 'main-file',


        data: function () {
            return {
                startDate: '',
                endDate: '',
                title:'',
                description:'',
                minDatetime: '',
                show:false,
                hideFooter:true,
                form: {
                    title: '',
                    description: '',
                    startDate: '',
                    endDate: '',

                }
            }
        },
        watch: {
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
        },

        methods: {
            addMore() {
                this.form.startDate = this.startDate;
                this.form.endDate = this.endDate;
                this.form.title = this.title;
                this.form.description = this.description;


                this.$emit('todoAdded', this.form);
                this.form.title = '';
                this.form.description = '';
                this.form.startDate = '';
                this.form.endDate = '';
                this.startDate = '';
                this.endDate = '';
                return this.show=false;
            },

            edit(){
                this.startDate=this.f
            }


        }
    };
</script>

<style scoped>

</style>