import { useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import SearchBar from "./searchBar";
import Filter from './filter';
import ListProduct from "./list";

const Search = () => {
    const [params] = useSearchParams();
    const [category, setCategory] = useState(params.get("category"));
    const [tags, setTags] = useState(params.get("tags"));
    let keyword = params.get("search")
    if (keyword === null) keyword = ""

    function sendCategory(category) {
        setCategory(category)
    }

    function sendTags(tags) {
        setTags(tags)
    }

    return (
        <div className="row">
            <div className="col-12 col-md-3">
                <Filter category={sendCategory} tags={sendTags} search={keyword} />
            </div>
            <div className="col-12 col-md-9">
                <SearchBar placeholder="Search..." className="rounded-3 mt-3" search={keyword} category={category} tags={tags} />
                <div className="pt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                    <ListProduct />
                </div>
            </div>
        </div>
    );
}

export default Search;