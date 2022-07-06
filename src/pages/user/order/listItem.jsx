import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { viewRP } from "../../../app/script";
import Spinner from "../../../component/spinner";
import "./index.scss"
import * as scr from "./script"

const ListItem = (props) => {
    const [thumbnail, setThubnail] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(props.order.status);
    const location = useLocation();

    useEffect(() => {
        setThubnail(props.order.thumbnail)
        let qnt = 0
        let total = 0
        props.order.orderItems.forEach(item => {
            qnt += item.quantity
            total += item.total
        })
        setQuantity(qnt)
        setTotalOrder(total + props.order.deliveryFee)
    }, [props])

    function cancelHandler(e) {
        e.preventDefault()
        if (window.confirm("Are you sure want to cancel this item?")) {
            props.cancelOrder(props.order._id)
        }
    }

    function confirmPayment() {
        setLoading(true)
        scr.confirmPayment(props.order).then(res => { 
            if (!res.error) {
                setStatus("paid")
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

    let date = new Date(Date.parse(props.order.createdAt))
    return (
        <div className="list-group-item list-group-item-action d-flex flex-column align-items-start ps-0 pe-0" >
            {loading && <Spinner />}
            <div className="d-flex flex-row justify-content-between w-100 p-0">
                <div className={
                    status === "waiting payment" ? "text-warning fw-semibold"
                        : status === "paid" ? "text-success fw-semibold"
                            : status === "processing" ? "text-primary fw-semibold"
                                : status === "waiting delivery" ? "text-primary fw-semibold"
                                    : status === "delivered" ? "text-success fw-semibold"
                                        : "text-danger fw-semibold"
                }>{status}</div>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center w-100 ps-0 pe-0">
                <Link to={"/user/order/" + props.order._id} state={{ from: location }} className="d-flex flex-row w-100 no-decor">
                    <div className="list-image m-2">
                        <img className="w-100 h-100 image-square" src={thumbnail} alt="order" />
                    </div>
                    <div>
                        <div>Order Number: {props.order.order_number}</div>
                        <div>{quantity} {quantity === 1 ? "item" : "items"}</div>
                        <div>{date.toLocaleString()}</div>
                    </div>
                </Link>
                <div className="d-flex flex-column align-items-end">
                    <div>Total Order:</div>
                    <h5 className="text-right">{viewRP(totalOrder)}</h5>
                    {status === "waiting payment" ? <button className="btn btn-sm btn-success m-0" onClick={confirmPayment}>Confirm Payment</button>
                        : status === "paid" ? <button className="btn btn-sm btn-warning m-0 text-light" disabled>Waiting Confirmation</button>
                            : status === "waiting delivery" ? null
                                : status === "delivered" ? <button className="btn btn-sm btn-success m-0">Confirm Received</button>
                                    : null
                    }
                    {status === "waiting payment"
                        && <button className="btn btn-link no-decor m-0 p-0 text-danger" onClick={cancelHandler}>Cancel Order</button>
                    }
                </div>
            </div>

        </div>
    )
}

export default ListItem;