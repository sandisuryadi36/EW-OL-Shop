import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
    const navigate = useNavigate();

    // set search text
    let timer = null;
    const searchHandler = (e) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            let text = e.target.value
            text === "" ? navigate("/") : navigate("/search/" + text)
        }, 500)
    }

    return (
        <input id="searchBar" className={"form-control " + props.className} type="text" placeholder={props.placeholder} onKeyUp={e => searchHandler(e)} />
    )
}

export default SearchBar;