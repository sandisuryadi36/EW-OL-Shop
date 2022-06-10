import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as c from '../../../app/data/constants'
import { getCart, setSlice } from "../../../app/data/slice";

const ListItem = (props) => {
    const cartCount = useSelector(state => state.slice.cartCount);
    const item = props.product
    const dispatch = useDispatch()
    const [count, setCount] = useState(props.product.quantity);
    const [product, setProduct] = useState();

    useEffect(() => {
        axios.get(c.API_URL + "/api/v1/product/" + props.product.product).then(res => setProduct(res.data.data))
    }, [props])

    const Counter = (props) => {

        const counterHandler = (e) => {
            const updateCart = (val) => {
                axios.put(c.API_URL + "/api/v1/cart", { product: props.product.product, quantity: val }).then((res) => {
                    setCount(res.data.data.quantity)
                    console.log(res.data.data.quantity)
                })
            }
            switch (e.target.value) {
                case "add":
                    if (count < product.stock) {
                        updateCart(count + 1)
                        dispatch(setSlice({ cartCount: cartCount + 1 }))
                    }
                    break
                case "sub":
                    if (count > 0) {
                        updateCart(count - 1)
                        dispatch(setSlice({ cartCount: cartCount - 1 }))
                    }
                    break
                default:
                    return
            }
        }

        return (
            <div className="counter d-flex flex-row justify-content-between">
                <button className="btn btn-sm btn-success" value="sub" onClick={counterHandler}>-</button>
                <span className="list-counter">{count}</span>
                <button className="btn btn-sm btn-success" value="add" onClick={counterHandler}>+</button>
            </div>
        )
    }

    return (
        <li className="container-fluid list-group-item d-flex flex-row justify-content-between" >
            <div className="d-flex flex-row align-items-center">
                <div className="cart-list-img m-2" >
                    <img className="w-100 h-100 image-square" src={item.imageUrl} alt={item.product.name} />
                </div>
                <div>{item.productName}</div>
            </div>
            <div className="d-flex flex-row justify-content-end align-items-center col-4">
                <div className="d-flex flex-column align-items-end justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <Counter product={item} />
                    </div>
                    <h6 className="mb-0">Price: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.price * count)}</h6>
                </div>
                <div>
                    <button className="btn btn-link cart-delete bi bi-trash-fill text-danger ms-2 me-1" onClick={() => {
                        if (window.confirm("Are you sure you want to delete this item?")) {
                            axios.delete(c.API_URL + "/api/v1/cart/" + item._id).then((res) => {
                                dispatch(setSlice({ cartCount: cartCount - count }))
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