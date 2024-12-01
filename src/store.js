import { createStore } from 'vuex';
import coach from './Store/Modules/coach';
import message from './Store/Modules/message';
import navigation from './Store/Modules/navigation';

const store = createStore({
    modules: {
        coach,
        message,
        navigation,
    },
});

export default store;
