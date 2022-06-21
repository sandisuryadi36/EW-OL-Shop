import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as c from '../../app/data/constants'
import Input from "../../component/Input";

const Filter = (props) => {
    const [params] = useSearchParams();
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const defaultCategory = params.get("category");

    useEffect(() => { 
        axios.get(c.API_URL + "/api/v1/category")
        .then(res => {
            setCategory(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    function sendCategory(e) {
        props.category(e.target.value)
        navigate("/product?search=" + props.search
            + "&category=" + e.target.value
        )
    }

    return (
        <div className="mt-2 p-2">
            <h4>Filter</h4>
            <div>
                <Input type="select" name="category" id="categoryOption" value={defaultCategory} label="Category" inputclass="mb-3" onChange={sendCategory}>
                    <option value="">All</option>
                    {category.map((cat, key) => {
                        return <option key={key} value={cat.name}>{cat.name}</option>
                    })}
                </Input>
            </div>
            <div>
                <div>Tags</div>
            </div>
        </div>
    )
}

export default Filter;