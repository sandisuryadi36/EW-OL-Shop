import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as c from '../../../app/data/constants'
import Spinner from "../../../component/spinner";
import { config } from "../../../app/axiosSet";

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
                            <div>{order && new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.total)}</div>
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
                            if (location.state.from.search) {
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
                    && <div className="col col-12 col-md-6 d-flex flex-column align-items-center justify-content-evenly">
                        <div className="fw-semibold">Payment:</div>
                        <div>Please do your payment!</div>
                        <button className="btn btn-sm btn-success m-0">Confirm Payment</button>
                    </div>
                }
            </div>
            <div className="list-group mb-2">
                {order && <OrderList />}
            </div>
            <p className="text-end fw-bold">Order Total: {order && new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.total)}</p>
        </div>
    );
}

export default OrderDetail;