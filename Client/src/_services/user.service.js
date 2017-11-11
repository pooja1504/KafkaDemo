import { authHeader } from '../_helpers';
import { history } from '../_helpers';
export const userService = {
    login,
   logout,
    register,
    checksession,
    getDetails,
    edituserdetails
};
const headers = {
    'Accept': 'application/json'
};
function login(username, password) {
    console.log("username"+username+"password"+password);
    const requestOptions = {
        method: 'POST',
        mod:'cors',
        headers: {...headers,'Content-Type': 'application/json' },
        credentials:'include',
        body: JSON.stringify({username,password})
    };

    return fetch('http://localhost:3001/login', requestOptions)
        .then((response) => response.json()).then((responseJson) => {
    return responseJson;
});
}
function register(user) {
    console.log(user);
    const requestOptions = {
        method: 'POST',
       credentials:'include',
       // mod:'cors',
        headers: { ...headers,'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch('http://localhost:3001/signup', requestOptions).then(handleResponse);
}
function checksession(){
    const status = 201;
    const requestOptions = {
        method: 'POST',
        credentials:'include',
        mode:'cors',
        headers: { ...headers,'Content-Type': 'application/json'},
        body: JSON.stringify({status})
    };

    return fetch('http://localhost:3001/checkSession', requestOptions)
        .then((response) => response.json()).then((responseJson) => {
    return responseJson;
});
}

function getDetails()
{
    const requestOptions = {
        method: 'POST',
        credentials:'include',
        mode:'cors',
        headers: { ...headers,'Content-Type': 'application/json'},
    };

    return fetch('http://localhost:3001/userdetails', requestOptions)
        .then((response) => response.json()).then((responseJson) => {
            return responseJson;
        });
}
function logout() {
    history.push('/login');
}
function edituserdetails(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch('http://localhost:3001/edituserdetails', requestOptions)
        .then((response) => response.json()).then((responseJson) => {
        return responseJson;
    });
}
function handleResponse(response) 
{
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}