import { getResponseData } from "./getResponseData";

export const baseUrl = "http://localhost:3000";

export const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'password': password,
            'email': email
        })
    })
        .then(getResponseData);

}

export const authorize = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'password': password,
            'email': email
        })
    })
        .then(getResponseData);

}

export const getToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    })
        .then(getResponseData);
}