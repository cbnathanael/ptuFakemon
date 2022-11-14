import { createApp, provide, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as Realm from 'realm-web';

const appRealm = new Realm.App({id: ""});// Gets a valid Realm user access token to authenticate requests

const app = createApp(App);
app.provide('appRealm', appRealm);

app.use(store).use(router).mount('#app')
