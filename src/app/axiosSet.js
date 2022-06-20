export function config(token) {
    return ({
        headers: {
            'Authorization': 'Bearer ' + token
        },
        withCredentials: true
    })
}