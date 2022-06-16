import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCart, loginCheck, setSlice } from "../app/data/slice";

const RouteChangeListener = () => { 
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        async function routeChange() {
            dispatch(setSlice({ currentLocation: location }))
            dispatch(setSlice({ data: [] }))
            dispatch(loginCheck()).then((res) => { 
                if (res.payload.message === "jwt expired") { 
                    localStorage.removeItem("token");
                    navigate("/")
                }
                if (res.payload.login && res.payload.user.role === "user") {
                    dispatch(getCart())
                }
            })
        }
        routeChange();
    }, [dispatch, location, navigate]);
}

export default RouteChangeListener;