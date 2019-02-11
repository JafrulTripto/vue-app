<template>

    <div class="ui input focus">


        <div class="ui form" style="margin-bottom: 100px;">
            <input type="text" placeholder="Say something...." v-model="form.title"/>
            <div class="field">
                <label>Text</label>
                <textarea v-model="form.description"></textarea>
            </div>
            <div>
                <label for="start-date">Start date</label>
                <datetime type="datetime" v-model="form.startDate" id="start-date"></datetime>
                <label for="end-date">Start date</label>
                <datetime type="datetime" v-model="form.endDate" id="end-date"></datetime>

            </div>
            <div>
                <button class="negative ui button" @click.prevent="addMore()">Add more</button>
            </div>
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
                this.endDate='';
            }
        }
    };
</script>

<style scoped>

</style>