import ProductCard from "../../component/productCard"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as c from '../../app/data/constants'
import axios from "axios";

const ListProduct = () => {
    const [params] = useSearchParams();
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    let keyword = params.get("search") !== null ? params.get("search") : ""
    let category = params.get("category") !== null ? params.get("category") : ""
    let tags = getTagsParam()
    let queryString = "search=" + keyword + "&category=" + category + "&tags=" + tags

    useEffect(() => {
        setLoading(true)
        axios(c.API_URL + "/api/v1/product?" + queryString).then(res => {
            setProducts(res.data.data)
            setLoading(false)
        })
    }, [queryString]);

    function getTagsParam() {
        let paramString = params.get("tags")
        if (paramString !== null) {
            if (paramString.indexOf(",") === -1) {
                return [paramString]
            } else {
                return paramString.split(",")
            }
        } else {
            return []
        }
    }

    if (products && products.length > 0) {
        return products.map((item, key) => {
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
            return <ProductCard product={detail} key={key} />
        })
    } else {
        return (
            loading
                ? <div className="text-center">
                    <div>Loading...</div>
                </div>
                : <div className="text-center">
                    <div>No product found</div>
                </div>
        )
    }
}

export default ListProduct;