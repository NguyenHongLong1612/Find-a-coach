import { createStore } from 'vuex';
import coach from './Store/Modules/coach';
import message from './Store/Modules/message';
import navigation from './Store/Modules/navigation';
import auth from './Store/Modules/auth';

const store = createStore({
    modules: {
        coach,
        message,
        navigation,
        auth,
    },
});

export default store;
