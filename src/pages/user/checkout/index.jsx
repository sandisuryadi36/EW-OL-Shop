import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../../component/Input";
import * as c from '../../../app/data/constants'
import AddressOptions from "./option";
import axios from "axios";

const Checkout = () => { 
    const totalCart = useSelector(state => state.slice.totalCart);
    const cartItems = useSelector(state => state.slice.cartItems);
    const [addresses, setAddresses] = useState([])
    const [addressString, setAddressString] = useState("");

    useEffect(() => {
        if (addresses.length < 1) {
            axios.get(c.API_URL + "/api/v1/delivery-address").then(res => setAddresses(res.data.data))
        }
    }, [addresses])

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

    const selectHandler = async (e) => { 
        if (e.target.value === "" || e.target.value === "new") {
            setAddressString("")
        } else {
            const item = await addresses.find(address => address._id === e.target.value)
            setAddressString(
                item.detail + ", " +
                item.kelurahan + ", " +
                item.kecamatan + ", " +
                item.kota + ", " +
                item.provinsi
            )
        }
    }

    // const handleOption = (e) => { 
    //     setAddresses(e)
    // }

    return (
        <div className="d-flex flex-column gap-3 align-items-end">
            <div className="container-fluid mt-2">
                <h3 className="text-black">Your Cart</h3>
            </div>
            <div className="container-fluid">
                <ul className="list-group">
                    {cartItems.map((item, index) => <ItemList key={index} product={item} />)}
                </ul>
            </div>
            <div className="d-flex flex-column align-items-start container-fluid">
                <Input
                    divclass="d-flex flex-row align-items-center"
                    labelclass="w-100"
                    inputclass= "mb-0"
                    name="deliveery-address"
                    type="select"
                    placeholder="Delivery Address..."
                    label="Delivery Address"
                    onChange={selectHandler}
                >
                    <option value="">Select Address</option>
                    <AddressOptions addresses={addresses} />
                    <option value="new">Add New Address</option>
                </Input>
                {addressString !== "" && <div className="text-secondary">{addressString}</div>}
            </div>
            <div className="d-flex justify-content-end align-intems-center p-3 bg-warning rounded w-100" >
                <h5 className="m-0">Total: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalCart)}</h5>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-lg btn-success btn-block">Process Transaction</button>
            </div>
        </div>
    )
}

export default Checkout;