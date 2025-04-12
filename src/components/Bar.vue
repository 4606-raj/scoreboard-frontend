<template>
    <div @click="select" class="bar" :style="barStyle"></div>
</template>

<script>
export default {
    props: {
        bg: {
            type: String,
            required: true
        },
        teamId: {
            type: Number,
            required: true
        },
        isGuest: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            barStyle: {
                backgroundColor: this.bg,
                width: '100%',
                height: '20px',
                borderRadius: '10px',
                marginTop: '20px',
            },
            selected: false
        };
    },
    methods: {
        select() {
            if (this.isGuest) {
                return;
            }
            this.selected = !this.selected;
            if (this.selected) {
                this.barStyle.boxShadow = '0 0 10px 5px' + this.bg;
            } else {
                this.barStyle.boxShadow = 'none';
            }
            this.$emit('warning', this.teamId, this.bg);
        }
    },
};
</script>

<style>
.bar {
    cursor: pointer;
}
</style>