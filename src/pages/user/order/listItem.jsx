import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.scss"

const ListItem = (props) => { 
    const [thumbnail, setThubnail] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const location = useLocation();

    useEffect(() => { 
        setThubnail(props.product.thumbnail)
        let qnt = 0
        let total = 0
        props.product.orderItems.forEach(item => {
            qnt += item.quantity
            total += item.total
        })
        setQuantity(qnt)
        setTotalOrder(total + props.product.deliveryFee)
    }, [props])

    let date = new Date(Date.parse(props.product.createdAt))
    return (
        <div className="list-group-item list-group-item-action d-flex flex-column align-items-start ps-0 pe-0" >
            <div className="d-flex flex-row justify-content-between w-100 p-0">
                <div className={
                    props.product.status === "waiting payment" ? "text-warning"
                        : props.product.status === "waiting delivery" ? "text-primary"
                            : props.product.status === "delivered" ? "text-success"
                                : "text-danger"
                }>{props.product.status}</div>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center w-100 ps-0 pe-0">
                <Link to={"/user/order/" + props.product._id} state={{ from: location }} className="d-flex flex-row w-100 no-decor">
                    <div className="list-image m-2">
                        <img className="w-100 h-100 image-square" src={thumbnail} alt="product" />
                    </div>
                    <div>
                        <div>Order Number: {props.product.order_number}</div>
                        <div>{quantity} {quantity === 1 ? "item" : "items"}</div>
                        <div>{date.toLocaleString()}</div>
                    </div>
                </Link>
                <div className="d-flex flex-column align-items-end">
                    <div>Total Order:</div>
                    <h5 className="text-right">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalOrder)}</h5>
                    {props.product.status === "waiting payment" ? <button className="btn btn-sm btn-success m-0">Confirm Payment</button> 
                        : props.product.status === "waiting delivery" ? null
                            : props.product.status === "delivered" ? <button className="btn btn-sm btn-success m-0">Confirm Received</button>
                                : null
                    }
                    {props.product.status === "waiting payment"
                        && <button className="btn btn-link no-decor m-0 p-0 text-danger">Cancel Order</button>
                    }
                </div>
            </div>
            
        </div>           
    )
}

export default ListItem;