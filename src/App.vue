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
          title:newParagraph.newParagraph,
          description:newParagraph.description
        });

        console.log("new to do ");
      }
    }

  };

  // :paragraph="newParagraph"
</script>

<style>

</style>

