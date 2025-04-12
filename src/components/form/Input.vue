<template>
    <div class="mb-3">
        <input :type="type" :placeholder="placeholder" v-model="internalValue" class="form-control">
    </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';
const emit = defineEmits(['update:value']);

const props = defineProps({
    type: {
        type: String,
        required: false,
        default: 'text'
    },
    value: {
        type: String,
        required: false,
        default: ''
    },
    placeholder: {
        type: String,
        required: false,
        default: 'Enter Here'
    },
});

const internalValue = ref(props.value);

watch(() => props.value, (newValue) => {
    internalValue.value = newValue;
});

watch(internalValue, (newValue) => {
    emit('update:value', newValue);
});
</script>