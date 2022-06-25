import axios from "axios";
import { useEffect, useState } from "react";
import * as c from '../../../app/data/constants'
import ListItem from "./listItem";
import Spinner from "../../../component/spinner";
import { config } from "../../../app/axiosSet";

const UserOrder = () => { 
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(c.API_URL + "/api/v1/order", config(localStorage.getItem("token"))).then(res => {
            setLoading(false);
            setOrders(res.data.data)
        })
    }, [])

    const cancelHandler = (id) => { 
        setLoading(true);
        axios.put(c.API_URL + "/api/v1/order/" + id, {status: "cancelled"}, config(localStorage.getItem("token"))).then(res => {
            axios.get(c.API_URL + "/api/v1/order", config(localStorage.getItem("token"))).then(res => {
                setLoading(false);
                setOrders(res.data.data)
            })
        }).catch(err => {
            setLoading(false);
            console.log(err)
        })
    }

    const OrderList = () => { 
        if (orders.length > 0) {
            return (
                <ul className="list-group list-group-flush d-flex flex-column">
                    {orders.map((item, key) => {
                        return (
                            <ListItem product={item} key={key} cancelOrder={cancelHandler} />
                        )
                    })}
                </ul>
            )
        } else {
            return (
                <div className="text-center">
                    <h3>You have no order</h3>
                </div>
            )
        }
    }

    return (
        <div>
            <h1>My Orders</h1>
            {loading && <Spinner child={true} />}
            {!loading && <OrderList />}
        </div>
    )
}

export default UserOrder;