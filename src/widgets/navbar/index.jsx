import { NavLink} from "react-router-dom";
import UserMenu from "./userMenu";
import "./index.scss"
import CartIcon from "./cartIcon";
import { useSelector } from "react-redux";

const Navbar = (props) => { 
    const user = useSelector(state => state.slice.userData);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink to="/" className="navbar-brand">Tech Shop</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink to="/" className={"nav-link"}>Home</NavLink>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        {user ? (user.role === "admin") ? null : <CartIcon /> : <CartIcon />}
                        <UserMenu />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;