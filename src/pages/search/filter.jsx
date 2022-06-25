import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as c from '../../app/data/constants'
import Input from "../../component/Input";
import "./index.scss";

const Filter = (props) => {
    const [params] = useSearchParams();
    const [category, setCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    let defaultCategory = params.get("category");
    if (defaultCategory === null) defaultCategory = "";
    let tagsQuery = getTagsParam()

    function getTagsParam() {
        let paramString = params.get("tags")
        if (paramString !== null) {
            if (paramString.indexOf(",") === -1) {
                return [paramString]
            } else {
                return paramString.split(",")
            }
        } else {
            return []
        }
    }

    useEffect(() => {
        axios.get(c.API_URL + "/api/v1/category")
            .then(res => {
                setCategory(res.data.data)
            }).catch(err => {
                console.log(err)
            })

        axios.get(c.API_URL + "/api/v1/tag")
            .then(res => {
                setTags(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function sendCategory(e) {
        props.category(e.target.value)
        navigate("/product?search=" + props.search
            + "&category=" + e.target.value
            + "&tags=" + tagsQuery
        )
    }

    function sendTags(e) {
        const checkBox = e.target
        if (tagsQuery[0] !== "") {
            if (checkBox.checked) {
                tagsQuery.push(checkBox.value)
            } else {
                tagsQuery = tagsQuery.filter(value => value !== checkBox.value)
            }
        } else tagsQuery = [checkBox.value]

        props.tags(tagsQuery)
        navigate("/product?search=" + props.search
            + "&category=" + defaultCategory
            + "&tags=" + tagsQuery)
    }

    return (
        <div className="mt-2 p-2">
            <h4>Filter</h4>
            <div>
                <Input type="select" name="category" id="categoryOption" value={defaultCategory} label="Category" labelclass="fw-semibold" inputclass="mb-3" onChange={sendCategory}>
                    <option value="">All</option>
                    {category.map((cat, key) => {
                        return <option key={key} value={cat.name}>{cat.name}</option>
                    })}
                </Input>
            </div>
            <div>
                <div className="fw-semibold">Has tag</div>
                <div className="d-flex flex-column align-items-start mt-1 tag-frame">
                    {tags.map((tag, key) => {
                        return <Input type="checkbox" name="tag" id={tag.name} value={tag.name} label={tag.name} key={key} inputclass="" checked={tagsQuery.includes(tag.name)} onChange={sendTags} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Filter;