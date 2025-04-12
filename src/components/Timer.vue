<template>
    <div v-if="timerVisible" class="timer">{{ timer }}</div>

    <button v-if="!isGuest && timerVisible" @click="startTimer" class="btn btn-secondary mt-4">{{isRunning ? 'Pause' : 'Start'}}</button>
    <button v-if="!isGuest" @click="(() => timerVisible = !timerVisible)" class="btn btn-secondary mt-4 mx-4"><i class="bi bi-eye"></i></button>
    <button v-if="!isGuest && timerVisible" @click="reset" class="btn btn-secondary mt-4 ">Reset</button>
</template>

<script>
export default {
    name: 'Timer',

    props: {
        isGuest: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            timer: '3:00',
            isRunning: false,
            timerVisible: true,
        }
    },
    mounted() {
        if (this.isRunning) {
            this.start();
        }
    },
    methods: {
        startTimer() {
            this.isRunning = !this.isRunning;
            if (this.isRunning) {
                this.start();
            } else {
                clearInterval(this.interval);
            }
        },
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        },
        start() {
            if (!this.remainingTime) {
            this.remainingTime = 240;
            }
            this.timer = this.formatTime(this.remainingTime);
            this.interval = setInterval(() => {
            this.remainingTime--;
            this.timer = this.formatTime(this.remainingTime);
            if (this.remainingTime <= 0) {
                clearInterval(this.interval);
                this.isRunning = false;
            }
            }, 1000);
        },
        reset() {
            if (!confirm('Are you sure you want to reset the timer?')) {
                return;
            }
            clearInterval(this.interval);
            this.remainingTime = 240;
            this.timer = this.formatTime(this.remainingTime);
            this.isRunning = false;
        }
    },
};

</script>

<style scoped>
    .timer {
        font-size: 60px; margin-top: 20px;
        font-family: dseg7classic;
    }
</style>