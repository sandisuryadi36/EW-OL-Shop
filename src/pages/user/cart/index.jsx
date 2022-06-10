import { useSelector } from "react-redux";
import "./index.scss";
import ListItem from "./itemList";

const Cart = (props) => { 
    const cartItems = useSelector(state => state.slice.cartItems);

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
        }
    }

    return (
        <div>
            <h3>cart</h3>
            <CartItemList />
        </div>
    )
}

export default Cart;