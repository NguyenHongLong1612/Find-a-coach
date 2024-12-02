'use strict';

const coach = {
    namespaced: true,
    state: {
        list: [],
        isLoading: false,
        nameCoach: '',
    },
    getters: {
        getCoachList(state) {
            return state.list;
        },
        getLoading(state) {
            return state.isLoading;
        },
        getNameCoach(state) {
            return state.nameCoach;
        },
    },
    mutations: {
        setList(state, list) {
            state.list = list;
        },
        setLoading(state, status) {
            state.isLoading = status;
        },
        setNameCoach(state, payload) {
            const id = payload.id;

            const coach = state.list.find((coach) => coach.id === id);

            state.nameCoach = coach.name;
        },
    },
    actions: {
        async getData({ commit }) {
            const response = await fetch(
                'https://find-a-coach-fa63d-default-rtdb.firebaseio.com/coach.json',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok)
                return console.log('Lay du lieu tu fire base ve that bai');

            const data = await response.json();

            commit('setList', Object.values(data));

            commit('setLoading', true);

            return Object.values(data);
        },
        setNameCoach({ commit }, payload) {
            commit('setNameCoach', payload);
        },
    },
};

export default coach;
