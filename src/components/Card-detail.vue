<template>
    <!--<div class="ui card">-->
        <!--<div class="content">-->
            <!--<i class="right floated close icon" @click="deleteTodo()" ></i>-->

            <!--<div class="header">-->
                <!--<slot name="title"></slot>-->
            <!--</div>-->
            <!--<div class="description">-->
                <!--<slot name="description"></slot>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="extra content">-->
            <!--<div>-->

                <!--<label for="start-date">Start's At:</label>-->
                <!--<slot name="start-date" id="start-date"></slot>-->
                <!--<label for="end-date">End's at:</label>-->
                <!--<slot name="end-date" id="end-date"></slot>-->
            <!--</div>-->
            <!--<span class="right floated star" @click="setName()" :style="{color:star}">-->
          <!--<i class="star icon"></i>-->
          <!--Favorite-->
        <!--</span>-->
        <!--</div>-->
    <!--</div>-->

            <tbody>
            <tr :class="status == 'done' ? 'positive' : 'negative'">
                <td>
                    <slot name="title"></slot>
                </td>
                <td>
                    <slot name="description"></slot>
                </td>
                <td>
                    <slot name="start-date"></slot>
                </td>

                <td>
                    <slot name="end-date"></slot>
                </td>
                <td>
                    <countdown :time="endTimeMillisecond">
                        <template slot-scope="props">Time Remaining：<br>{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds.</template>
                    </countdown>
                </td>
                <td>
                    <div :class="status == 'done' ? 'ui green horizontal label':'ui red horizontal label'"><slot name="status"></slot></div>
                </td>
                <td>
                    <div class="ui buttons">
                        <button class="ui negative button" @click.prevent="deleteTodo()">Delete</button>
                        <div class="or"></div>
                        <button class="ui positive button" @click.stop="changeStatus()">Done</button>
                    </div>
                </td>
            </tr>
            </tbody>


</template>

<script>
    import Vue from 'vue';
    import VueCountdown from '@chenfengyuan/vue-countdown';
    import moment from 'moment'
    Vue.component(VueCountdown.name, VueCountdown);
    export default {

        props:['keyIndex','status', 'endTime'],
        data: function () {
            return {
                star: '',
                isGreen: false,
                styles: 'stars',
                endTimeMillisecond: 0,

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
                this.$emit('deleteTodolist',this.keyIndex);

            },
            changeStatus:function(){
                this.$emit('changeStatus',this.keyIndex);

            },


            calculateCountdown(){
                    let now = moment(new Date());
                    let end = moment(this.endTime);
                    let duration = moment.duration(now.diff(end));
                    let milliseconds = duration.asMilliseconds();
                    this.endTimeMillisecond = Math.abs(milliseconds);
                    console.log(this.status);
                    return true;

            }



        },
        created(){
            this.calculateCountdown();
        }

    };
</script>

<style>

</style>




