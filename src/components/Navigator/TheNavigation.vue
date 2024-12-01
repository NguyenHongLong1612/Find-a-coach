<template>
    <div class="nav">
        <p class="home-page">Find A Coach</p>
        <div class="btn">
            <router-link
                :to="goToAllCoachPage()"
                class="all-coaches"
                :class="{ active: getActive === 'all-coaches' }"
                @click="setActive({ name: 'all-coaches' })"
            >
                All Coaches
            </router-link>

            <router-link
                :to="goToAllMessagePage()"
                class="all-mess"
                :class="{ active: getActive === 'all-mess' }"
                @click="setActive({ name: 'all-mess' })"
            >
                All Message
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
.all-mess {
    cursor: pointer;
}

.all-coaches,
.all-mess {
    background-color: antiquewhite;
    padding: 20px;
    border-radius: 20px;
    text-decoration: none;
}

.active {
    background-color: rgb(251, 207, 150);
}
</style>
