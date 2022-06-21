import ProductCard from "../../component/productCard"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProduct } from "../../app/data/slice";
import { useSearchParams } from "react-router-dom";

const ListProduct = () => {
    const [params] = useSearchParams();
    const products = useSelector(state => state.slice.data);
    const dispatch = useDispatch();
    let keyword = params.get("search")
    if (keyword === null) keyword = ""
    let category = params.get("category")
    if (category === null) category = ""

    useEffect(() => {
        dispatch(getProduct("search=" + keyword
            + "&category=" + category
        ))
    }, [dispatch, keyword, category]);

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
    return element
}

export default ListProduct;