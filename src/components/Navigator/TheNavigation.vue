<template>
    <div class="nav">
        <p class="home-page">Find A Coach</p>
        <div class="btn">
            <router-link
                :to="goToAllCoachPage()"
                class="all-coaches"
                :class="{ active: getActive === 'all-coaches' }"
                @click="setActive({ name: 'all-coaches' })"
                >All Coaches
            </router-link>

            <router-link
                v-if="!isAuth"
                :to="{ name: 'auth' }"
                class="auth"
                :class="{ active: getActive === 'login' }"
                @click="setActive({ name: 'login' })"
                >Login
            </router-link>

            <router-link
                v-if="isAuth"
                :to="goToAllMessagePage()"
                class="all-mess"
                :class="{ active: getActive === 'all-mess' }"
                @click="setActive({ name: 'all-mess' })"
                >All Message
            </router-link>

            <router-link
                v-if="isAuth"
                :to="{ name: 'register' }"
                class="register-coach"
                :class="{ active: getActive === 'register-coach' }"
                @click="setActive({ name: 'register-coach' })"
                >Register
            </router-link>

            <router-link
                v-if="isAuth"
                :to="{ name: 'auth' }"
                class="auth"
                :class="{ active: getActive === 'logout' }"
                @click="setActive({ name: 'logout' })"
                >Logout
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    methods: {
        goToAllCoachPage() {
            return { name: 'coach' };
        },
        goToAllMessagePage() {
            return { name: 'message' };
        },
        ...mapActions('navigation', ['setActive']),
    },

    computed: {
        ...mapGetters('navigation', ['getActive']),
        ...mapGetters('auth', ['isAuth']),
    },
};
</script>

<style scoped>
.nav {
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.home-page {
    font-size: 24px;
    text-transform: uppercase;
    font-weight: bold;
}
.btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 40px;
}

.home-page,
.all-coaches,
.all-mess,
.register-coach {
    cursor: pointer;
}

.all-coaches,
.all-mess,
.register-coach,
.auth {
    background-color: antiquewhite;
    padding: 20px;
    border-radius: 20px;
    text-decoration: none;
}

.active {
    background-color: rgb(251, 207, 150);
}
</style>
