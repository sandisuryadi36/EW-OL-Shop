import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setSlice } from "../app/data/slice";

const RouteChangeListener = () => { 
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(setSlice({ status: "idle" }));
    }, [location, dispatch]);
}

export default RouteChangeListener;