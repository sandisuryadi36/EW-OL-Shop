import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../component/Input";
import * as c from '../../../app/data/constants'
import AddressOptions from "./option";
import axios from "../../../app/data/fetching";
import AddAddress from "../address/addAddress";
import { useNavigate, Link } from "react-router-dom";
import { clearCart } from "../../../app/data/slice";

const Checkout = () => { 
    const totalCart = useSelector(state => state.slice.totalCart);
    const cartItems = useSelector(state => state.slice.cartItems);
    const [addresses, setAddresses] = useState([])
    const [addressString, setAddressString] = useState("");
    const [delivFee, setDelivFee] = useState(15000);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (addresses.length < 1) {
            axios.get(c.API_URL + "/api/v1/delivery-address").then(res => setAddresses(res.data.data))
        }
    }, [addresses])

    const updateListHandler = (address) => {
        axios.get(c.API_URL + "/api/v1/delivery-address").then(res => setAddresses(res.data.data))
    }

    const ItemList = (props) => { 
        const {product} = props;
        return (
            <li className="list-group-item d-flex flex-row justify-content-between align-items-center w-100" >
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="cart-list-img m-2" >
                        <img className="w-100 h-100 image-square" src={product.imageUrl} alt={product.productName} />
                    </div>
                    <div>{product.productName}</div>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <div>Qty: {product.quantity}</div>
                    <div>Price: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.total)}</div>
                </div>
            </li>
        )
    }

    const selectHandler = (e) => { 
        const item = addresses.find(address => address._id === e.target.value)
        setAddressString(
            item.detail + ", " +
            item.kelurahan + ", " +
            item.kecamatan + ", " +
            item.kota + ", " +
            item.provinsi
        )
    }

    const submitOrderHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        if (formData.get("delivery-address") !== null) { 
            let payload = {
                deliveryAddressID: formData.get("delivery-address"),
                deliveryFee: formData.get("delivery-fee"),
            }
            axios.post(c.API_URL + "/api/v1/order", payload).then(res => {
                if (res.data.message === "Order successfully created") {
                    window.alert("Order successfully created")
                    dispatch(clearCart())
                    navigate("/user/order")
                }
            })
        }
    }

    return (
        <div className="d-flex flex-column gap-3 align-items-end">
            <div className="container-fluid mt-2 d-flex flex-row justify-content-between align-items-center">
                <h3 className="text-black">Your Cart</h3>
                <Link to="/user/cart" className="btn btn-link no-decor">
                    <i className="bi bi-chevron-left"></i>
                    back
                </Link>
            </div>
            <div className="container-fluid">
                <ul className="list-group">
                    {cartItems.map((item, index) => <ItemList key={index} product={item} />)}
                </ul>
            </div>
            <form id="checkoutForm" onSubmit={submitOrderHandler} className="d-flex flex-column align-items-end container-fluid">
                <div className="d-flex flex-row justify-content-end align-items-end container-fluid p-0">
                    <button className="btn btn-link ms-2 me-2 mb-2 p-0 border-0" data-bs-toggle="modal" data-bs-target={"#addAddress"}>Add New Address</button>
                    <div className="d-flex flex-column align-items-end col-3">
                        <Input
                            divclass="d-flex flex-column align-items-end container-fluid p-0"
                            // labelclass=""
                            inputclass= "mb-2"
                            name="delivery-address"
                            type="select"
                            placeholder="Delivery Address..."
                            label="Delivery Address"
                            devault="DEFAULT"
                            onChange={selectHandler}
                        >
                            <option value="DEFAULT" disabled>Select Address</option>
                            <AddressOptions addresses={addresses} />
                        </Input>
                    </div>
                </div>
                {addressString !== "" && <div className="text-secondary">{addressString}</div>}
                <Input
                    divclass="col-3 d-flex flex-column align-items-end mt-2"
                    labelclass=""
                    inputclass="mb-2"
                    name="delivery-fee"
                    type="select"
                    placeholder="Shipment..."
                    label="Shipment"
                    onChange={(e) => setDelivFee(parseInt(e.target.value))}
                >
                    <option value={15000} >Regular</option>
                    <option value={25000}>Express</option>
                </Input>
                {delivFee !== "" &&
                <div className="text-secondary">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(delivFee)}
                </div>}
            </form>
            <AddAddress updateAddress={updateListHandler} />
            <div className="d-flex justify-content-end align-intems-center p-3 bg-warning rounded w-100" >
                <h5 className="m-0">Total: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format((totalCart + delivFee))}</h5>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-lg btn-success btn-block mb-5" type="submit" form="checkoutForm">Process Order</button>
            </div>
        </div>
    )
}

export default Checkout;