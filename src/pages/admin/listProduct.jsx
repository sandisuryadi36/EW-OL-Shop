import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { config } from "../../app/axiosSet";
import * as c from "../../app/data/constants"
import { viewRP } from "../../app/script";
import Spinner from "../../component/spinner";

const ListProduct = () => { 
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()

    useEffect(() => {
        setLoading(true)
        axios.get(c.API_URL + "/api/v1/product", config(localStorage.getItem("token"))).then(res => {
            setProducts(res.data.data)
            setLoading(false)
        })
    }, []);


    // delete product
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setLoading(true)
            axios.delete(c.API_URL + "/api/v1/product/" + id, config(localStorage.getItem("token"))).then(res => {
                setProducts(products => products.filter(product => product._id !== id))
                alert(res.data.message)
                setLoading(false)
            })
        }
    }

    const ItemList = () => { 
        if (products.length > 0) {
            let el = products.map((product, key) => {
                    return (
                        <tr key={key}>
                            <td className="text-center">{key + 1}</td>
                            <td>{product.name}</td>
                            <td>{viewRP(product.price)}</td>
                            <td className="text-center">{product.category ? product.category.name : ""}</td>
                            <td className="text-center">{product.stock}</td>
                            <td className="text-center">{product.status ? "Active" : "Inactive"}</td>
                            <td className="d-flex justify-content-center">
                                <Link to={`/product/${product._id}`} state={{ from: location }}>
                                    <button type="button" className="btn btn-sm btn-secondary">Detail</button>
                                </Link>
                                <Link to={`/admin/list/edit/${product._id}`}>
                                    <button type="button" className="btn btn-sm btn-primary">Edit</button>
                                </Link>
                                <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteHandler(product._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            )
            return el;
        } else if (!loading) { 
            return (
                <tr>
                    <td colSpan="7" className="text-center">No Product</td>
                </tr>
            )
        }
    }

    return (
        <div>
            <div className="d-flex flex-row justify-content-between align-items-center mb-3">
                <h3 className="m-0">List Product</h3>
                <Link type="button" className="btn btn-sm btn-primary" to="/admin/add">Add New</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-sm table-striped">
                    <thead>
                        <tr>
                            <th className="text-center">No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th className="text-center">Category</th>
                            <th className="text-center">Stock</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="position-relative">
                        {loading && <tr><td><Spinner child={true} overlay={true} /></td></tr>}
                        <ItemList />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListProduct;