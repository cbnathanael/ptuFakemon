import { inject } from "vue";
import * as  Realm from 'realm-web';
const appRealm:any = inject("appRealm");

const authentication = {
    namespaced: true,

    state: () => ({
        user: null
    }),

    actions: {

        async authenticate({ commit }: any, loginInfo: any) {
                const credentials = Realm.Credentials.emailPassword(loginInfo.username, loginInfo.password);
                try {
                    // Authenticate the user
                    const user = await appRealm.logIn(credentials);
                    commit('updateAuthentication', user);
                    return user;
                } catch (err) {
                    console.error("Failed to log in", err);
                    return err;
                }
        },
    },
    getters: {
        
    },
    mutations: {
        updateAuthentication(state: any, user: any) {
            state.user = user;
        },
    },
}

export default authentication;