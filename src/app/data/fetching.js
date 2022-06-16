import Axios from 'axios';

const axios = Axios.create({
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    withCredentials: true
})

export default axios;