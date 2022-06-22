export function config(token) {
    return ({
        headers: {
            'Authorization': 'Bearer ' + token,
            "Access-Control-Allow-Origin": "*"
        },
        'Access-Control-Allow-Credentials': true
    })
}