<template>
    <div class="expertise-item">{{ nameExpertise }}</div>
</template>

<script>
export default {
    props: ['nameExpertise'],
};
</script>

<style scoped>
.expertise-item {
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #e0e0e0;
    font-size: 0.9em;
    color: #333;
}

.expertise-item:hover {
    background-color: #ccc;
    cursor: pointer;
}
</style>
