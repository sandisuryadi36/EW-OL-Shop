import { useEffect, useState } from "react";
import ProductCard from "../component/productCard";
import SearchBar from "./search/searchBar";
import * as c from "../app/data/constants"
import axios from "axios";

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(c.API_URL + "/api/v1/product").then(res => {
            setProducts(res.data.data)
        })
    }, []);

    const ListProduct = () => {
        let element = products.map((item, key) => {
            const detail = {
                productName: item.name,
                productID: item._id,
                price: item.price,
                status: item.status,
                categoryID: item.category._id,
                categoryName: item.category.name,
                imageURL: item.image.filePath,
                stock: item.stock
            }
            return <ProductCard product={detail} key={key}/>
        })
        return element
    }

    return (
        <div>
            <SearchBar placeholder="Search..." className="rounded-3 mt-3" category="" tags="" />
            <div className="pt-3 row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6">
                {products !== null && <ListProduct />}
            </div>
        </div>
    );
}

export default Home;