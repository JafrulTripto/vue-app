<template>
    <div class="ui raised very padded text container segment">
        <h2 class="ui header">Writings</h2>
        <div class="ui input focus">
            <input type="text" placeholder="Search..." v-model="newParagraph" />
            <div>
                <button class="negative ui button" @click="changeName">Press Me</button>
            </div>
        </div>

        <card-detail :heading="heading" :paragraph="newParagraph"></card-detail>
        <card-detail></card-detail>
        <card-detail></card-detail>
        <card-detail></card-detail>
        <card-detail></card-detail>
        <h1>hell</h1>
    </div>
</template>

<script>
    import card from './Card-detail'
    export default {

        data:function(){
          return{
              heading:'Hi Tripto',
              newParagraph:''
          }
        },

        methods:{
            changeName(){
                this.heading = 'hello Tripto';
            }

        },
        components:{
            'card-detail':card
        }

    }
</script>

<style scoped>

</style>