import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './scss/global.scss';

const app = createApp(App);
app.use(store).use(router).mount('#app')
