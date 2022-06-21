import { useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../component/productCard";
import { getProduct } from "../app/data/slice";
import SearchBar from "./search/searchBar";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.slice.data);
    const recentAction = useSelector(state => state.slice.recentAction);
    const location = useLocation();

    useEffect(() => { 
        if (location.state && location.state === "reload") {
            dispatch(getProduct())
        }
    }, [location, dispatch])

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    useEffect(() => { 
        if (recentAction === "reset-data") dispatch(getProduct())
    }, [recentAction, dispatch])

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
            <SearchBar placeholder="Search..." className="rounded-3 mt-3"/>
            <div className="pt-3 row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6">
                {products !== null && <ListProduct />}
            </div>
        </div>
    );
}

export default Home;