'use strict';

const message = {
    namespaced: true,
    state: {
        list: [],
        isLoading: false,
        isStatus: true,
    },
    getters: {
        getList(state) {
            return state.list;
        },
        getLoading(state) {
            return state.isLoading;
        },
        getStatus(state) {
            return state.isStatus;
        },
    },
    mutations: {
        setList(state, list) {
            state.list = list;
        },
        setLoading(state, status) {
            state.isLoading = status;
        },
        setStatus(state, status) {
            state.isStatus = status;
        },
        deleteMessWithId(state, payload) {
            const index = state.list.findIndex(
                (mess) => mess.id === payload.id
            );

            state.list.splice(index, 1);
        },
    },
    actions: {
        async getMessData({ commit, rootGetters }) {
            const tokenId = rootGetters.getTokenId;

            const response = await fetch(
                `https://find-a-coach-fa63d-default-rtdb.firebaseio.com/message.json?auth=${tokenId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                console.log('Loi day du lieu mess tu firebase');
                commit('setStatus', false);
                return;
            }

            const data = await response.json();

            const convertData = Object.entries(data).map((item) => {
                return {
                    ...item[1],
                    key: item[0],
                };
            });

            console.log(convertData);

            commit('setList', convertData);

            return convertData;
        },

        async addMessageWithCoachName({ commit, rootState }) {
            const messages = rootState.message.list;
            const coaches = rootState.coach.list;

            const result = messages.map((mess) => {
                const coach = coaches.find((coach) => coach.id === mess.to);
                return {
                    ...mess,
                    name: coach ? coach.name : 'Unknown',
                };
            });

            commit('setList', result);
            commit('setLoading', true);
        },

        async deleteMess({ commit }, payload) {
            const response = await fetch(
                `https://find-a-coach-fa63d-default-rtdb.firebaseio.com/message/${payload.key}.json`,
                {
                    method: 'DELETE',
                }
            );

            if (!response.ok) return console.log('xoa mess that bai');

            console.log('xoa mess thanh cong');

            commit('deleteMessWithId', payload);
        },
        async postMessage(_, obj) {
            const response = await fetch(
                'https://find-a-coach-fa63d-default-rtdb.firebaseio.com/message.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                }
            );

            console.log(response);

            if (!response.ok)
                return console.log('Loi khong the day mess len firebase');

            console.log('Day mess len firebase thanh cong');
        },
    },
};

export default message;
