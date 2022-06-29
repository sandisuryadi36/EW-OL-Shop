import { viewRP } from "../../../app/script";

const OrderModal = (props) => {
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
                                        : null
                                }>{props.order.status.toUpperCase()}</div>
                            </div>
                            <div className="d-flex flex-column modal-body pt-1">
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
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger">Reject</button>
                                <button type="button" className="btn btn-success">Precess</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderModal;