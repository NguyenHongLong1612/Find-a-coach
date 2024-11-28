import { createRouter, createWebHistory } from 'vue-router';
import CoachList from './components/Coach/CoachList.vue';
import MessageList from './components/Message/MessageList.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'default', path: '/', redirect: 'coach' },
        { name: 'coach', path: '/coach', component: CoachList },
        { name: 'message', path: '/message', component: MessageList },
    ],
});

export default router;
