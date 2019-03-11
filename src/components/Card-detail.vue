<template>

    <tr>
        <td :class="status === 'Completed' ? 'alert alert-success' : 'alert alert-danger'">
            <slot name="title"></slot>
        </td>
        <td :class="status === 'Completed' ? 'alert alert-success' : 'alert alert-danger'">
            <slot name="description"></slot>
        </td>
        <td :class="status === 'Completed' ? 'alert alert-success' : 'alert alert-danger'">
            <slot name="user_name"></slot>
        </td>
        <td :class="status === 'Completed' ? 'alert alert-success' : 'alert alert-danger'">
            <slot name="start-date"></slot>
        </td>

        <td :class="status === 'Completed' ? 'alert alert-success' : 'alert alert-danger'">
            <slot name="end-date"></slot>
        </td>
        <td v-if="status=='Completed'" :class="status === 'Completed' ? 'alert alert-success' : 'alert alert-danger'">
            <h5>Task Finished</h5>
        </td>
        <td v-else-if="calculateCountdown()" :class="status === 'Completed' ? 'alert alert-success' : 'alert alert-danger'">
            <h5>Deadline over</h5>
        </td>
        <td v-else :class="status === 'Completed' ? 'alert alert-success' : 'alert alert-danger'">
            <countdown :time="endTimeMillisecond">
                <template slot-scope="props">Time Remaining<br>{{ props.days}} days, {{ props.hours }} hours, {{
                    props.minutes }} minutes, {{ props.seconds }} seconds.
                </template>
            </countdown>
        </td>

        <td :class="status === 'Completed' ? 'alert alert-success' : 'alert alert-danger'">
            <div :class="status === 'Completed' ? 'badge badge-success':'badge badge-danger'">
                <slot name="status"></slot>
            </div>
        </td>
        <td :class="status === 'Completed' ? 'alert alert-success' : 'alert alert-danger'">
            <div class="btn-group" role="group" aria-label="Basic example" v-if="status=== 'Completed'">
                <button class="btn btn-danger" @click.prevent="deleteTodo()">Delete</button>
                <button class="btn btn-success" @click.stop="changeStatus()">Done</button>
            </div>

            <div class="btn-group" role="group" v-else>
                <button class="btn btn-danger" @click.prevent="deleteTodo()">Delete</button>
                <button class="btn btn-success" @click.stop="changeStatus()">Done</button>
                <slot name="edit"></slot>
            </div>
        </td>
    </tr>



</template>

<script>
    import Vue from 'vue';
    import VueCountdown from '@chenfengyuan/vue-countdown';
    import moment from 'moment';

    Vue.component(VueCountdown.name, VueCountdown);

    export default {

        props: ['keyIndex', 'status', 'endTime'],
        data: function () {
            return {
                star: '',
                isGreen: false,
                styles: 'stars',
                endTimeMillisecond: 0,
            }
        },
        methods: {

            deleteTodo: function () {
                this.$emit('deleteTodolist', this.keyIndex);
            },
            changeStatus: function () {
                this.$emit('changeStatus', this.keyIndex);
            },

            calculateCountdown() {
                let now = moment(new Date());
                let end = moment(this.endTime);
                let duration = moment.duration(now.diff(end));

                let milliseconds = duration.asMilliseconds();
                if (duration.asMilliseconds() > 0) {
                    return true;
                } else {
                    this.endTimeMillisecond = Math.abs(milliseconds);
                    return false;
                }
            }
        },
        created() {

            this.calculateCountdown();
        }
    };
</script>

<style>

</style>




