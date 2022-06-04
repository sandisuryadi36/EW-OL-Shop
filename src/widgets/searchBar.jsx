import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
    const navigate = useNavigate();
    const [queryText, setQueryText] = useState("");
    const input = document.getElementById("searchBar");

    useEffect(() => {
        setQueryText(props.search)
    }, [props])

    // set search text
    let timer = null;
    const searchHandler = (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            let text = e.target.value
            input.value = text
            setQueryText(text);
            text === "" ? navigate("/") : navigate("/product?search=" + text)
        }, 500)
    }

    const clearButtonHandler = () => { 
        input.value = ""
        setQueryText("");
        navigate("/")
    }

    return (
        <div className="position-relative">
            <input id="searchBar" defaultValue={queryText} className={"form-control " + props.className} type="text" placeholder={props.placeholder} onKeyUp={e => searchHandler(e)} />
            {queryText !== "" && <button type="button" className="btn-close position-absolute top-50 end-0 translate-middle" aria-label="Close" onClick={clearButtonHandler}></button>}
        </div>
    )
}

export default SearchBar;