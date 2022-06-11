import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCart, loginCheck, setSlice } from "../app/data/slice";

const RouteChangeListener = () => { 
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        async function routeChange() {
            dispatch(setSlice({ currentLocation: location.pathname }))
            dispatch(setSlice({ data: [] }))
            dispatch(loginCheck()).then((res) => { 
                if (res.payload.login) {
                    dispatch(getCart())
                }
            })
        }
        routeChange();
    }, [dispatch, location]);
}

export default RouteChangeListener;