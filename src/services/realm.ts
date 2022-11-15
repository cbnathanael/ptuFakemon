import * as Realm from 'realm-web';

const appRealm = new Realm.App({id: process.env!.VUE_APP_MONGO_DATA_ID});// Gets a valid Realm user access token to authenticate requests

export default appRealm;