<template>
    <div class="team">
        <h2>{{ team.name }}</h2>
        <div :class="['score', 'col-12', 'd-flex', 'justify-content-between', 'align-items-center']" :style="style">
            <button @click="decrement" class="left-overlay col-2">-</button>
            <span>{{ team.score }}</span>
            <button @click="increment" class="right-overlay col-2">+</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Score',
    props: {
        team: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            style: {
                backgroundColor: this.team.color,
            }
        }
    },
    methods: {
        increment() {
            this.$emit('increment', this.team.id);
        },
        decrement() {
            this.$emit('decrement', this.team.id);
        }
    },
}
</script>

<style scoped>
    .score {
        font-size: 100px;
        font-family: dseg7classic;
    }
    .left-overlay:hover {
        background: linear-gradient(90deg, black, transparent);
        cursor: pointer;
    }
    .right-overlay:hover {
        background: linear-gradient(260deg, black, transparent);
        cursor: pointer;
    }
    .left-overlay, .right-overlay {
        border: none;
        color: white;
        background: transparent;
    }
</style>