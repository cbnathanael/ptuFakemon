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
        confirmUser({commit}:any) {
            const user = appRealm.currentUser;
            let loggedIn = false;
            if(user) {
                commit('updateAuthentication', user);
                loggedIn = user.isLoggedIn;
            }
            return loggedIn;
        }
    },
    getters: {
        getUserId(state:any) {
            return state.user.id;
        },
        getUserStatus(state:any) {
            if(state.user == null) {
                return false;
            } else {
                return state.user.isLoggedIn;
            }
        }
    },
    mutations: {
        updateAuthentication(state: any, user: any) {
            state.user = user;
        },
    },
}

export default authentication;