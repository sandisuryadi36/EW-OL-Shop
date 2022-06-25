import { NavLink } from "react-router-dom";
import MainMenu from "./menu";
import "./index.scss"
import CartIcon from "./cartIcon";
import { useSelector } from "react-redux";

const Navbar = (props) => { 
    const user = useSelector(state => state.slice.userData);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink to="/" className="navbar-brand">Tech Shop</NavLink>
                <div className="justify-content-end" >
                    <div className="d-flex align-items-center gap-3 gap-md-4">
                        {user ? (user.role === "admin") ? null : <CartIcon /> : <CartIcon />}
                        <MainMenu />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;