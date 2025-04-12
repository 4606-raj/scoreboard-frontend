import { defineStore } from 'pinia';
import api from '../utils/axios.config';

export const useMatchStore = defineStore('match', {
    state: () => ({
        matches: [{
            id: '',
            name: '',
            timer: {},
            teams: [],
        }],        
        selectedMatch: null,
    }),
    getters: {
        getMatches: (state) => state.matches,
        getSelectedMatch: (state) => state.selectedMatch,
    },
    actions: {
        setMatches(matches) {
            this.matches = matches;
        },
        setSelectedMatch(match) {
            this.selectedMatch = match;
        },
        clearSelectedMatch() {
            this.selectedMatch = null;
        },
        async fetchMatch(id) {
            try {
                const response = await api.get(`matches/${id}`);
                this.setSelectedMatch(response.data);
            } catch (error) {
                console.error('Error fetching matches:', error);
                throw error;
            }
        },
        async fetchMatches() {
            try {
                const response = await api.get('matches');
                this.setMatches(response.data);
            } catch (error) {
                console.error('Error fetching matches:', error);
                throw error;
            }
        },
        
        async createMatch(match) {
            try {
                const response = await api.post('matches', match, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                this.setSelectedMatch(response.data);
                console.log(response.data);
                
                window.location.href = `/scoreboard/${response.data.id}/1`;
            } catch (error) {
                console.error('Error creating match:', error);
                throw error;
            }
        },
        async updateMatch(match) {
            try {
                const response = await api.put(`matches/${match.id}`, match);
                this.setSelectedMatch(response.data);
            } catch (error) {
                console.error('Error updating match:', error);
                throw error;
            }
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'match',
                storage: localStorage,
            },
        ],
    },
});