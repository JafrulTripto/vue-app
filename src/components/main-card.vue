<template>
    <div>
        <bModal id="myModal"
                v-model="show"
                title="Add To-Do"
                :hide-footer="true"
                :header-bg-variant="'info'"
                :header-text-variant="'light'"
                :body-bg-variant="'light'"
                :body-text-variant="'dark'"
        >

            <div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input v-if="!edits" class="form-control" type="text" id="title" placeholder="Add a title..." v-model="title"/>
                    <slot name="editTitle" v-else></slot>
                </div>
                <div class="form-group">
                    <label>Text</label>
                    <textarea v-if="!edits" class="form-control" v-model="description"></textarea>
                    <slot v-else name="editDescription"></slot>
                </div>
                <div class="form-group-sm">
                    <label for="start-date">Start date</label>
                    <datetime v-if="!edits" type="datetime" input-class="form-control" v-model="startDate" id="start-date"></datetime>
                    <slot name="editStartDate" v-else></slot>
                </div>
                <div class="form-group">
                    <label for="end-date">End date</label>
                    <datetime
                            v-if="!edits"
                            type="datetime"
                            input-class="form-control"
                            v-model="endDate"
                            id="end-date"
                            :min-datetime="minDatetime"
                            :format="{ month: 'short',day: 'numeric',year: 'numeric', hour: 'numeric', minute: '2-digit'}"
                    ></datetime>
                    <slot v-else name="editEndDate"></slot>
                </div>
            </div>
            <button v-if="!edits" type="button" class="btn btn-primary" @click="addMore">Save changes</button>
            <button v-else type="button" class="btn btn-primary" @click="update(id)">Save changes</button>
            <button type="button" class="btn btn-secondary" @click="show=false" >Close</button>
        </bModal>
    </div>

</template>

<script>

    import moment from 'moment';
    import Axios from'axios';


    export default {
        name: 'main-file',
        props:{
            formData:{},
            edits:{
                type:Boolean
            },
            id:{}
    },


        data: function () {
            return {
                startDate: '',
                endDate: '',
                title: '',
                description: '',
                minDatetime: '',
                show: false,
                hideFooter: true,
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
                let another = moment(newDateObj).toISOString();
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
                this.title='';
                this.description='';
                return this.show = false;

            },
                update(id){
                    let _this=this;
                    let  startDate= moment(_this.formData.start_time).format('YYYY-MM-DD HH:mm:ss');
                    let endDate= moment(_this.formData.end_time).format('YYYY-MM-DD HH:mm:ss');
                    let form={
                        title:_this.formData.title,
                        description:_this.formData.description,
                        start_time:startDate,
                        end_time:endDate
                    }
                Axios.put('http://app.test/api/todo/'+id,form).then(function(response){
                    _this.$store.state.lists = response.data.data;
                });
                _this.show=false;

             }



        },

        created() {

        }
    };
</script>

<style scoped>

</style>