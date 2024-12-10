<template>
    <div class="overlay" id="overlay" @click="closeDialog" v-if="isClosed">
        <div class="dialog">
            <div class="success-icon">{{ icon }}</div>
            <h2>{{ title }}</h2>
            <p>{{ text }}</p>
            <button class="close-btn" @click="closeDialog">Close</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            isClosed: true,
        };
    },
    methods: {
        ...mapActions('navigation', ['setActive']),
        closeDialog() {
            this.isClosed = false;
            this.$emit('close-dialog', false);
            if (this.isAuth) {
                this.$router.push({ name: 'coach' });
                this.setActive({ name: 'all-coaches' });
            }
        },
    },
    props: ['title', 'text', 'icon'],
    computed: {
        ...mapGetters('auth', ['isAuth']),
    },
};
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Dialog Box */
.dialog {
    background: white;
    border-radius: 12px;
    width: 400px;
    padding: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
}

/* Success Icon */
.dialog .success-icon {
    font-size: 50px;
    color: #4caf50;
    margin-bottom: 10px;
}

/* Title */
.dialog h2 {
    font-size: 24px;
    color: #333;
    margin: 10px 0;
}

/* Description */
.dialog p {
    font-size: 16px;
    color: #666;
    margin: 0 0 20px;
}

/* Close Button */
.dialog .close-btn {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dialog .close-btn:hover {
    background-color: #45a049;
}
</style>
