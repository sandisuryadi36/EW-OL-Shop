import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { loginCheck, setSlice } from "../app/data/slice";

const RouteChangeListener = () => { 
    const dispatch = useDispatch();
    const [params] = useSearchParams();

    useEffect(() => {
        async function routeChange(){
            dispatch(setSlice({ data: [] }))
            dispatch(loginCheck())
                .then(() => { 
                    if (params.get("search") !== null) {
                        document.getElementById("searchBar").value = params.get("search");
                    } else {
                        document.getElementById("searchBar").value = "";
                    }
                })
                // .then(() => dispatch(setSlice({ status: "idle" })))
        }
        routeChange();
    }, [params, dispatch]);
}

export default RouteChangeListener;