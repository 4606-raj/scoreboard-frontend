<template>

  <div class="m-4">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
  </div>

  <h1>Distt. Gatka Association Mohali</h1>

  <div class="scoreboard d-flex justify-content-between col-12">
    <div v-for="team in teams" class="col-6 d-flex justify-content-center" :key="team.id">
      <Score :team="team" @increment="increment" @decrement="decrement" />
    </div>
  </div>

  <div :class="['d-flex', 'justify-content-center', 'gap-2']">
      <div v-for="bar in bars" :key="bar.id" class="col-1">
        <Bar :bg=bar.color />
      </div>

    <div class="number" style="font-family: dseg7classic; font-size: 45px;">4</div>
  
      <div v-for="bar in bars" :key="bar.id" class="col-1">
        <Bar :bg=bar.color />
    </div>
  </div>

  <Timer />

</template>

<script>
  import Score from '../components/Score.vue';
  import Bar from '../components/Bar.vue';
  import Timer from '../components/Timer.vue';

  export default {
    components: {
      Score,
      Bar,
      Timer
    },
    data() {
      return {
        bars: [
          { id: 2, color: '#fff' },
          { id: 3, color: '#5bc0de' },
          { id: 4, color: '#5cb85c' },
          { id: 5, color: '#f0ad4e' },
          { id: 1, color: '#d9534f' },
        ],
        teams: [
          { id: 1, name: 'Team A', score: 0, color: '#5bc0de' },
          { id: 2, name: 'Team B', score: 0, color: '#5cb85c' },
        ],
      };
    },
    methods: {
      increment(teamId) {
        this.teams.forEach(t => {
          if (t.id === teamId) {
            t.score++;
          }
        });
      },
      decrement(teamId) {
        this.teams.forEach(t => {
          if (t.id === teamId) {
            if (t.score > 0) {
              t.score--;
            }
          }
        });
      }
    }
  };
</script>