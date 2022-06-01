import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { loginCheck, setSlice } from "../app/data/slice";

const RouteChangeListener = () => { 
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        async function routeChange(){
            dispatch(setSlice({ data: [] }))
            dispatch(loginCheck())
                .then(() => { 
                    if (location.pathname.startsWith("/search/") === false) {
                        document.getElementById("searchBar").value = "";
                    } else {
                        document.getElementById("searchBar").value = location.pathname.substring(8);
                    }
                })
                // .then(() => dispatch(setSlice({ status: "idle" })))
        }
        routeChange();
    }, [location.pathname, dispatch]);
}

export default RouteChangeListener;