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
                <!--<td>{{card.newParagraph}}</td>-->
                <!--<td></td>-->
                <!--<td></td>-->
            <!--</tr>-->
            <!--</tbody>-->
        <!--</table>-->
        <new-element v-for="(card, index) in lists" :key="index">{{card.title}}</new-element>
        <new-element v-for="(card, index) in lists" :key="index">{{card.description}}</new-element>
    </div>
</template>

<script>

    import card from './Card-detail';
    export default {
        name: "todo-grid",
        props:['lists'],
        components:{
            newElement:card
        }
    }
</script>

<style scoped>

</style>