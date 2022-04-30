import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { postLogout } from "../app/data/slice";

const Navbar = () => { 
    const logedIn = useSelector(state => state.slice.logedIn);
    const user = useSelector(state => state.slice.userData);
    const dispatch = useDispatch();

    const logoutHandler = () => { 
        dispatch(postLogout());
    }

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
                    <ul className="navbar-nav">
                        {logedIn && (
                            <li className="nav-item active">
                                {user.role === "admin" && <NavLink to="/admin/dashboard/" className={"nav-link"}>Admin Dashboard</NavLink>}
                                {user.role === "user" && <NavLink to="/user/dashboard/" className={"nav-link"}>User Dashboard</NavLink>}
                            </li>
                        )}
                        <li className="nav-item">
                            {!logedIn
                                ? <NavLink to="/login" className={"nav-link"}>Login</NavLink>
                                : <NavLink to="/" className={"nav-link"}><span onClick={logoutHandler} >Logout</span></NavLink>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;