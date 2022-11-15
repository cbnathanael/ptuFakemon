import * as  Realm from 'realm-web';
import appRealm from '@/services/realm'; 
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
        getUserId(state:any) {
            return state.user.id;
        }
    },
    mutations: {
        updateAuthentication(state: any, user: any) {
            state.user = user;
        },
    },
}

export default authentication;