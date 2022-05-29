import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../component/productCard";
import { getProduct } from "../app/data/slice";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.slice.data);

    useEffect(() => {
        if (products.length < 1) {
            dispatch(getProduct());
        }
    }, [products, dispatch])

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
        <div className="container pt-3 d-flex flex-wrap gap-2">
            <ListProduct />
        </div>
    );
}

export default Home;