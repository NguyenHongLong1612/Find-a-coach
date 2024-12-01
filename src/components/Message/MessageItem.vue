<template>
    <div class="mess-item">
        <p class="from">From: {{ from }}</p>
        <p class="to">To: {{ name }}</p>
        <p class="text">Message: {{ text }}</p>
        <button
            class="btn-delete"
            @click="deleteMess({ id: id, key: keyMessJson })"
        >
            Delete
        </button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: ['id', 'from', 'name', 'text', 'keyMessJson'],
    methods: {
        ...mapActions('message', ['deleteMess']),
    },
};
</script>

<style scoped>
.mess-item {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
}

.from {
    font-size: 14px;
    color: #555;
    margin-bottom: 4px;
}

.to {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
}

.text {
    font-size: 14px;
    color: #666;
}

.btn-delete {
    cursor: pointer;
    border: none;
    padding: 20px;
    border-radius: 30%;
}

.btn-delete:hover {
    background-color: #9696ff;
    transition: background-color 0.3s ease;
}
</style>
