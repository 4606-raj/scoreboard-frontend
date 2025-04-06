import { defineStore } from 'pinia';
import api from '../utils/axios.config';

export const useMatchStore = defineStore('match', {
    state: () => ({
        matches: [{
            id: '',
            name: '',
            timer: {},
            teams: [{
                firstTeam: {
                    score: 0,
                    warning: {},
                },
            }, 
            {
                secondTeam: {
                    score: 0,
                    warning: {},
                }
            }],
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
        async fetchMatch() {
            try {
                const response = await api.get('match');
                this.setSelectedMatch(response);
            } catch (error) {
                console.error('Error fetching matches:', error);
                throw error;
            }
        }
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