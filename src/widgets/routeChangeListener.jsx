import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setSlice } from "../app/data/slice";

const RouteChangeListener = () => { 
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(setSlice({ status: "idle" }));
        dispatch(setSlice({ data: [] }));
        if (location.pathname.startsWith("/search/") === false) {
            document.getElementById("searchBar").value = "";
        } else {
            document.getElementById("searchBar").value = location.pathname.substring(8);
        }
    }, [location, dispatch]);
}

export default RouteChangeListener;