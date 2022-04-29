import Input from "../../component/Input";
import Spinner from "../../component/spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import * as c from "../../app/data/constants"
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import { getProduct } from "../../app/data/slice";

const EditProduct = () => { 
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const status = useSelector(state => state.slice.status);
    const recentAction = useSelector(state => state.slice.recentAction);
    const params = useParams()
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const product = useSelector(state => state.slice.data);
    
    useEffect(() => { 
        if (recentAction === "loginCheck/fulfilled") {
            dispatch(getProduct(params.id))
        }
    }, [recentAction, dispatch, params.id])

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

        let res = await axios.put(c.API_URL + `/api/v1/product/${params.id}`, data);
        setLoading(false);
        if (res.data.message === "Product successfully updated") { 
            alert("Product successfully updated");
            navigate("/admin/dashboard")
        }
    }

    const EditForm = () => {
        const [prevImage, setPrevImage] = useState(recentAction === "getProducts/fulfilled" && product ? product.image.filePath : "")
        if (recentAction === "getProducts/fulfilled" && product === null) { 
            return (
                <p>Product not found!</p>
            )
        }
        if (recentAction === "getProducts/fulfilled" && product) {

            const onImgChange = (event) => {
                if (event.target.files && event.target.files[0]) {
                    setPrevImage(URL.createObjectURL(event.target.files[0]));
                } else {
                    setPrevImage(product.image.filePath);
                }
            }
            return (
                <form id="addProductForm" onSubmit={putProdutHandler}>
                    <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" defaultValue={product.name} />
                    <Input name="description" type="text" placeholder="Deskripsi Produk..." label="Deskripsi" defaultValue={product.description} />
                    <Input name="category" type="select" placeholder="Kategori Produk..." label="Kategori" defaultValue={product.category.name}>
                        <option value="">Pilih Kategori</option>
                        <CategoryOptions />
                    </Input>
                    <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" defaultValue={product.price} />
                    <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" defaultValue={product.stock} />
                    <img src={prevImage} alt="product" />
                    <Input name="image" type="file" placeholder="Image Produk..." label="Change image" onChange={onImgChange} />
                    <Input name="status" type="checkbox" label="Active" defaultChecked={product.status} />
                    {loading
                        ? (
                            <button type="submit" className="btn btn-primary" form="addProductForm" disabled>
                                <Spinner button={true} />
                                Loading
                            </button>
                        )
                        : (
                            <button type="submit" className="btn btn-primary" form="addProductForm">Update</button>
                        )
                    }
                </form>
            )
        }

        return null
    }

    return (
        <div>
            {status === "pending" && <Spinner />}
            <h3>Edit Product</h3>
            <EditForm />
        </div>
    )
}

export default EditProduct;