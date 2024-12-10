'use strict';

const auth = {
    namespaced: true,
    state: {
        tokenId: null,
        tokenExpires: null,
        userId: null,
        isStatus: null,
        isLoading: false,
        nameBtn: '',
    },
    getters: {
        getTokenId(state) {
            return state.tokenId;
        },

        getTokenExpires(state) {
            return state.tokenExpires;
        },

        getUserId(state) {
            return state.userId;
        },

        getStatus(state) {
            return state.isStatus;
        },

        getLoading(state) {
            return state.isLoading;
        },

        getNameBtn(state) {
            return state.nameBtn;
        },

        isAuth(state) {
            return !!state.tokenId;
        },
    },
    mutations: {
        setNewUser(state, payload) {
            state.tokenId = payload.idToken;
            state.tokenExpires = payload.expiresIn;
            state.userId = payload.localId;
        },

        setStatus(state, payload) {
            state.isStatus = payload.status;
        },

        setLoading(state, payload) {
            state.isLoading = payload.status;
        },

        setNameBtn(state, payload) {
            state.nameBtn = payload.nameBtn;
        },
    },
    actions: {
        async signup({ commit }, payload) {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCNH4NiXSZz4zV0x3sqjqdWC7JQeZTAjXk',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: payload.email,
                        password: payload.password,
                        returnSecureToken: true,
                    }),
                }
            );

            if (!response.ok) {
                console.log('Signup failed!');
                commit('setStatus', { status: false });
                commit('setLoading', { status: true });
                commit('setNameBtn', { nameBtn: 'btn-signup' });
                return;
            }

            const data = await response.json();

            console.log(data);

            commit('setNewUser', data);
            commit('setStatus', { status: true });
            commit('setLoading', { status: true });
            commit('setNameBtn', { nameBtn: 'btn-signup' });
        },

        async login({ commit }, payload) {
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCNH4NiXSZz4zV0x3sqjqdWC7JQeZTAjXk',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: payload.email,
                        password: payload.password,
                        returnSecureToken: true,
                    }),
                }
            );

            if (!response.ok) {
                console.log('Login failed!');
                commit('setStatus', { status: false });
                commit('setLoading', { status: true });
                commit('setNameBtn', { nameBtn: 'btn-login' });

                return;
            }

            const data = await response.json();

            console.log(data);

            commit('setNewUser', data);
            commit('setStatus', { status: true });
            commit('setLoading', { status: true });
            commit('setNameBtn', { nameBtn: 'btn-login' });
        },

        setLoading({ commit }, payload) {
            commit('setLoading', payload);
        },

        setUser({ commit }, payload) {
            commit('setNewUser', payload);
        },
    },
};

export default auth;
