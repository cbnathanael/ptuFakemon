import * as Realm from 'realm-web';

const appRealm = new Realm.App({id: ""});// Gets a valid Realm user access token to authenticate requests

export default appRealm;