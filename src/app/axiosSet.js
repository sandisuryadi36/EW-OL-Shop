export function config(token) {
    return ({
        headers: {
            'Authorization': 'Bearer ' + token,
            "Access-Control-Allow-Origin": "*"
        },
        withCredentials: true,
    })
}