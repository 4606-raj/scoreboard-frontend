<template>
    <div class="timer">{{ timer }}</div>

    <button v-if="!isGuest" @click="startTimer" class="btn btn-secondary mt-4">{{isRunning ? 'Stop' : 'Start'}}</button>
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
            timer: '4:00',
            isRunning: false,
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
            let time = 240;
            this.timer = this.formatTime(time);
            this.interval = setInterval(() => {
                time--;
                this.timer = this.formatTime(time);
                if (time <= 0) {
                    clearInterval(this.interval);
                    this.isRunning = false;
                }
            }, 1000);
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