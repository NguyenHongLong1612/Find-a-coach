<template>
    <div>
        <p v-if="!getLoading">Loading ...</p>
        <div class="container" v-else>
            <button @click="refreshPage" class="btn-refresh">Refresh</button>
            <ul>
                <li>
                    <input
                        type="checkbox"
                        value="FrontEnd"
                        v-model="arrFilter"
                    />
                    <label for="">FrontEnd</label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        value="BackEnd"
                        v-model="arrFilter"
                    />
                    <label for="">BackEnd</label>
                </li>
                <li>
                    <input type="checkbox" value="DevOps" v-model="arrFilter" />
                    <label for="">DevOps</label>
                </li>
                <li>
                    <input
                        type="checkbox"
                        value="Full-Stack"
                        v-model="arrFilter"
                    />
                    <label for="">Full-Stack</label>
                </li>
            </ul>
            <div class="coach-list">
                <coach-item
                    v-for="coach in filterCoach"
                    :key="coach.id"
                    :name="coach.name"
                    :rent="coach.rent"
                    :expertise-list="coach.expertise"
                ></coach-item>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CoachItem from './CoachItem.vue';
export default {
    data() {
        return {
            allCoach: [],
            filterCoach: [],
            arrFilter: [],
        };
    },
    components: {
        CoachItem,
    },
    methods: {
        ...mapActions('coach', ['getData']),
        refreshPage() {
            window.location.reload();
        },
    },
    async created() {
        this.allCoach = await this.getData();
        this.filterCoach = await this.allCoach;
    },
    computed: {
        ...mapGetters('coach', ['getCoachList', 'getLoading']),
    },

    watch: {
        arrFilter(newValue) {
            const arrCoach = this.allCoach;
            const result = [];

            for (const coach of arrCoach) {
                let count = 0;
                for (const exp of coach.expertise) {
                    if (newValue.includes(exp)) {
                        count++;
                    }
                }
                if (count === newValue.length) result.push(coach);
            }

            this.filterCoach = result;
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
}

.btn-refresh {
    widows: 100px;
    background-color: bisque;
    border: none;
    padding: 20px;
    border-radius: 50px;
    cursor: pointer;
}

.btn-refresh:hover {
    background-color: rgb(250, 187, 109);
}

.coach-list {
    width: 80%; /* Tùy chỉnh độ rộng cho phù hợp với màn hình */
    margin: 0 auto;
    padding: 20px;
    border: 2px solid #333;
    border-radius: 10px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

ul {
    list-style: none;
    display: flex;
    gap: 40px;
}

li {
    display: flex;
    gap: 10px;
}
</style>
