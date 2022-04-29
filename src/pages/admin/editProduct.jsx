import Input from "../../component/Input";
import Spinner from "../../component/spinner";
import { useState } from "react";
import axios from "axios";
import * as c from "../../app/data/constants"
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { putProduct } from "../../app/data/slice";

const EditProduct = () => { 
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const status = useSelector(state => state.slice.status);
    const params = useParams()
    const navigate = useNavigate();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const origin = location.state ? location.state.from.pathname : "/admin/dashboard/list"
    const dispatch = useDispatch();
    
    if (product === null) {
        axios.get(c.API_URL + "/api/v1/product/" + params.id)
        .then(res => {
            setProduct(res.data.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const loadCategory = async () => { 
        let getCategory = await axios.get(c.API_URL + "/api/v1/category");
        let categories = []
        categories = getCategory.data.data.map(category => { 
            return {"Id": category._id, "Name": category.name}
        })
        setCategory(categories);    }

    const CategoryOptions = () => { 
        if (category.length < 1) { 
            loadCategory();

        }
        return (
            category.map((cat, key) => {
                return <option key={key} value={cat.Name}>{cat.Name}</option>
            })
        )
    }

    const putProdutHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        let data = new FormData(e.target)
        if (data.get("status") === "on") {
            data.set("status", true);
        } else {
            data.set("status", false);
        }

        // let res = await axios.put(c.API_URL + `/api/v1/product/${params.id}`, data);
        dispatch(putProduct({id: params.id, data: data}))
        .then(res => {
                console.log(res)
                setLoading(false);
                if (res.payload.message === "Product successfully updated") {
                    alert("Product successfully updated");
                    navigate("/admin/dashboard/list")
                }
            })
    }

    const EditForm = () => {
        const [prevImage, setPrevImage] = useState(product !== null ? product.image ? product.image.filePath : "https://via.placeholder.com/150/999999/FFFFFF/?text=no%20image" : "");
        if (product === null) { 
            return (
                <p>Product not found!</p>
            )
        }
        if (product !== null) {
            const onImgChange = (event) => {
                if (event.target.files && event.target.files[0]) {
                    setPrevImage(URL.createObjectURL(event.target.files[0]));
                } else {
                    setPrevImage(product.image.filePath);
                }
            }

            return (
                <form id="editProductForm" onSubmit={putProdutHandler}>
                    <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" defaultValue={product.name} />
                    <Input name="description" type="textarea" rows={4} placeholder="Deskripsi Produk..." label="Deskripsi" defaultValue={product.description} />
                    <Input name="category" type="select" placeholder="Kategori Produk..." label="Kategori" defaultValue={product.category.name}>
                        <option value="">Pilih Kategori</option>
                        <CategoryOptions />
                    </Input>
                    <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" defaultValue={product.price} />
                    <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" defaultValue={product.stock} />
                    <img src={prevImage} alt="product" />
                    <Input name="image" type="file" placeholder="Image Produk..." label="Change image" onChange={onImgChange} />
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
            )
        }

        return null
    }

    return (
        <div>
            {status === "pending" && <Spinner />}
            <div className="d-flex justify-content-between">
                <h3>Edit Product</h3>
                <button className="btn btn-primary btn-sm" onClick={() => navigate(origin)}>Cancel</button>
            </div>
            <EditForm />
        </div>
    )
}

export default EditProduct;