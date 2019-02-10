<template>
  <div class="ui raised very padded text container segment">
    <h2 class="ui header">Writings</h2>
    <main-file @todoAdded="newTodo"></main-file>
    <todo :lists="lists"></todo>
  </div>

</template>

<script>

  import main from './components/main-card';
  import todoGrid from './components/todo-grid';
  export default {
    components:{
      mainFile:main,
      todo: todoGrid
    },
    data:function () {
      return{
          lists:[]
      }
    },
    methods:{
      newTodo(newParagraph){

        this.lists.push({
          title:newParagraph.title,
          description:newParagraph.description
        });
        console.log("newTodo function");

      },
      todoDeleted(keyIndex){
        this.lists.splice(keyIndex,1);
        console.log(keyIndex);
        console.log("function worked 1234")
      }
    }

  };

  // :paragraph="title"
</script>

<style>

</style>

