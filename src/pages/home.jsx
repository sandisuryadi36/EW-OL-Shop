import { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../component/productCard";
import { getProduct } from "../app/data/slice";

const Home = () => {
    const params = useParams()
    const dispatch = useDispatch();
    const products = useSelector(state => state.slice.data);
    let keyword = ""

    if (params.keyword) {
        keyword = params.keyword
    }

    useEffect(() => {
        if (keyword !== "") {
            dispatch(getProduct("search=" + keyword))
        } else dispatch(getProduct());
    }, [dispatch, keyword]);

    const ListProduct = () => {
        let element = products.map((item, key) => {
            const detail = {
                productName: item.name,
                productID: item._id,
                price: item.price,
                status: item.status,
                categoryID: item.category._id,
                categoryName: item.category.name,
                imageURL: item.image.filePath
            }
            return <ProductCard product={detail} key={key}/>
        })
        return element
    }

    return (
        <div className="pt-3 d-flex flex-wrap gap-2">
            <ListProduct />
        </div>
    );
}

export default Home;