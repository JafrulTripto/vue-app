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
        <new-element v-for="(card, index) in lists" :key="index" @deleteTodolist="todoDeleted">
            <h2 slot="title">{{card.title}}</h2>
            <h5 slot="description">{{card.description}}</h5>
            <h6 slot="start-date">{{card.startDate}}</h6>
            <h6 slot="end-date">{{card.endDate}}</h6>

        </new-element>


    </div>
</template>

<script>

    import card from './Card-detail';

    const STORAGE_KEY = 'todo-app';

    export default {
        name: "todo-grid",
        props: ['lists'],
        components: {
            newElement: card
        },
        methods: {
            todoDeleted(key) {
                this.lists.splice(key, 1);
                localStorage.setItem(STORAGE_KEY,JSON.stringify(this.lists));

            }
        }
    }
</script>

<style scoped>

</style>