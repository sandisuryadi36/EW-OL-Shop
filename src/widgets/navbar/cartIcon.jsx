import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

const CartIcon = () => { 
    const cartCount = useSelector(state => state.slice.cartCount);

    if (cartCount > 0) {
        return (
            <Link to="/user/cart" className="text-light fs-4">
                <i className="bi bi-cart position-relative">
                    <div className="position-absolute top-0 start-100 translate-middle p-2 mt-1 bg-danger rounded-circle border border-white">
                        <span className="badge-count position-absolute top-50 start-50 translate-middle">{cartCount <= 99 && cartCount}</span>
                    </div>
                </i>
            </Link>
        )
    } else { 
        return (
            <Link to="/user/cart" className="text-light fs-4">
                <i className="bi bi-cart position-relative"></i>
            </Link>
        )
    }
}

export default CartIcon;