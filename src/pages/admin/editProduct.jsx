import Input from "../../component/Input";
import Spinner from "../../component/spinner";
import { useState } from "react";
import axios from "axios";
import * as c from "../../app/data/constants"
import "./index.scss";
import { useNavigate, useParams } from 'react-router-dom'
import { config } from "../../app/axiosSet";
import { useEffect } from "react";

const EditProduct = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newCategory, setNewCategory] = useState(false);
    const [prevImage, setPrevImage] = useState("")
    const params = useParams()
    const navigate = useNavigate();
    const [product, setProduct] = useState();
    const origin = "/admin/list"
    const [tags, setTags] = useState([]);
    const [newTags, setNewTags] = useState([{}]);

    useEffect(() => {
        setLoading(true)
        axios.get(c.API_URL + "/api/v1/product/" + params.id)
            .then(res => {
                if (!res.data.error) {
                    setProduct(res.data.data)
                    let arr = []
                    res.data.data.tags.forEach(tag => {
                        arr.push(tag.name)
                    })
                    setNewTags(arr)
                    setPrevImage(res.data.data.image.filePath)
                }
                setLoading(false)
            })
            .then(() => {
                axios.get(c.API_URL + "/api/v1/category").then(res => {
                    if (!res.data.error) {
                        let arr = []
                        res.data.data.forEach(cat => {
                            arr.push({ "Id": cat._id, "Name": cat.name })
                        })
                        setCategory(arr)
                    }
                })
            })
            .then(() => {
                axios.get(c.API_URL + "/api/v1/tag").then(res => {
                    if (!res.data.error) {
                        let arr = []
                        res.data.data.forEach(tag => {
                            arr.push({ "Id": tag._id, "Name": tag.name })
                        })
                        setTags(arr)
                    }
                })
            })
    }, [params.id])

    const CategoryOptions = () => {
        useEffect(() => { 
            document.getElementById("categoryInput").value = product.category._id
        }, [])

        return (
            category.map((cat, key) => {
                return <option key={key} value={cat.Id}>{cat.Name}</option>
            })
        )
    }

    const TagsOptions = () => {
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
                return await axios.post(c.API_URL + "/api/v1/tag", payload, config(localStorage.getItem("token")))
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

    const putProdutHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        let categoryValue = e.target.category.value;
        if (newCategory) {
            categoryValue = await postCategory(categoryValue.toLowerCase())
        }


        if (newTags.length > 0) {
            await postTag()
        }

        let payload = new FormData(e.target)
        if (payload.get("status") === "on") {
            payload.set("status", true);
        } else {
            payload.set("status", false);
        }
        payload.set("category", categoryValue)
        newTags.forEach((tag, index) => {
            payload.set("tags[" + index + "]", tag)
        })

        axios.put(c.API_URL + "/api/v1/product/" + params.id, payload, config(localStorage.getItem("token")))
            .then(res => {
                setLoading(false);
                if (res.data.message === "Product successfully updated") {
                    alert("Product successfully updated");
                    navigate("/admin/list")
                }
            })
    }

    const selectHandler = (e) => {
        if (e.target.value === "new") {
            setNewCategory(true);
        } else {
            setNewCategory(false);
        }
    }

    const onImgChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPrevImage(URL.createObjectURL(event.target.files[0]));
        } else {
            setPrevImage(product.image.filePath);
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
            {(loading && product === null) && <Spinner />}
            <div className="d-flex justify-content-between">
                <h3>Edit Product</h3>
                <button className="btn btn-primary btn-sm" onClick={() => navigate(origin)}>Cancel</button>
            </div>
            {product && !loading
                ? <form id="editProductForm" onSubmit={putProdutHandler}>
                    <Input required name="name" type="text" placeholder="Product Name..." label="Name" defaultValue={product.name} />
                    <Input required type="editor" name="description" label="Description" defaultValue={product.description} />
                    { category &&
                        <Input id="categoryInput" required name="category" type="select" placeholder="Product Category..." label="Category" onChange={selectHandler}>
                            <option value="">Choose Category</option>
                            <CategoryOptions />
                            <option value="new">Add New Category</option>
                        </Input>
                    }
                    {newCategory && <Input name="newCategory" type="text" placeholder="New Category Name..." label="Add New Category" />}
                    <Input required name="price" type="number" placeholder="Product Price..." label="Price" defaultValue={product.price} />
                    <Input required name="stock" type="number" placeholder="Product Stock..." label="Stock" defaultValue={product.stock} />
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
                    <img src={prevImage} alt="product" />
                    <Input name="image" type="file" placeholder="Product Image..." label="Change image" onChange={onImgChange} />
                    <Input name="status" type="checkbox" label="Active" defaultChecked={product.status} />
                    <div className="d-flex justify-content-end">
                        {loading
                            ? (
                                <button type="submit" className="btn btn-primary" form="editProductForm" disabled>
                                    <Spinner button={true} />
                                    Loading
                                </button>
                            )
                            : (
                                <button type="submit" className="btn btn-primary" form="editProductForm">Update</button>
                            )
                        }
                    </div>
                </form>
                : <p>Product not found!</p>
            }
        </div>
    )
}

export default EditProduct;