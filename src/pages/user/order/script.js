import axios from "axios";
import { config } from "../../../app/axiosSet";
import * as c from "../../../app/data/constants";

export function confirmPayment(order) {
    return new Promise((resolve, reject) => { 
        axios.put(c.API_URL + "/api/v1/order/" + order._id, { status: "paid" }, config(localStorage.getItem("token")))
            .then(res => { 
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
    })
}