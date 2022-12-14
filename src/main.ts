import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './scss/global.scss';
import directives from "./directives/directives";

const app = createApp(App);
directives(app);
app.use(store).use(router).mount('#app');
