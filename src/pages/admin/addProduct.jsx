import Input from "../../component/Input";
import { useState } from "react";
import axios from "axios";
import * as c from "../../app/data/constants"
import "./index.scss";

const AddProduct = () => { 
    const [category, setCategory] = useState([]);

    const loadCategory = async () => { 
        let getCategory = await axios.get(c.API_URL + "/api/v1/category");
        let categories = []
        categories = getCategory.data.data.map(category => { 
            return {"Id": category._id, "Name": category.name}
        })
        setCategory(categories);
    }

    const CategoryOptions = () => { 
        console.log(category);
        if (category.length < 1) { 
            loadCategory();

        }
        console.log(category);
        return (
            category.map((cat, key) => {
                return <option key={key} value={cat.Id}>{cat.Name}</option>
            })
        )
    }

    return (
        <div>
            <h3>Add Product</h3>
            <form>
                <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" />
                <Input name="description" type="text" placeholder="Deskripsi Produk..." label="Deskripsi" />
                <Input name="category" type="select" placeholder="Kategori Produk..." label="Kategori">
                    <option value="">Pilih Kategori</option>
                    <CategoryOptions />
                </Input>
                <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" />
                <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" />
                <Input name="image" type="file" placeholder="Image Produk..." label="Image" />
                <Input name="status" type="checkbox" label="Active" defaultChecked={true} />
                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct;