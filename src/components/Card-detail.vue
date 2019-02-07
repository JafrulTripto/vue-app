<template>
    <div class="ui card">
        <div class="content">
            <i class="right floated like icon"></i>
            <i class="right floated star icon" @click="setName()" :style="{color:star}"></i>
            <div class="header">
                <slot></slot>
            </div>
            <div class="description">
               <p></p>
            </div>
        </div>
        <div class="extra content">
        <span class="left floated like">
          <i class="like icon"></i>
          Like
        </span>
            <span class="right floated star">
          <i class="star icon"></i>
          Favorite
        </span>
        </div>
    </div>
</template>

<script>
    export default {


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

        }

    };
</script>

<style>

</style>




