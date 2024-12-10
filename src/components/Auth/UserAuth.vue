<template>
    <teleport to="body" v-if="getLoading">
        <modal-dialog
            :title="getStatus ? 'Success!' : 'Failed!'"
            :text="
                getStatus
                    ? getNameBtn === 'btn-login'
                        ? 'Login success'
                        : 'Register account success'
                    : getNameBtn === 'btn-login'
                    ? 'Email or password incorrect'
                    : 'Email is exist. Please check it out your email'
            "
            :icon="getStatus ? '✅' : '❎'"
            @close-dialog="closeDialog"
        >
        </modal-dialog>
    </teleport>

    <form @submit.prevent="submitForm">
        <h2>{{ title }}</h2>
        <div>
            <label for="email">Email: </label>
            <input type="email" id="email" v-model="email" />
            <p v-if="emailIsInvalid">Email is invalid.</p>
        </div>
        <div>
            <label for="pass">Password: </label>
            <input type="password" id="pass" v-model="password" />
            <p v-if="passwordIsInvalid">
                Password is invalid or password is length less than 6.
            </p>
        </div>
        <div>
            <button
                class="btn btn-login"
                :class="{ active: isActive === 'btn-login' }"
                @click="setActive('btn-login')"
            >
                Login
            </button>
            <button
                class="btn btn-signup"
                :class="{ active: isActive === 'btn-signup' }"
                @click="setActive('btn-signup')"
            >
                Signup
            </button>
        </div>
    </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ModalDialog from '../Modal/ModalDialog.vue';
export default {
    components: {
        ModalDialog,
    },
    data() {
        return {
            isActive: 'btn-login',
            title: 'Login',
            email: '',
            password: '',
            emailIsInvalid: false,
            passwordIsInvalid: false,
        };
    },
    methods: {
        ...mapActions('auth', ['signup', 'login', 'setLoading']),
        setActive(nameBtn) {
            this.isActive = nameBtn;
            nameBtn === 'btn-login'
                ? (this.title = 'Login')
                : (this.title = 'Signup');
        },
        async submitForm() {
            if (this.email === '') {
                this.emailIsInvalid = true;
                return;
            } else {
                this.emailIsInvalid = false;
            }

            if (this.password === '' || this.password.length < 6) {
                this.passwordIsInvalid = true;
                return;
            } else {
                this.passwordIsInvalid = false;
            }

            if (this.isActive === 'btn-signup') {
                const payload = { email: this.email, password: this.password };

                await this.signup(payload);

                if (this.getStatus) {
                    this.email = '';
                    this.password = '';
                }
            } else {
                const payload = { email: this.email, password: this.password };

                await this.login(payload);

                if (this.getStatus) {
                    this.email = '';
                    this.password = '';
                }
            }
        },
        closeDialog(status) {
            this.setLoading({ status: status });
        },
    },

    computed: {
        ...mapGetters('auth', ['getStatus', 'getLoading', 'getNameBtn']),
    },
};
</script>

<style scoped>
form {
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 2px solid black;
    margin: 0 auto;
    padding: 24px;
}

div {
    display: flex;
    gap: 20px;
    align-items: end;
    justify-content: space-between;
}

.btn {
    border: none;
    background-color: transparent;
}

.btn:hover {
    background-color: #78350f;
    color: #fffbeb;
    cursor: pointer;
}

.active {
    border: 2px solid #78350f;
    padding: 10px;
    background-color: #fffbeb;
    color: #78350f;
    font-family: sans-serif;
    text-transform: uppercase;
    font-size: 16px;
}
</style>
