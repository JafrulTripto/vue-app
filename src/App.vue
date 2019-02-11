
<template>
  <div class="ui raised very padded text container segment">
    <h1 class="ui header">To-Do app</h1>
    <main-file @todoAdded="newTodo"></main-file>
    <todo :lists="lists"></todo>

  </div>

</template>

<script>



  const STORAGE_KEY = 'todo-app';
  import main from './components/main-card';
  import todoGrid from './components/todo-grid';
  import moment from 'moment'
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
          description:newParagraph.description,
          startDate: moment(newParagraph.startDate).format('MMMM Do YYYY, h:mm:ss a'),
          endDate: moment(newParagraph.endDate).format('MMMM Do YYYY, h:mm:ss a'),
          status:"On progress"
        });



        localStorage.setItem(STORAGE_KEY,JSON.stringify(this.lists));

      }
    },

    created() {
      this.lists=JSON.parse(localStorage.getItem(STORAGE_KEY)||[]);
    }

  };

  // :paragraph="title"
</script>

<style>

</style>

