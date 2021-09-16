import {getEmail} from './keycloakService';
import {BASE_API_URL} from "./index";


const getUserId = async() => {
    const response = await fetch(`${BASE_API_URL}users/${getEmail()}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
    return await response.json();
}



export const getUserData = async() => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}users/i/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
}

export const getUserSkills = async() => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}users/skills/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
}
export const getUserPortfolio = async() => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}users/portfolio/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
}

export const getUserAbout = async() => {
    const id = await getUserId();
    return await fetch(`${BASE_API_URL}userProfile/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "GET",
    })
}
// const postNewUser = async() => {
//     const email = getEmail();
//     const firstname =  _kc.idTokenParsed?.given_name;
//     const lastname = _kc.idTokenParsed?.family_name;
//
//     return await fetch(`${BASE_API_URL}users`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         method: "POST",
//         body:JSON.stringify({
//             keycloak_email: email,
//             firstname: firstname,
//             lastname: lastname
//         })
//     })
// }