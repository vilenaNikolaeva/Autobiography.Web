 const BASE_URL = 'https://localhost:44311/api/';
//const BASE_URL = 'https://stepforward-api.azurewebsites.net/api/';

function getToken() {
    return 'Bearer ' + sessionStorage.token;
}

//Function to return GET promise
function get(endpoint) {
    return fetch(BASE_URL + endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}

//Function to return POST promise
function post(endpoint, data) {
    return fetch(BASE_URL + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}
//Function to return PUT promise
function put(endpoint, data) {
    return fetch(BASE_URL + endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}
//Function to return PUT FormData promise
function putFormData(endpoint, formData) {
    return fetch(BASE_URL + endpoint, {
        method: 'PUT',
        headers: {
            'Authorization': getToken()
        },
        body: formData
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}

// Function to return DELETE promise
function remove (endpoint) {
    return fetch(BASE_URL + endpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getToken()
        }
    })
        .then(res => res.json())
        .catch(err => console.log(err));
}

let requester = {
    get,
    post,
    put,
    putFormData,
    remove
};

export default requester;