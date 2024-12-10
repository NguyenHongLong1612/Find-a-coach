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
            if (rootGetters['auth/isAuth'] && getters.getActive === 'logout') {
                dispatch(
                    'auth/setUser',
                    {
                        idToken: null,
                        expiresIn: null,
                        localId: null,
                    },
                    { root: true }
                );

                commit('setActive', { name: 'login' });
            }
        },
    },
};

export default navigation;
