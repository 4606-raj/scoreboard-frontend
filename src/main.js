
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import api from './utils/axios.config';

const app = createApp(App)

app.config.globalProperties.$axios = api;
app.provide("axios", api);

const pinia = createPinia()

app.use(pinia)
app.use(router)

app.mount('#app')
