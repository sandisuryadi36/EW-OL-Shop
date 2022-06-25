import Input from "../../component/Input";
import Spinner from "../../component/spinner";
import { useState } from "react";
import axios from "axios";
import * as c from "../../app/data/constants"
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { config } from "../../app/axiosSet";

const AddProduct = () => { 
    const [category, setCategory] = useState([]);
    const [newCategory, setNewCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState([]);
    const [newTags, setNewTags] = useState([]);
    const navigate = useNavigate();

    async function loadCategory() { 
        let getCategory = await axios.get(c.API_URL + "/api/v1/category");
        let categories = []
        categories = getCategory.data.data.map(category => { 
            return {"Id": category._id, "Name": category.name}
        })
        setCategory(categories);
    }

    const CategoryOptions = () => { 
        if (category.length < 1) { 
            loadCategory();

        }
        return (
            category.map((cat, key) => {
                return <option key={key} value={cat.Id}>{cat.Name}</option>
            })
        )
    }

    async function loadTags() {
        const res = await axios.get(c.API_URL + "/api/v1/tag")
        let arrTags = []
        arrTags = res.data.data.map(tag => {
            return { "Id": tag._id, "Name": tag.name }
        })
        setTags(arrTags)
    }

    const TagsOptions = () => { 
        if (tags.length < 1) {
            loadTags();
        }
        
        return (
            tags.map((tag, key) => { 
                return <option key={key} value={tag.Name} />
            })
        )
    }

    async function postTag() {
        newTags.forEach(async (tag) => {
            let exist = false
            exist = tags.some(t => t.Name === tag)
            if (!exist) {
                const payload = { "name": tag }
                await axios.post(c.API_URL + "/api/v1/tag", payload, config(localStorage.getItem("token")))
            }
        })
    }

    async function postCategory(value) {
        let new_category = {
            "name": value.toLowerCase()
        }
        const category = await axios.post(c.API_URL + "/api/v1/category", new_category)
        return category.data.data._id
    }

    async function postProdutHandler(e) { 
        e.preventDefault();
        setLoading(true);
        
        let categoryValue = e.target.category.value;
        if (newCategory) {
            categoryValue = await postCategory(categoryValue.toLowerCase())
        }

        if (newTags.length > 0) {
            await postTag()
        }

        let data = new FormData(e.target)
        if (data.get("status") === "on") {
            data.set("status", true);
        } else { 
            data.set("status", false);
        }

        data.set("category", categoryValue)
        newTags.forEach((tag, index) => { 
            data.set("tags["+index+"]", tag)
        })

        axios.post(c.API_URL + "/api/v1/product", config(localStorage.getItem("token")))
            .then(res => {
                setLoading(false);
                if (res.data.message === "Product successfully created") {
                    alert("Product successfully created");
                    navigate("/admin/dashboard/list")
                }
            })
    }

    function selectHandler(e){ 
        if (e.target.value === "new") { 
            setNewCategory(true);
        } else { 
            setNewCategory(false);
        }
    }

    function tagInputHandler(e) { 
        if (e.target.value[e.target.value.length - 1] === "," && e.target.value.trim().length > 3) {
            let split = e.target.value.split(",")
            setNewTags([...newTags, split[0].trim().toLowerCase()])
            e.target.value = ""
        }
    }

    const TagBadge = (props) => { 
        return (
            <div className="badge rounded-pill text-bg-secondary m-1">
                {props.tag}
                <span className="cursor badge badge-pill badge-danger pe-0" onClick={() => { setNewTags(tags => tags.filter(tag => tag !== props.tag)) }}>x</span>
            </div>
        )
    }

    return (
        <div>
            <h3>Add Product</h3>
            <form id="addProductForm" onSubmit={postProdutHandler}>
                <Input required name="name" type="text" placeholder="Product Name..." label="Name" />
                <Input required type="editor" name="description" label="Descripton" />
                <Input required name="category" type="select" placeholder="Product Categorry..." label="Category" onChange={selectHandler}>
                    <option value="">Choose Category</option>
                    <CategoryOptions />
                    <option value="new">Add New Category</option>
                </Input>
                {newCategory && <Input name="newCategory" type="text" placeholder="New Category Name..." label="Add New Category" />}
                <Input required name="price" type="number" placeholder="Product Price..." label="Price" />
                <Input required name="stock" type="number" placeholder="SProduct Stock..." label="Stock" />
                <div>
                    <label>Tags</label>
                    <div className="d-flex flex-row flex-wrap m-1">
                        {newTags && newTags.map((tag, key) => { 
                            return <TagBadge key={key} tag={tag} />
                        })}
                    </div>
                    <input list="tagOptions" className="form-control m-0" type="text" onChange={tagInputHandler} placeholder="Product tags..." />
                    <datalist id="tagOptions">
                    <TagsOptions />
                    </datalist>
                    <div className="small mb-2">End with comma (,)</div>
                </div>
                <Input name="image" type="file" placeholder="Product Image..." label="Image" />
                <Input name="status" type="checkbox" label="Active" defaultChecked={true} />
                <div className="d-flex justify-content-end">
                    {loading
                        ? (
                            <button type="submit" className="btn btn-primary" form="addProductForm" disabled>
                                <Spinner button={true} />
                                Loading
                            </button>
                        )
                        : (
                            <button type="submit" className="btn btn-primary" form="addProductForm">Add Product</button>
                        )
                    }
                </div>
            </form>
        </div>
    )
}

export default AddProduct;