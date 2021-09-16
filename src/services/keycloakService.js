import Keycloak from "keycloak-js";
import {BASE_API_URL} from "./index";
import {connect} from "react-redux";
import {showModal} from "../redux/profile/profileSlice";
import {fetchUserData} from "../redux/User/userSlice";
const _kc = new Keycloak('/keycloak.json');

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
    try {
        _kc.init({
            onLoad: 'check-sso',
            pkceMethod: 'S256',

            //Breaks everything after login
            //silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        })
            .then((authenticated) => {
                 //setUserData();
                // if (authenticated) {
                onAuthenticatedCallback();
                //fetchUserData();
                // } else {
                //   doLogin();
                // }
            })
    }catch(e) {
        console.log(e);
    }
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const doRegister = _kc.register;

const getToken = () => _kc.token;

const updateToken = (successCallback) =>
    _kc.updateToken(5)
        .then(successCallback)
        .catch(doLogin);

const isLoggedIn = () => !!_kc.token;

const getUsername = () => _kc.idTokenParsed?.preferred_username;

export const getEmail = () => _kc.idTokenParsed?.email;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const postNewUser = async() => {
    const email = _kc.idTokenParsed?.email;
    const firstname =  _kc.idTokenParsed?.given_name;
    const lastname = _kc.idTokenParsed?.family_name;
    try {
        return await fetch(`${BASE_API_URL}users`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body:JSON.stringify({
                keycloakEmail: email,
                firstname: firstname,
                lastname: lastname
            })
        })
    }catch (e) {
        console.log("Error: " + e);
    }
}

const KeycloakService = {
    initKeycloak,
    doLogin,
    doLogout,
    doRegister,
    isLoggedIn,
    getToken,
    updateToken,
    getUsername,
    hasRole,
    getEmail,
    postNewUser
};
// const mapStateToProps = state => {
//     return {
//         user: state.user.user,
//     };
// };
//
// const mapDispatchToProps = dispatch => {
//     return {
//         fetchUserData:() => dispatch(fetchUserData()),
//
//     }
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(KeycloakService);
export default KeycloakService;
