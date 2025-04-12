import { createRouter, createWebHistory } from 'vue-router'
import {jwtDecode} from 'jwt-decode';
import LoginView from '../views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ScoreBoardView from '@/views/ScoreBoardView.vue'
import CreateMatchView from '@/views/CreateMatchView.vue'

const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    return true;
  } catch (err) {
    return false;
  }
};


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: (to, from, next) => {
        if (checkAuth()) {
          next('/dashboard');
        }
        next();
      }
    },
    {
      path: '/scoreboard/:id/:admin',
      name: 'scoreboard',
      component: ScoreBoardView,
      beforeEnter: (to, from, next) => {
        if (checkAuth()) {
          next();
        } else {
          next('/login');
        }
      }  
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        if (checkAuth()) {
          next('/dashboard');
        }
        next();
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: (to, from, next) => {
        if (checkAuth()) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/create-match',
      name: 'create-match',
      component: CreateMatchView,
      beforeEnter: (to, from, next) => {
        if (checkAuth()) {
          next();
        } else {
          next('/login');
        }
      }
    },
  ],
})

export default router
