import ProductCard from "../../component/productCard"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProduct } from "../../app/data/slice";
import { useSearchParams } from "react-router-dom";

const ListProduct = () => {
    const [params] = useSearchParams();
    const products = useSelector(state => state.slice.data);
    const recentAction = useSelector(state => state.slice.recentAction);
    const dispatch = useDispatch();
    let keyword = params.get("search")
    if (keyword === null) keyword = ""
    let category = params.get("category")
    if (category === null) category = ""
    let tags = getTagsParam()
    let queryString = "search=" + keyword + "&category=" + category + "&tags=" + tags

    useEffect(() => {
        dispatch(getProduct(queryString))
    }, [dispatch, queryString]);

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
        return <ProductCard product={detail} key={key} />
    })

    if (products && products.length > 0) { 
        return element
    } else if (recentAction === "getProducts/fulfilled") {
        return (
            <div className="text-center">
                <div>No product found</div>
            </div>
        )
    }
}

export default ListProduct;