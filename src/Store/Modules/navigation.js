'use strict';

const navigation = {
    namespaced: true,

    state: {
        isActive: 'all-coaches',
    },

    getters: {
        getActive(state) {
            return state.isActive;
        },
    },

    mutations: {
        setActive(state, payload) {
            state.isActive = payload.name;
        },
    },

    actions: {
        setActive({ commit }, payload) {
            commit('setActive', payload);
        },
    },
};

export default navigation;
