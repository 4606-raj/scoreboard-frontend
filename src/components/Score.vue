<template>
    <div class="team">
        <p style="font-size: 3rem;">{{ team.name }}</p>
        <div :class="['score', 'col-12', 'd-flex', 'justify-content-between', 'align-items-center']" :style="style">
            
            <button v-if="!isGuest" @click="decrement" class="left-overlay col-2">-</button>
            <span v-if="isGuest"></span>

            <span>{{ team.score ?? 0 }}</span>
            <button v-if="!isGuest" @click="increment" class="right-overlay col-2">+</button>
            <span v-if="isGuest"></span>
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
        isGuest: {
            type: Boolean,
            default: false
        }
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
        },
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