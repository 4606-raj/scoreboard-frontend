<template>

  <div v-if="!isGuest" class="col-12 d-flex justify-content-between p-4">
    <div>
      <RouterLink :to="{ name: 'dashboard' }" class="btn btn-primary mx-4">Dashboard</RouterLink>
      <!-- <RouterLink :to="{ name: 'scoreboard', params: { id: match?.id ? match?.id : 0, admin: '0' } }" class="btn btn-primary mx-4" target="_blank">Open Guest</RouterLink> -->
      <!-- <button v-if="!isGuest" @click="logout" class="btn btn-danger">Logout</button> -->
    </div>
    <button v-if="!isGuest" @click="update" class="btn btn-success">Update</button>
  </div>

  <div>
    <p style="font-size: 3.5rem;">{{ match?.organizer }}</p>
  </div>

  <div class="m-4">
    <img alt="Vue logo" class="logo" :src="match?.logo ? match.logo : logo" width="125" height="125" />
  </div>


  <h1>{{ match?.name }}</h1>

  <div class="scoreboard d-flex justify-content-between col-12">
    <div v-for="(team, index) in match?.teams" class="col-6 d-flex justify-content-evenly" :key="team.id">
      
      <div v-if="!isGuest && index !== 0" class="d-flex flex-column justify-content-around">
        <button class="btn p-4" :style="{ backgroundColor: team.color }" @click="decrement(team.id, 2)">-2</button>
        <button class="btn p-4" :style="{ backgroundColor: team.color }" @click="decrement(team.id, 3)">-3</button>
      </div>

      <div v-if="!isGuest && index === 0" class="d-flex flex-column justify-content-around">
        <button class="btn p-4" :style="{ backgroundColor: team.color }" @click="increment(team.id, 2)">+2</button>
        <button class="btn p-4" :style="{ backgroundColor: team.color }" @click="increment(team.id, 3)">+3</button>
      </div>

      <Score :team="team" @increment="increment" @decrement="decrement" :isGuest="isGuest" />
      
      <div v-if="!isGuest && index !== 0" class="d-flex flex-column justify-content-around">
        <button class="btn p-4" :style="{ backgroundColor: team.color }" @click="increment(team.id, 2)">+2</button>
        <button class="btn p-4" :style="{ backgroundColor: team.color }" @click="increment(team.id, 3)">+3</button>
      </div>

      <div v-if="!isGuest && index === 0" class="d-flex flex-column justify-content-around">
        <button class="btn p-4" :style="{ backgroundColor: team.color }" @click="decrement(team.id, 2)">-2</button>
        <button class="btn p-4" :style="{ backgroundColor: team.color }" @click="decrement(team.id, 3)">-3</button>
      </div>

    </div>
  </div>

  <div class="scoreboard d-flex justify-content-between col-12">
    <!-- <div class="col-6 d-flex justify-content-evenly">
      
      <div v-if="!isGuest" class="d-flex flex-column justify-content-around">
        <button class="btn p-4" :style="{ backgroundColor: match?.teams[0]?.color }" @click="decrement(match?.teams[0]?.id, 2)">-2</button>
        <button class="btn p-4" :style="{ backgroundColor: match?.teams[0]?.color }" @click="decrement(match?.teams[0]?.id, 3)">-3</button>
      </div>

      <Score :team="team" @increment="increment" @decrement="decrement" :isGuest="isGuest" />
      
      <div v-if="!isGuest" class="d-flex flex-column justify-content-around">
        <button class="btn p-4" :style="{ backgroundColor: match?.teams[0]?.color }" @click="increment(match?.teams[0]?.id, 2)">+2</button>
        <button class="btn p-4" :style="{ backgroundColor: match?.teams[0]?.color }" @click="increment(match?.teams[0]?.id, 3)">+3</button>
      </div>

    </div> -->

    <!-- <div class="col-6 d-flex justify-content-evenly">
      
      <div v-if="!isGuest" class="d-flex flex-column justify-content-around">
        <button class="btn p-4" :style="{ backgroundColor: secondTeam?.color }" @click="decrement(secondTeam?.id, 2)">-2</button>
        <button class="btn p-4" :style="{ backgroundColor: secondTeam?.color }" @click="decrement(secondTeam?.id, 3)">-3</button>
      </div>

      <Score :team="team" @increment="increment" @decrement="decrement" :isGuest="isGuest" />
      
      <div v-if="!isGuest" class="d-flex flex-column justify-content-around">
        <button class="btn p-4" :style="{ backgroundColor: secondTeam?.color }" @click="increment(secondTeam?.id, 2)">+2</button>
        <button class="btn p-4" :style="{ backgroundColor: secondTeam?.color }" @click="increment(secondTeam?.id, 3)">+3</button>
      </div>

    </div> -->
  </div>

  <div :class="['d-flex', 'justify-content-center', 'align-items-center', 'gap-2']">
      <div v-for="bar in bars" :key="bar.id" class="col-1">
        <Bar :bg=bar.color :teamId="match?.teams[0]?.id" @warning="warning" :isGuest="isGuest" />
      </div>

    <div class="number" style="font-family: dseg7classic; font-size: 45px;">|</div>
  
      <div v-for="bar in bars" :key="bar.id" class="col-1">
        <Bar :bg=bar.color :teamId="match?.teams[1]?.id" @warning="warning" :isGuest="isGuest" />
    </div>
  </div>

  <Timer :isGuest="isGuest" />

</template>

<script setup>
  import { inject, reactive, computed, onMounted } from 'vue';
  import { useMatchStore } from '@/stores/useMatchStore';
  import Score from '../components/Score.vue';
  import Bar from '../components/Bar.vue';
  import Timer from '../components/Timer.vue';
  import { useRoute } from 'vue-router';
  import logo from '@/assets/logo.png';
  

  window.addEventListener('beforeunload', (event) => {
    // event.preventDefault();
    // event.returnValue = '';
  });

  
  const store = useMatchStore();
  
  const route = useRoute();
  const matchId = route.params.id;
  
  // const isGuest = route.params.admin === '1'? false: true;
  const isGuest = false;
  
  onMounted(async () => {
    
    
    await store.fetchMatch(matchId);
  });

  const match = computed(() => store.getSelectedMatch);

  const firstTeam = computed(() => {
    return match?.value?.teams[0];
  });
  const secondTeam = computed(() => {
    return match?.value?.teams[1];
  });

  const bars = reactive([
    { id: 1, color: '#fff' },
    { id: 2, color: '#00FFFF' },
    { id: 3, color: '#00FF00' },
    { id: 4, color: '#FFFF00' },
    { id: 5, color: '#ff0000' },
  ]);

  function increment(teamId, count = 1) {
    match.value?.teams.forEach(t => {
      if (t.id === teamId) {
        t.score += count;
      }
    });
  }

  function decrement(teamId, count = 1) {
    match.value?.teams.forEach(t => {
      if (t.id === teamId) {
        if (t.score > 0) {
          t.score -= count;
        }
      }
    });
  }

  function warning(teamId, warning) {
    
    match.value?.teams.forEach(t => {
      if (t.id === teamId) {
        t.warning = bars.find(b => b.color === warning).id;
      }
    });
  }

  function update() {
    store.updateMatch(match.value);
    
  }

  function logout() {
    if (!confirm('Are you sure you want to log out?')) {
      return;
    }
    window.localStorage.removeItem('token');
    window.location.href = '/login';
  }
</script>