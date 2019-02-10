<template>
    <div class="ui card">
        <div class="content">
            <i class="right floated like icon" @click="deleteTodo()"></i>

            <div class="header">
                <slot name="title"></slot>
            </div>
            <div class="description">
               <slot name="description"></slot>
            </div>
        </div>
        <div class="extra content">

            <span class="right floated star" @click="setName()" :style="{color:star}">
          <i class="star icon"></i>
          Favorite
        </span>
        </div>
    </div>
</template>

<script>
    export default {

        props:['keyindex'],
        data: function () {
            return {
                star: '',
                isGreen: false,
                styles: 'stars',

            }
        },
        methods: {
            setName: function () {
                this.isGreen = !this.isGreen;
                if (this.isGreen) {
                    return this.star = '#f4bb4a';
                } else
                    return this.star = '';
            },
            deleteTodo:function () {
                this.$emit('deleteTodolist',this.keyindex);
                //console.log("function worked"+ this.keyIndex);
            }

        }

    };
</script>

<style>

</style>




