import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = (props) => {
    const navigate = useNavigate();
    const [queryText, setQueryText] = useState("");
    const [category, setCategory] = useState("");
    const input = document.getElementById("searchBar");
    const currentLocation = useSelector(state => state.slice.currentLocation);

    useEffect(() => {
        setQueryText(props.search)
        setCategory(props.category)
    }, [props])

    // set search text
    let timer = null;
    const searchHandler = (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            let text = e.target.value
            input.value = text
            setQueryText(text);
            navigate("/product?search=" + text
                + "&category=" + category
                )
        }, 500)
    }

    const clearButtonHandler = () => { 
        input.value = ""
        setQueryText("");
        navigate("/product?search=" + input.value
            + "&category=" + category
        )
    }

    return (
        <div className="position-relative d-flex flex-row align-items-center">
            {currentLocation && currentLocation.pathname === "/"
                ? <Link to="/product">
                    <button type="button" className="filter-btn btn brn-link" data-bs-toggle="tooltip" data-bs-placement="bottom" title="filter">
                        <i className="bi bi-filter"></i>
                    </button>
                </Link>
                : null
            }
            <input id="searchBar" defaultValue={queryText} className={"form-control " + props.className} type="text" placeholder={props.placeholder} onKeyUp={e => searchHandler(e)} />
            {(queryText && queryText !== "") && <button type="button" className="btn-close position-absolute top-50 end-0 translate-middle" aria-label="Close" onClick={clearButtonHandler}></button>}
        </div>
    )
}

export default SearchBar;