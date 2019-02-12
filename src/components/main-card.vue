<template>

    <div>
        <div class="ui form" style="margin-bottom: 100px;">
                <div class="field">
                    <label for="title">Title</label>
                    <input type="text" id="title" placeholder="Add a title..." v-model="form.title"/>
                </div>

                <div class="field">
                    <label>Text</label>
                    <textarea v-model="form.description"></textarea>
                </div>
                <div class="field">
                    <label for="start-date">Start date</label>
                    <datetime type="datetime" v-model="form.startDate" id="start-date"></datetime>
                </div>
                <div class="field">
                    <label for="end-date">End date</label>
                    <datetime
                            type="datetime"
                            v-model="form.endDate"
                            id="end-date"
                            :format="{ month: 'long',day: 'numeric',year: 'numeric', hour: 'numeric', minute: '2-digit'}"
                    ></datetime>
                </div>


            </div>
            <div>
                <button class="negative ui button" @click.prevent="addMore()">Add To-Do</button>
            </div>
        </div>


</template>

<script>
    export default {
        name: 'main-file',

        data: function () {
            return {
                form: {
                    title:'',
                    description:'',
                    startDate:'',
                    endDate:''
                }
            }
        },

        methods: {
            addMore() {
                this.$emit('todoAdded', this.form);
                this.form.title = '';
                this.form.description = '';
                this.form.startDate='';
                this.form.endDate='';
            },


        }
    };
</script>

<style scoped>

</style>