import { createStore } from 'vuex';
import coach from './Store/Modules/coach';

const store = createStore({
    modules: {
        coach,
    },
});

export default store;
