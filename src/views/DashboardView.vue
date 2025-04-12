<template>
    <div class="container d-flex flex-column align-items-center vh-100 mt-5">
        
        <div class="d-flex justify-content-between align-items-center w-100 mb-4">
            <button v-if="!isGuest" @click="logout" class="btn btn-danger">Logout</button>
            <h1 class="mb-4">Total Matches</h1>
            <RouterLink to="/create-match" class="btn btn-primary mb-4">Create Match</RouterLink>
        </div>
        
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Match Name</th>
                    <th>Match Organizer</th>
                    <th>Match Logo</th>
                    <th>First Team Name</th>
                    <th>Second Team Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="match in matches" :key="match.id">
                    <td>{{ match.name }}</td>
                    <td>{{ match?.organizer }}</td>
                    <td><img :src="match.logo? match.logo: logo" alt="Match Logo" width="100px" /></td>
                    <td>{{ match?.teams[0]?.name }} <br> <span class="text-danger">({{ match?.teams[0]?.score }})</span></td>
                    <td>{{ match?.teams[1]?.name }}<br> <span class="text-danger">({{ match?.teams[0]?.score }})</span></td>
                    <td>
                        <RouterLink :to="{ name: 'scoreboard', params: { id: match?.id? match?.id: 0, admin: '1' } }" class="btn btn-primary">Scoreboard</RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
        
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useMatchStore } from '../stores/useMatchStore';
import logo from '@/assets/logo.png';

onMounted(async () => {
    await matchStore.fetchMatches();
});

const matchStore = useMatchStore();

const matches = computed(() => matchStore.getMatches);

function logout() {
    if (!confirm('Are you sure you want to log out?')) {
      return;
    }
    window.localStorage.removeItem('token');
    window.location.href = '/login';
  }


</script>