<template>
    <teleport to="body">
        <modal-dialog
            v-if="isOpenModal"
            :title="modalTitle"
            :text="modalText"
            :icon="modalIcon"
        ></modal-dialog>
    </teleport>

    <form @submit.prevent="sendMessageToCoach">
        <label for="email">From: </label>
        <input
            type="email"
            placeholder="Please enter your email"
            id="email"
            v-model="email"
            :class="{ 'email-is-invalid': emailIsInvalid }"
        />
        <p
            v-if="emailIsInvalid"
            :class="{ 'email-is-invalid': emailIsInvalid }"
        >
            Oops! Email is empty. Please enter your email.
        </p>
        <p v-if="getLoading">To: {{ getNameCoach }}</p>
        <label for="mess">Mess: </label>
        <textarea
            name=""
            id="mess"
            placeholder="Please your message"
            v-model="mess"
            :class="{ 'mess-is-invalid': messIsInvalid }"
        ></textarea>
        <p v-if="messIsInvalid" :class="{ 'mess-is-invalid': messIsInvalid }">
            Oops! Message is empty. Please enter your message.
        </p>
        <button type="submit">Send</button>
    </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ModalDialog from '../Modal/ModalDialog.vue';
export default {
    components: {
        ModalDialog,
    },
    data() {
        return {
            email: '',
            mess: '',
            emailIsInvalid: false,
            messIsInvalid: false,
            isOpenModal: false,
            modalTitle: '',
            modalText: '',
            modalIcon: '',
        };
    },
    props: ['id'],
    computed: {
        ...mapGetters('coach', ['getNameCoach', 'getLoading']),
    },
    methods: {
        ...mapActions('coach', ['setNameCoach', 'getData']),
        ...mapActions('message', ['postMessage']),
        sendMessageToCoach() {
            if (this.email === '') return (this.emailIsInvalid = true);
            this.emailIsInvalid = false;
            if (this.mess === '') return (this.messIsInvalid = true);
            this.messIsInvalid = false;

            const obj = {
                id: new Date().toISOString(),
                from: this.email,
                to: this.id,
                text: this.mess,
            };

            this.postMessage(obj);

            this.isOpenModal = true;
            this.modalTitle = 'Success!';
            this.modalText =
                'Post information coach was completed successfully.';
            this.modalIcon = '✅';

            this.email = '';
            this.mess = '';
        },
    },
    async mounted() {
        await this.getData();
        await this.setNameCoach({ id: this.id });
    },
};
</script>

<style scoped>
.email-is-invalid {
    /* border: 1px solid red; */
    color: red;
}

.mess-is-invalid {
    /* border: 1px solid red; */
    color: red;
}
</style>
