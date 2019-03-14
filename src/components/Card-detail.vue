<template>

    <tr>
        <td :class="status === 'Completed' ? 'text-success' : 'text-danger'">
            <slot name="title"></slot>
        </td>
        <td :class="status === 'Completed' ? 'text-success' : 'text-danger'">
            <slot name="description"></slot>
        </td>
        <td :class="status === 'Completed' ? 'text-success' : 'text-danger'">
            <slot name="start-date"></slot>
        </td>

        <td :class="status === 'Completed' ? 'text-success' : 'text-danger'">
            <slot name="end-date"></slot>
        </td>
        <td v-if="status=='Completed'" :class="status === 'Completed' ? 'text-success' : 'text-danger'">
            <h5>Task Finished</h5>
        </td>
        <td v-else-if="calculateCountdown()" :class="status === 'Completed' ? 'text-success' : 'text-danger'">
            <h5>Deadline over</h5>
        </td>
        <td v-else :class="status === 'Completed' ? 'text-success' : 'text-danger'">
            <countdown :time="endTimeMillisecond">
                <template slot-scope="props">{{ props.days}} days, {{ props.hours }} hours, {{
                    props.minutes }} minutes, {{ props.seconds }} seconds.
                </template>
            </countdown>
        </td>

        <td :class="status === 'Completed' ? 'text-success' : 'text-danger'">
            <div :class="status === 'Completed' ? 'badge badge-success':'badge badge-danger'">
                <slot name="status"></slot>
            </div>
        </td>
        <td :class="status === 'Completed' ? 'text-success' : 'text-danger'">
            <div class="button-div" v-if="status=== 'Completed'">
                <button class="btn btn-sm btn-danger action-buttons" @click.prevent="deleteTodo()">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="btn btn-sm btn-success " @click.stop="changeStatus()">
                    <i class="fas fa-check-square"></i>
                </button>
            </div>

            <div role="group" v-else class="button-div">
                <button class="btn btn-sm btn-danger action-buttons" @click.prevent="deleteTodo()">
                    <i class="fas fa-trash"></i>
                </button>
                <slot name="edit"></slot>
                <button class="btn btn-sm btn-success" @click.stop="changeStatus()">
                    <i class="fas fa-check-square"></i>
                </button>
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

    .action-buttons{
        margin-right: 10px;
    }
    .button-div{
        overflow-x: auto;
        display: inline-block;
    }
</style>




