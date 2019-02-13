<template>
        <bModal id="myMainModal" @ok="addMore"
                v-model="show"
                title="Add To-Do"
                :header-bg-variant="'info'"
                :header-text-variant="'light'"
                :body-bg-variant="'light'"
                :body-text-variant="'warning'">

            <div class="ui form" style="margin-bottom: 100px;">
                <div class="field">
                    <label for="title">Title</label>
                    <input type="text" id="title" placeholder="Add a title..." v-model="title"/>
                    <div v-if="!title" class="ui pointing red basic label">
                        Please enter a value
                    </div>
                </div>

                <div class="field">
                    <label>Text</label>
                    <textarea v-model="description"></textarea>
                    <div v-if="!description" class="ui pointing red basic label">
                        Please enter a value
                    </div>
                </div>
                <div class="field">
                    <label for="start-date">Start date</label>
                    <datetime type="datetime" v-model="startDate" id="start-date"></datetime>
                    <div v-if="!startDate" class="ui pointing red basic label">
                        Please enter a value
                    </div>

                </div>
                <div class="field">
                    <label for="end-date">End date</label>
                    <datetime
                            type="datetime"
                            v-model="endDate"
                            id="end-date"
                            :min-datetime="minDatetime"
                            :format="{ month: 'short',day: 'numeric',year: 'numeric', hour: 'numeric', minute: '2-digit'}"
                    ></datetime>
                    <div v-if="!endDate" class="ui pointing red basic label">
                        Please enter a value
                    </div>
                </div>
            </div>
        </bModal>


</template>

<script>

    import moment from 'moment'
    import 'bootstrap/dist/css/bootstrap.css'



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
                if (val==''){

               return false;
                }
                let newDateObj = moment(val).add(5, 'm').toDate();
                console.log(val);
               // console.log(newDateObj);
                let another = moment(newDateObj).toISOString();
                //console.log(another);
                this.minDatetime = another;
                return true;
            },
            endDate(val){
                if (val==''){
                    return true
                }
                else
                    return false;
            },
            title(val){
                if (val==''){
                    return true
                }
                else
                    return false;
            },
            description(val){
                if (val==''){
                    return true
                }
                else
                    return false;
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


        }
    };
</script>

<style scoped>

</style>