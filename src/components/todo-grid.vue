<template>
    <div>
        <!--<table border="1px solid black">-->
            <!--<thead>-->
            <!--<th>Title</th>-->
            <!--<th>Status</th>-->
            <!--<th>Action</th>-->
            <!--</thead>-->
            <!--<tbody>-->
            <!--<tr v-for="(card, index) in lists" :key="index">-->
                <!--<td>{{card.title}}</td>-->
                <!--<td></td>-->
                <!--<td></td>-->
            <!--</tr>-->
            <!--</tbody>-->
        <!--</table>-->
        <new-element v-for="(card, index) in lists" :keyindex="index" @deleteTodolist="todoDeleted">
            <h2 slot="title" >{{card.title}}</h2>
            <h5 slot="description">{{card.description}}</h5>
        </new-element>


    </div>
</template>

<script>

    import card from './Card-detail';
    export default {
        name: "todo-grid",
        props:['lists'],
        components:{
            newElement:card
        },
        methods:{
            todoDeleted(keyindex){
                this.lists.splice(keyindex,1);
                console.log('function worked'+this.index);

        }
        }
    }
</script>

<style scoped>

</style>