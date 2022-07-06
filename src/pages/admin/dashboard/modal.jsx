import axios from "axios";
import { viewRP } from "../../../app/script";
import * as c from '../../../app/data/constants'
import { config } from "../../../app/axiosSet";

const OrderModal = (props) => {

    function confirmHandler() {
        props.loading(true)
        axios.put(c.API_URL + "/api/v1/order/" + props.order._id, { status: "processing" }, config(localStorage.getItem("token")))
            .then(res => { 
                document.getElementById("closeModal").click()
                props.loading(false)
                props.update(true)
            })
    }

    function rejectHandler() {
        props.loading(true)
        axios.put(c.API_URL + "/api/v1/order/" + props.order._id, { status: "rejected" }, config(localStorage.getItem("token")))
            .then(res => { 
                props.order.orderItems.forEach(item => { 
                    axios.get(c.API_URL + "/api/v1/product/" + item.product, config(localStorage.getItem("token")))
                        .then(res => { 
                            axios.put(c.API_URL + "/api/v1/product/" + item.product, { stock: res.data.data.stock + item.quantity }, config(localStorage.getItem("token")))
                        })
                })
                document.getElementById("closeModal").click()
                props.loading(false)
                props.update(true)
            })
    }

    return (
        <div className="modal fade" id="orderModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button id="closeModal" type="button" className="btn-close visually-hidden" data-bs-dismiss="modal" aria-label="Close"></button>
                    {props.order &&
                        <>
                            <div className="modal-header">
                                <div className="fs-4 fw-semibold">Order No: {props.order.order_number}</div>
                                <div className={props.order.status === "waiting payment" ? "badge bg-warning text-light"
                                    : props.order.status === "paid" ? "badge bg-success text-light"
                                        : props.order.status === "processing" ? "badge bg-success text-light"
                                            : null
                                }>{props.order.status.toUpperCase()}</div>
                            </div>
                            <div className="d-flex flex-column modal-body pt-1 gap-1">
                                <div className="fw-semibold">Customer: {props.order.user.full_name}</div>
                                <div className="fw-semibold">Address :</div>
                                <div className="fw-light">{props.order.deliveryAddress}</div>
                                <div className="fw-semibold">Order items:</div>
                                {props.order.orderItems.map((item, key) => {
                                    return (
                                        <div key={key} className="d-flex align-items-end justify-content-between border-top my-1">
                                            <div>
                                                <div>{item.productName}</div>
                                                <div>{item.quantity} x {viewRP(item.price)}</div>
                                            </div>
                                            <div className="text-end">
                                                <div>= {viewRP(item.total)}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="d-flex justify-content-between border-top">
                                    <div>Delivery fee</div>
                                    <div>= {viewRP(props.order.deliveryFee)}</div>
                                </div>
                                <div className="d-flex justify-content-between border-top fw-bold">
                                    <div>Total</div>
                                    <div>: {viewRP(props.order.total)}</div>
                                </div>
                            </div>
                        {props.order.status !== "processing" &&
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" onClick={rejectHandler}>Reject</button>
                                <button type="button" className="btn btn-success" onClick={confirmHandler}>Precess</button>
                            </div>
                        }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderModal;