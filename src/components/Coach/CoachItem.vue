<template>
    <div class="coach-item">
        <label for="name-coach">Name:</label>
        <p class="name-coach" id="name-coach">{{ name }}</p>
        <label for="rent-coach">Rent:</label>
        <p class="rent-coach" id="rent-coach">${{ rent }}/hour</p>
        <label for="expertise-list">Expertises</label>
        <div class="expertise-list" id="expertise-list">
            <coach-expertise
                v-for="expertise in expertiseList"
                :key="expertise"
                :name-expertise="expertise"
            ></coach-expertise>
        </div>
        <div class="button-group">
            <button class="contact-btn">Contact</button>
            <button class="details-btn">Details</button>
        </div>
    </div>
</template>

<script>
import CoachExpertise from './CoachExpertise.vue';
export default {
    components: {
        CoachExpertise,
    },
    props: ['id', 'name', 'rent', 'expertiseList'],
};
</script>

<style scoped>
.coach-item {
    position: relative; /* Để căn chỉnh các nút ở góc dưới */
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
}

.coach-item:hover {
    transform: translateY(-5px);
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}

.name-coach,
.rent-coach {
    margin-bottom: 10px;
    font-size: 1.1em;
    color: #555;
}

.rent-coach {
    color: #2ecc71;
}

.expertise-list {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
}

.button-group {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    gap: 10px;
}

.contact-btn,
.details-btn {
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    font-size: 0.9em;
    cursor: pointer;
    transition: background-color 0.3s;
}

.contact-btn:hover,
.details-btn:hover {
    background-color: #0056b3; /* Màu sắc tối hơn khi hover */
}
</style>
