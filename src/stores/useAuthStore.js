import { defineStore } from 'pinia';
import api from '../utils/axios.config';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
    }),
    actions: {
        async login(email, password) {
        try {
            const response = await api.post('/login', { email, password });
            console.log(response.data.token);
            
            if(response.data.token) {
                localStorage.setItem('token', response.data.token);
                this.isAuthenticated = true;
                window.location.href = '/dashboard'
            }
            else {
                console.error('Login failed: No token received');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
        },
        async logout() {
        try {
            await api.post('/auth/logout');
            localStorage.removeItem('token');
            this.isAuthenticated = false;
        } catch (error) {
            console.error('Logout failed:', error);
        }
        },
    },
});
