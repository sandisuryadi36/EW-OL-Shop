import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../app/data/fetching";
import * as c from '../../../app/data/constants'

const OrderDetail = () => { 
    const params = useParams();
    const orderNumber = params.id;
    const [order, setOrder] = useState(null);

    useEffect(() => { 
        axios.get(c.API_URL + `/api/v1/invoice/${orderNumber}`).then(res => { 
            setOrder(res.data.data)
        })
    }, [setOrder, orderNumber])

    const OrderList = () => { 
        return (
            order.order.map((item, key) => { 
                return (
                    <div key={key} className="d-flex flex-row justify-content-between align-items-center w-100 ps-0 pe-0">
                        <div className="list-image m-2">
                            <img className="w-100 h-100" src={item.product.image.filePath} alt="product" />
                        </div>
                        <div>
                            <div>{item.product.name}</div>
                            <div>{item.quantity} {item.quantity === 1 ? "item" : "items"}</div>
                            <div>{item.total}</div>
                        </div>
                    </div>
                )
            }))
    }
    
    return (
        <div className="p-2">
            <h1>Order Detail</h1>
            <p>Order Number: {orderNumber}</p>
            <p>Delivery Address: <br />{order && (
                order.deliveryAddress.detail + ", " +
                order.deliveryAddress.kelurahan + ", " +
                order.deliveryAddress.kecamatan + ", " +
                order.deliveryAddress.kota + ", " +
                order.deliveryAddress.provinsi
            )}</p>
            <p>Order Time: <br />{order && new Date(Date.parse(order.createdAt)).toLocaleString()}</p>
            <p>Order Status: <br />{order && order.paymentStatus}</p>
            <p>Order List:</p>
            <div className="list-group">
                {order && <OrderList />}
            </div>
            <p>Order Total: {order && new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.total)}</p>
        </div>
    );
}

export default OrderDetail;