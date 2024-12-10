<template>
    <p v-if="!getLoading">Loading ...</p>
    <modal-dialog
        v-else-if="getLoading && !getStatus"
        title="Failed!"
        text="You do not have permission to seen message."
        icon="❎"
    ></modal-dialog>
    <div v-else class="mess-list">
        <message-item
            v-for="mess in getList"
            :key="mess.id"
            :key-mess-json="mess.key"
            :id="mess.id"
            :from="mess.from"
            :name="mess.name"
            :text="mess.text"
        ></message-item>
    </div>
</template>

<script>
import MessageItem from './MessageItem.vue';
import ModalDialog from '../Modal/ModalDialog.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        MessageItem,
        ModalDialog,
    },

    methods: {
        ...mapActions('coach', ['getData']),
        ...mapActions('message', ['getMessData', 'addMessageWithCoachName']),
        ...mapActions('navigation', ['setActive']),
    },

    async created() {
        await this.getData();
        await this.getMessData();
        await this.addMessageWithCoachName();
    },

    computed: {
        ...mapGetters('message', ['getList', 'getLoading', 'getStatus']),
    },

    mounted() {
        this.setActive({ name: 'all-mess' });
    },
};
</script>

<style scope>
.mess-list {
    width: 90%;
    max-width: 600px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
