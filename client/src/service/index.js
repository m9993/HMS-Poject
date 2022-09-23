import config from './config'

export async function getApi(action) {
    const response = await fetch(config.apiUrl + action);
    return response.json();
}

export async function postApi(action, data = {}) {
    const response = await fetch(config.apiUrl + action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function putApi(action, data = {}) {
    const response = await fetch(config.apiUrl + action, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function deleteApi(action, data = {}) {
    const response = await fetch(config.apiUrl + action, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
