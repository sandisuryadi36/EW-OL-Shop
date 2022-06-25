import axios from "axios"
import { useEffect, useState } from "react"
import { config } from "../../../app/axiosSet";
import * as c from '../../../app/data/constants'
import Input from "../../../component/Input";
import Spinner from "../../../component/spinner";

const ManageCategory = () => { 
    const [category, setCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    function compare(a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    }

    useEffect(() => {
        setLoading(true)
        axios.get(c.API_URL + "/api/v1/category")
            .then(res => {
                setCategory(res.data.data.sort(compare))
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })

        axios.get(c.API_URL + "/api/v1/tag")
            .then(res => {
                setTags(res.data.data.sort(compare))
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    function submitCategory(e) {
        e.preventDefault()
        setLoading(true)
        let name = e.target.elements.name.value
        axios.post(c.API_URL + "/api/v1/category", {
            name: name
        }, config(localStorage.getItem("token"))).then(res => {
            if (!res.data.error) {
                setCategory([...category, res.data.data])
            } else {
                alert(res.data.message)
            }
            setLoading(false)
            e.target.elements.name.value = ""
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    function submitTag(e) { 
        e.preventDefault()
        setLoading(true)
        let name = e.target.elements.name.value
        axios.post(c.API_URL + "/api/v1/tag", {
            name: name
        }, config(localStorage.getItem("token"))).then(res => {
            if (!res.data.error) {
                setTags([...tags, res.data.data])
            } else {
                alert(res.data.message)
            }
            setLoading(false)
            e.target.elements.name.value = ""
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    function deleteCategory(cat) {
        alert("Are you sure you want to delete this category?")
        setLoading(true)
        // check if category is used in product
        axios.get(c.API_URL + "/api/v1/product?categpry=" + cat.name, config(localStorage.getItem("token")))
            .then(res => {
                if (res.data.data.length > 0) {
                    alert("Category is used in product, cannot delete")
                    setLoading(false)
                } else {
                    axios.delete(c.API_URL + "/api/v1/category/" + cat._id, config(localStorage.getItem("token")))
                        .then(res => {
                            if (!res.data.error) {
                                setCategory(category.filter(val => val._id !== cat._id))
                            } else {
                                alert(res.data.message)
                            }
                            setLoading(false)
                        }).catch(err => {
                            console.log(err)
                            setLoading(false)
                        })
                }
            })
    }
    
    function deleteTag(tag) {
        alert("Are you sure you want to delete this tag?")
        setLoading(true)
        // check if tag is used in product
        axios.get(c.API_URL + "/api/v1/product?tags=" + tag.name, config(localStorage.getItem("token")))
            .then(res => {
                if (res.data.data.length > 0) {
                    alert("Tag is used in product, cannot delete")
                    setLoading(false)
                } else {
                    axios.delete(c.API_URL + "/api/v1/tag/" + tag._id, config(localStorage.getItem("token")))
                        .then(res => {
                            if (!res.data.error) {
                                setTags(tags.filter(val => val._id !== tag._id))
                            } else {
                                alert(res.data.message)
                            }
                            setLoading(false)
                        }).catch(err => {
                            console.log(err)
                            setLoading(false)
                        })
                }
            })
    }

    return (
        <div className="position-relative">
            <h1>Manage Category</h1>
            {loading && <Spinner child={true} overlay={true} />}
            <div className="row row-cols-1 row-cols-md-2 mt-3 min-h-content">
                <div className="col">
                    <h5>Categories</h5>
                    <div className="max-h-50 overflow-auto">
                        <ul className="list-group">
                            {category.map(c => (
                                <li key={c._id} className="list-group-item">
                                    <span className="cursor badge badge-pill text-danger" onClick={() => deleteCategory(c)}>x</span>
                                    {c.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="d-flex flex-row align-items-end mt-2">
                        <form id="addCategoryForm" onSubmit={submitCategory}>
                            <Input label="Add Category" className="form-control m-0 py-1" name="name" />
                        </form>
                        <button type="submit" form="addCategoryForm" className="btn btn-sm btn-primary">Add</button>
                    </div>
                </div>
                <div className="col">
                    <h5>Tags</h5>
                    <div className="max-h-50 overflow-auto">
                        <ul className="list-group">
                            {tags.map(t => (
                                <li key={t._id} className="list-group-item positio-relative">
                                    <span className="cursor badge badge-pill text-danger" onClick={() => deleteTag(t)}>x</span>
                                    {t.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="d-flex flex-row align-items-end mt-2">
                        <form id="addTagForm" onSubmit={submitTag}>
                            <Input label="Add Tag" className="form-control m-0 py-1" name="name" />
                        </form>
                        <button type="submit" form="addTagForm" className="btn btn-sm btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageCategory;