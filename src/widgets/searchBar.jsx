import { useNavigate } from "react-router-dom";

const SearchBar = (props) => {
    const navigate = useNavigate();

    // set search text
    const searchHandler = (e) => {
        // if enter key is pressed
        if (e.key === "Enter") { 
            let text = e.target.value
            text === "" ? navigate("/") : navigate("/search/" + text)
        }
    }

    return (
        <input id="searchBar" className={"form-control " + props.className} type="text" placeholder={props.placeholder} onKeyUp={e => searchHandler(e)} />
    )
}

export default SearchBar;