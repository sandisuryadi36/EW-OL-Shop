import Input from "../../component/Input";
import Spinner from "../../component/spinner";
import { useState } from "react";
import axios from "axios";
import * as c from "../../app/data/constants"
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postProduct } from "../../app/data/slice";

const AddProduct = () => { 
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                return <option key={key} value={cat.Id}>{cat.Name}</option>
            })
        )
    }

    const postProdutHandler = async (e) => { 
        e.preventDefault();
        setLoading(true);
        let data = new FormData(e.target)
        if (data.get("status") === "on") {
            data.set("status", true);
        } else { 
            data.set("status", false);
        }

        // let res = await axios.post(c.API_URL + "/api/v1/product", data);
        dispatch(postProduct(data))
            .then(res => {
                setLoading(false);
                if (res.payload.message === "Product successfully created") {
                    alert("Product successfully created");
                    navigate("/admin/dashboard/list")
                }
            })
    }

    return (
        <div>
            {/* {loading && <Spinner />} */}
            <h3>Add Product</h3>
            <form id="addProductForm" onSubmit={postProdutHandler}>
                <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" />
                <Input name="description" type="textarea" rows={4} placeholder="Deskripsi Produk..." label="Deskripsi" />
                <Input name="category" type="select" placeholder="Kategori Produk..." label="Kategori">
                    <option value="">Pilih Kategori</option>
                    <CategoryOptions />
                </Input>
                <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" />
                <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" />
                <Input name="image" type="file" placeholder="Image Produk..." label="Image" />
                <Input name="status" type="checkbox" label="Active" defaultChecked={true} />
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
            </form>
        </div>
    )
}

export default AddProduct;