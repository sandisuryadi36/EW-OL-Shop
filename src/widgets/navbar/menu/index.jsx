import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogout, setSlice } from "../../../app/data/slice";
import MenuList from "./menuList";

const MainMenu = () => {
    const logedIn = useSelector(state => state.slice.logedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(postLogout()).then((res) => { 
            if (!res.payload.login) {
                localStorage.removeItem("token");
                dispatch(setSlice({ data: [] }))
                navigate("/")
            }
        })
    }

    if (logedIn) {
        return (
            <div className="dropdown">
                <button className="btn btn-link text-light fs-3 p-0 mx-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="bi bi-person-circle"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                    <MenuList />
                    <div className="dropdown-divider"></div>
                    <button onClick={logoutHandler} className="btn-link no-m dropdown-item" >Logout</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="dropdown">
                <button className="btn btn-link text-light fs-3 p-0 mx-0" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="bi bi-person-circle"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                    <button onClick={() => navigate("/login")} className="btn-link no-m dropdown-item">Login</button>
                    <button onClick={() => navigate("/register")} className="btn-link no-m dropdown-item" >Register</button>
                </div>
            </div>
        )
    }
}

export default MainMenu;