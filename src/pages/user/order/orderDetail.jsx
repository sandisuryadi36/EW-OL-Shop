import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as c from '../../../app/data/constants'
import Spinner from "../../../component/spinner";
import { config } from "../../../app/axiosSet";
import * as scr from "./script"
import { viewRP } from "../../../app/script";

const OrderDetail = () => { 
    const params = useParams();
    const orderID = params.id;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => { 
        setLoading(true);
        axios.get(c.API_URL + `/api/v1/order/${orderID}`, config(localStorage.getItem("token"))).then(res => {
            setLoading(false);
            res.data.data.total = 0
            res.data.data.orderItems.forEach(item => { 
                res.data.data.total += item.price * item.quantity
            })
            res.data.data.total += res.data.data.deliveryFee
            setOrder(res.data.data)
        })
    }, [orderID])

    function confirmPayment() {
        setLoading(true)
        scr.confirmPayment(order).then(res => {
            if (!res.error) {
                setOrder({ ...order, status: "paid" })
                alert("Payment confirmed")
            } else {
                alert(res.message)
            }
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            alert(err)
        })
    }

    const OrderList = () => { 
        return (
            order.orderItems.map((item, key) => { 
                return (
                    <div key={key} className="d-flex flex-row justify-content-between align-items-center w-100 list-group-item list-group-item-secondary">
                        <div className="d-flex flex-row align-items-center">
                            <div className="list-image m-2">
                                <img className="w-100 h-100 image-square" src={item.imageUrl} alt="product" />
                            </div>
                            <div>{item.productName}</div>
                        </div>
                        <div className="text-end">
                            <div>{item.quantity} {item.quantity === 1 ? "item" : "items"}</div>
                            <div>{order && viewRP(item.total)}</div>
                        </div>
                    </div>
                )
            }))
    }
    
    return (
        <div className="pt-4 position-relative">
            {loading && <Spinner child={true} overlay={true} />}
            <div className="d-flex justify-content-between">
                <h3>Order Detail</h3>
                <div>
                    <button type="button" className="btn-close" aria-label="Close"
                        onClick={() => {
                            let origin = location.state ? location.state.from.pathname : "/user/order";
                            if (location.state && location.state.from.search) {
                                origin += location.state.from.search;
                            }
                            navigate(origin)
                        }}
                    ></button>
                </div>
            </div>
            <div className="row">
                <div className="col col-12 col-md-6">
                    <p><span className="fw-semibold">Order Number:</span> {order && order.order_number}</p>
                    <p><span className="fw-semibold">Delivery Address:</span> <br />{order && order.deliveryAddress}</p>
                    <p><span className="fw-semibold">Order Time: </span><br />{order && new Date(Date.parse(order.createdAt)).toLocaleString()}</p>
                    <p><span className="fw-semibold">Order Status: </span><br />{order && order.status}</p>
                    <p><span className="fw-semibold">Order List:</span></p>
                </div>
                {order && order.status === "waiting payment"
                    ? <div className="col col-12 col-md-6 d-flex flex-column align-items-center justify-content-evenly mb-2">
                        <div className="fw-semibold">Payment:</div>
                        <div>Please do your payment!</div>
                        <button className="btn btn-sm btn-success m-0" onClick={confirmPayment}>Confirm Payment</button>
                    </div>
                    : order && order.status === "paid"
                        ? <div className="col col-12 col-md-6 d-flex flex-column align-items-center justify-content-evenly mb-2">
                            <div>Your order paid!</div>
                            <button className="btn btn-sm btn-warning m-0 text-light" disabled>Waiting Comfirmation</button>
                        </div>
                        : null
                }
            </div>
            <div className="list-group mb-2">
                {order && <OrderList />}
            </div>
            <p className="text-end fw-bold">Order Total: {order && viewRP(order.total)}</p>
        </div>
    );
}

export default OrderDetail;