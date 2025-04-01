<template>
    <div @click="select" class="bar" :style="barStyle"></div>
</template>

<script>
export default {
    props: {
        bg: {
            type: String,
            required: true
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
            this.selected = !this.selected;
            if (this.selected) {
                this.barStyle.boxShadow = '0 0 10px 5px' + this.bg;
            } else {
                this.barStyle.boxShadow = 'none';
            }
        }
    },
};
</script>

<style>
.bar {
    cursor: pointer;
}
</style>