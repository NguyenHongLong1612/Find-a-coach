'use strict';

const navigation = {
    namespaced: true,

    state: {
        isActive: 'login',
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
        setActive({ commit, rootGetters, dispatch, getters }, payload) {
            commit('setActive', payload);
            if (
                rootGetters['auth/isAuth'] &&
                String(getters.getActive) === 'logout'
            ) {
                try {
                    dispatch('auth/logout', null, { root: true });
                    commit('setActive', { name: 'login' });
                } catch (error) {
                    console.error('Logout failed:', error);
                }
            }
        },
    },
};

export default navigation;
