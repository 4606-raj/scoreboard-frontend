<template>
    <div class="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 class="mb-4">
            Sign in to continue
        </h1>
        <form class="w-25" @submit.prevent="login">
            <Input type="email" name="email" placeholder="Email" v-model:value="email" />
            
            <Input type="password" name="password" placeholder="Password" v-model:value="password" />

            <button type="submit" class="btn btn-primary">Sign in</button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '../stores/useAuthStore.js';
    import Input from '../components/form/Input.vue';

    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();

    function login() {
        authStore.login(email.value, password.value);
    }
</script>