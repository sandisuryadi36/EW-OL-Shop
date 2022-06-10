import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

const CartIcon = () => { 
    const cartCount = useSelector(state => state.slice.cartCount);

    if (cartCount > 0) {
        return (
            <Link to="/user/cart/" className="cart-icon me-3">
                <i className="bi bi-cart position-relative">
                    <span className="position-absolute top-0 start-100 translate-middle p-1 mt-1 bg-danger rounded-circle">
                        <span className="visually-hidden">New alerts</span>
                    </span></i>
            </Link>
        )
    } else { 
        return (
            <Link to="/user/cart/" className="cart-icon me-3">
                <i className="bi bi-cart position-relative"></i>
            </Link>
        )
    }
}

export default CartIcon;