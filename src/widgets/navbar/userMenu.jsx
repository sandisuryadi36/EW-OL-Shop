import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postLogout } from "../../app/data/slice";

const UserMenu = () => {
    const logedIn = useSelector(state => state.slice.logedIn);
    const user = useSelector(state => state.slice.userData);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(postLogout()).then(() => navigate("/"));
    }

    if (logedIn) {
        return (
            <div className="dropdown">
                <button className="btn btn-secondary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {user.full_name}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link to={"/" + user.role + "/dashboard"} className="dropdown-item">Dashboard</Link>
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

export default UserMenu;