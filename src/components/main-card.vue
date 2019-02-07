<template>

        <div class="ui input focus">


            <div class="ui form" style="margin-bottom: 100px;">
                <input type="text" placeholder="Say something...." v-model="newParagraph" />
                <div class="field">
                    <label>Text</label>
                    <textarea v-model="description"></textarea>
                </div>
            </div>


            <div>
                <button class="negative ui button" @click="addMore">Add more</button>
            </div>
        </div>
</template>

<script>



    export default {
        name: 'main-file',
        components:{

        },
        data:function(){
          return{


              newParagraph:'',
              description:''

          }
        },

        methods:{
            addMore(){
                this.$emit('todoAdded',this.newParagraph);
                this.newParagraph='';


            }

        },
        created(){

        }

    }
</script>

<style scoped>

</style>