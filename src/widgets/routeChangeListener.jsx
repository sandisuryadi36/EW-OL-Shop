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
                    dispatch(getCart()).then((res) => {
                        let itemCount = 0
                        res.payload.data.forEach((item) => {
                            itemCount += item.quantity
                        })
                        dispatch(setSlice({ cartCount: itemCount }))
                    })
                }
            })
        }
        routeChange();
    }, [dispatch, location]);
}

export default RouteChangeListener;