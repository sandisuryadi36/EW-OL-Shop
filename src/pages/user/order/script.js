import axios from "axios";
import { config } from "../../../app/axiosSet";
import * as c from "../../../app/data/constants";

export async function confirmPayment(order) {
    return new Promise( async (resolve, reject) => { 
        let canOrder = true;
        let promise = new Promise((resolve, reject) => { 
            let ready = true;
            order.orderItems.forEach( async (item) => {
                let res = await axios.get(c.API_URL + `/api/v1/product/${item.product}`, config(localStorage.getItem("token")))
                if (res.data.data.stock < item.quantity) {
                    ready = false;
                    resolve(false)
                }
            })
            if (ready) { 
                resolve(true)
            }
        })
        canOrder = await promise
        if (canOrder) {
            axios.put(c.API_URL + "/api/v1/order/" + order._id, { status: "paid" }, config(localStorage.getItem("token")))
                .then(res => {
                    if (!res.data.error) {
                        resolve(res.data)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        } else {
            resolve({
                error: true,
                message: "Some products are out of stock"
            })
        }
    })
}