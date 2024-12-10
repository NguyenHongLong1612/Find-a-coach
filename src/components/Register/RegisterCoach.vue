<template>
    <teleport to="body">
        <modal-dialog
            v-if="isOpenModal"
            :title="modalTitle"
            :text="modalText"
            :icon="modalIcon"
            @close-dialog="closeDialog"
        ></modal-dialog>
    </teleport>

    <form @submit.prevent="submitForm">
        <div>
            <label for="name-coach">Name coach: </label>
            <input type="text" id="name-coach" v-model="nameCoach" />
            <p class="invalid" v-if="nameCoachInvalid">
                Name coach is empty. Please enter name coach.
            </p>
        </div>
        <div>
            <label for="rent">Rent: </label>
            <input type="number" v-model="rentCoach" />
            <p class="invalid" v-if="rentCoachInvalid">
                Rent coach is empty or less than 0. Please enter rent coach.
            </p>
        </div>
        <p>Expertise</p>
        <ul class="expertise-list">
            <li>
                <label for="front-end">Front-End</label>
                <input
                    type="checkbox"
                    id="front-end"
                    v-model="expertiseList"
                    value="FrontEnd"
                />
            </li>
            <li>
                <label for="back-end">Back-End</label>
                <input
                    type="checkbox"
                    id="back-end"
                    v-model="expertiseList"
                    value="BackEnd"
                />
            </li>
            <li>
                <label for="dev-ops">DevOps</label>
                <input
                    type="checkbox"
                    id="dev-ops"
                    v-model="expertiseList"
                    value="DevOps"
                />
            </li>
            <li>
                <label for="full-stack">Full-Stack</label>
                <input
                    type="checkbox"
                    id="full-stack"
                    v-model="expertiseList"
                    value="Full-Stack"
                />
            </li>
        </ul>
        <p class="invalid" v-if="expertiseListInvalid">
            Expertise coach is empty. Please enter expertise coach.
        </p>

        <button type="submit" class="btn-submit">Submit</button>
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
            nameCoach: '',
            rentCoach: '',
            expertiseList: [],
            nameCoachInvalid: false,
            rentCoachInvalid: false,
            expertiseListInvalid: false,
            isOpenModal: false,
            modalTitle: '',
            modalText: '',
            modalIcon: '',
        };
    },

    methods: {
        ...mapActions('navigation', ['setActive']),
        async submitForm() {
            if (this.nameCoach === '') {
                this.nameCoachInvalid = true;
                return;
            } else {
                this.nameCoachInvalid = false;
            }

            if (this.rentCoach === '' || Number(this.rentCoach) <= 0) {
                this.rentCoachInvalid = true;
                return;
            } else {
                this.rentCoachInvalid = false;
            }

            if (this.expertiseList.length === 0) {
                this.expertiseListInvalid = true;
                return;
            } else {
                this.expertiseListInvalid = false;
            }

            const coach = {
                id: new Date().toISOString(),
                name: this.nameCoach,
                rent: this.rentCoach,
                expertise: this.expertiseList,
            };

            const request = await fetch(
                `https://find-a-coach-fa63d-default-rtdb.firebaseio.com/coach.json?auth=${this.getTokenId}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(coach),
                }
            );

            console.log(request);

            if (!request.ok) {
                this.isOpenModal = true;
                this.modalTitle = 'Failed!';
                this.modalText = 'You do not have permission to post.';
                this.modalIcon = '❎';

                (this.nameCoach = ''),
                    (this.rentCoach = ''),
                    (this.expertiseList = []);
                return;
            }

            this.isOpenModal = true;
            this.modalTitle = 'Success!';
            this.modalText =
                'Post information coach was completed successfully.';
            this.modalIcon = '✅';

            (this.nameCoach = ''),
                (this.rentCoach = ''),
                (this.expertiseList = []);
        },
        closeDialog(status) {
            this.isOpenModal = status;
        },
    },

    mounted() {
        this.setActive({ name: 'register-coach' });
    },

    computed: {
        ...mapGetters('auth', ['getTokenId']),
    },
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    border: 2px solid black;
    width: 500px;
    margin: 0 auto;
}

.expertise-list {
    display: flex;
    justify-content: center;
    gap: 30px;
    list-style: none;
}

.btn-submit {
    width: 100px;
    padding: 24px;
    border: none;
    background-color: cadetblue;
}

.btn-submit:hover {
    cursor: pointer;
    background-color: rgb(153, 207, 209);
}

.invalid {
    color: red;
}
</style>
