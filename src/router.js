import { createRouter, createWebHistory } from 'vue-router';
// import { defineAsyncComponent } from 'vue';

// import CoachList from './components/Coach/CoachList.vue';
// import MessageList from './components/Message/MessageList.vue';
// import ContactCoach from './components/Contact/ContactCoach.vue';
// import RegisterCoach from './components/Register/RegisterCoach.vue';
// import UserAuth from './components/Auth/UserAuth.vue';

const CoachList = () => import('./components/Coach/CoachList.vue');

const MessageList = () => import('./components/Message/MessageList.vue');

const ContactCoach = () => import('./components/Contact/ContactCoach.vue');

const RegisterCoach = () => import('./components/Register/RegisterCoach.vue');

const UserAuth = () => import('./components/Auth/UserAuth.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'default', path: '/', redirect: 'auth' },
        {
            name: 'coach',
            path: '/coach',
            component: CoachList,
        },
        { name: 'message', path: '/message', component: MessageList },
        {
            name: 'contact-coach',
            path: '/coach/:id',
            component: ContactCoach,
            props: true,
        },
        { name: 'register', path: '/register', component: RegisterCoach },
        { name: 'auth', path: '/auth', component: UserAuth },
    ],
});

export default router;
