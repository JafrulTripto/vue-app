<template>
  <div>
    <h1>To-Do</h1>
    <Todo :lists="lists"></Todo>

  </div>

</template>

<script>
  import card from './components/Card-detail';
  import main from './components/main-card';
  import todoGrid from './components/todo-grid';
  export default {
    components:{
      mainFile:main,
      cardDetail:card,
      todo: todoGrid
    },
    data:function () {
      return{
          lists:[]
      }
    },
    methods:{
      newCard(newParagraph){
        this.lists.push(newParagraph);
      }
    }

  };

  // :paragraph="newParagraph"
</script>

<style>

</style>

