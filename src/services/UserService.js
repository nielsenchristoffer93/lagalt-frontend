import Keycloak from "keycloak-js";
import {BASE_API_URL} from "./index";

const _kc = new Keycloak('/keycloak.json');

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
    _kc.init({
        onLoad: 'check-sso',
        pkceMethod: 'S256',

        //Breaks everything after login
        //silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    })
        .then((authenticated) => {
            // if (authenticated) {
            onAuthenticatedCallback();
            // } else {
            //   doLogin();
            // }
        })
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const doRegister = _kc.register;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
    _kc.updateToken(5)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => _kc.idTokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const postNewUser = async() => {
    const email = _kc.idTokenParsed?.email;
    const firstname =  _kc.idTokenParsed?.given_name;
    const lastname = _kc.idTokenParsed?.family_name;

    return await fetch(`${BASE_API_URL}users`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        body:JSON.stringify({
            keycloak_email: email,
            firstname: firstname,
            lastname: lastname
        })
    })
}
const getUserId = async (email) => {
    const response = await fetch(`${BASE_API_URL}users/${email}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
    return await response.json();
}

const UserService = {
    initKeycloak,
    doLogin,
    doLogout,
    doRegister,
    isLoggedIn,
    getToken,
    updateToken,
    getUsername,
    hasRole,
    postNewUser,
    getUserId,
};

export default UserService;