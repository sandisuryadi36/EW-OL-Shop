import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Checkout from "./checkout";
import "./index.scss";
import ListItem from "./itemList";

const Cart = (props) => { 
    const cartItems = useSelector(state => state.slice.cartItems);
    const navigate = useNavigate();

    const CartItemList = () => { 
        if (cartItems.length > 0) {
            return (
                <ul className="list-group list-group-flush d-flex flex-column">
                    {cartItems.map((item, key) => {
                        return (
                            <ListItem product={item} key={key} />
                        )
                    })}
                </ul>
            )
        } else {
            return (
                <div className="d-flex flex-column align-items-center gap-3">
                    <h5 className="m-0 bg-warning rounded p-2 w-100 text-center">Your cart is empty</h5>
                    <button className="btn btn-lg btn-success btn-block" onClick={() => navigate("/")}>Continue Shopping</button>
                </div>
            )
        }
    }

    return (
        <div className="pt-2">
            <h3>Cart</h3>
            <CartItemList />
            {cartItems.length > 0 && <Checkout />}
        </div>
    )
}

export default Cart;