<template>

    <div class="ui input focus">


        <div class="ui form" style="margin-bottom: 100px;">
            <input type="text" placeholder="Say something...." v-model="form.title"/>
            <div class="field">
                <label>Text</label>
                <textarea v-model="form.description"></textarea>
            </div>
        </div>


        <div>
            <button class="negative ui button" @click.prevent="addMore()">Add more</button>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'main-file',
        components: {},
        data: function () {
            return {
                form: {
                    title:'',
                    description:''
                }
            }
        },

        methods: {
            addMore() {
                this.$emit('todoAdded', this.form);
                this.form.title = '';
                this.form.description = '';
            }
        }
    };
</script>

<style scoped>

</style>