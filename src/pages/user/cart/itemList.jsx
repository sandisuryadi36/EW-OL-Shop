import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as c from '../../../app/data/constants'
import { addToCart, subFromCart, getCart, setSlice } from "../../../app/data/slice";
import Spinner from "../../../component/spinner";
import { config } from "../../../app/axiosSet";

const ListItem = (props) => {
    const cartCount = useSelector(state => state.slice.cartCount);
    const location = useLocation();
    const item = props.product
    const dispatch = useDispatch()
    const [count, setCount] = useState(props.product.quantity);
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(c.API_URL + "/api/v1/product/" + props.product.product, config(localStorage.getItem("token"))).then(res => setProduct(res.data.data))
    }, [props])

    const Counter = (props) => {

        const counterHandler = (e) => {
            const updateCart = (val) => {
                setLoading(true);
                axios.put(c.API_URL + "/api/v1/cart", { product: props.product.product, quantity: val }, config(localStorage.getItem("token"))).then((res) => {
                    setLoading(false);
                    setCount(res.data.data.quantity)
                })
            }
            switch (e.target.value) {
                case "add":
                    if (count < product.stock) {
                        updateCart(count + 1)
                        dispatch(setSlice({ cartCount: cartCount + 1 }))
                        dispatch(addToCart({ price: props.product.price }))
                    } else {
                        alert("Not enough product")
                    }
                    break
                case "sub":
                    if (count > 1) {
                        updateCart(count - 1)
                        dispatch(setSlice({ cartCount: cartCount - 1 }))
                        dispatch(subFromCart({ price: props.product.price }))
                    }
                    break
                default:
                    return
            }
        }

        return (
            <div className="counter d-flex flex-row justify-content-between position-realtive">
                {loading && <Spinner child={true} overlay={true} />}
                <button className="btn btn-sm btn-success" value="sub" onClick={counterHandler}>-</button>
                <span className="list-counter">{count}</span>
                <button className="btn btn-sm btn-success" value="add" onClick={counterHandler}>+</button>
            </div>
        )
    }

    return (
        <li className="list-group-item d-flex flex-column flex-md-row justify-content-between ps-0 pe-0" >
            <Link to={"/product/"+item.product} className="d-flex flex-row align-items-center text-black" state={{ from: location }}>
                <div className="cart-list-img m-2" >
                    <img className="w-100 h-100 image-square" src={item.imageUrl} alt={item.product.name} />
                </div>
                <div>{item.productName}</div>
            </Link>
            <div className="d-flex flex-row justify-content-between justify-content-md-end align-items-center col-md-4">
                <div className="d-flex flex-md-column justify-content-between align-items-center align-items-md-end">
                    <div className="d-flex flex-row align-items-center">
                        <Counter product={item} />
                    </div>
                    <div className="m-1">Price: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price * count)}</div>
                </div>
                <div>
                    <button className="btn btn-link cart-delete bi bi-trash-fill text-secondary ms-2 me-1" onClick={() => {
                        if (window.confirm("Are you sure you want to delete this item?")) {
                            axios.delete(c.API_URL + "/api/v1/cart/" + item._id, config(localStorage.getItem("token"))).then((res) => {
                                dispatch(setSlice({ cartCount: cartCount - count }))
                                dispatch(subFromCart({ price: item.total }))
                                dispatch(getCart())
                            })
                        }
                    }}
                    ></button>
                </div>
            </div>
        </li>
    )
}

export default ListItem