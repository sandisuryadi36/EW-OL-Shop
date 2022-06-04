import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { postLogout } from "../app/data/slice";

const Navbar = () => { 
    const logedIn = useSelector(state => state.slice.logedIn);
    const user = useSelector(state => state.slice.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutHandler = () => { 
        dispatch(postLogout()).then(() => navigate("/"));
    }

    const UserMenu = () => { 
        if (logedIn) {
            return (
                <div className="dropdown">
                    <button className="btn btn-secondary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {user.full_name}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link to={"/"+ user.role + "/dashboard"} className="dropdown-item">Dashboard</Link>
                        <button onClick={logoutHandler} className="btn-link dropdown-item" >Logout</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="dropdown">
                    <button className="btn btn-secondary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Login
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link to="/login" className="dropdown-item">Login</Link>
                        <Link to="" className="dropdown-item" >Register</Link>
                    </div>
                </div>
            )
        }    
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
                    <UserMenu />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;