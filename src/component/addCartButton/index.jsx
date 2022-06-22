import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCart, putCart, setSlice } from "../../app/data/slice";

const AddCartButton = (props) => { 
    const logedIn = useSelector(state => state.slice.logedIn);
    const user = useSelector(state => state.slice.userData);
    const cartItems = useSelector(state => state.slice.cartItems);
    const location = useLocation()
    const navigate = useNavigate()
    const [productCount, setProductCount] = useState(0);
    const { product } = props;
    const dispatch = useDispatch();

    const addCartHandler = () => { 
        if (!logedIn) { 
            navigate("/login", { state: { from: location } })
            return
        }

        const productID = product._id ? product._id : product.productID
        const productInCart = ((cartItems.length > 0) && (cartItems.find((item) => item.product === productID)))
            ? (cartItems.find((item) => item.product === productID))
            : ""
        const payload = {
            product: productID,
            quantity: (productCount !== 0 ? productCount : 1 ) + (productInCart !== "" ? productInCart.quantity : 0)
        }
        dispatch(putCart(payload)).then(() => { 
            dispatch(getCart()).then((res) => {
                let itemCount = 0
                res.payload.data.forEach((item) => {
                    itemCount += item.quantity
                })
                dispatch(setSlice({ cartCount: itemCount }))
            })
            setProductCount(0)
        })
    }

    const Counter = () => { 
        return (
            <div className="counter w-100 d-flex flex-row justify-content-between">
                <button className="btn btn-sm btn-success px-3" onClick={() => {if (productCount > 0) { setProductCount(productCount - 1)}}}>-</button>
                <span>{productCount}</span>
                <button className="btn btn-sm btn-success px-3" onClick={() => {if (productCount < product.stock) {setProductCount(productCount + 1)}}}>+</button>
            </div>
        )
    }

    const CartElement = () => { 
        return (
            <div className="d-flex flex-row flex-md-column align-items-center align-items-md-end">
                {props.detail && <Counter />}
                <div className="add-cart-button w-100">
                    <button onClick={addCartHandler} className={"btn my-2 py-1" + (props.detail ? " btn-success" : " btn-sm btn-outline-success")}>
                        <i className="bi bi-cart-plus me-1"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        )
    }

    if (user) {
        if (user.role !== "admin") { 
            return (
                <CartElement />
            )
        }
    } else {
        return (
            <CartElement />
        )
    }
}

export default AddCartButton;