import { Link, useLocation } from "react-router-dom";
import "./index.scss"

const ProductCard = (props) => {
    let { productName, productID, price, imageURL, categoryName } = props.product;
    const location = useLocation()

    // const onClickHandler = () => {
    //     return <Navigate to={"/product/" + productID} replace state={{ from: location }} />
    // }

    return (
        <Link className="card col-2 product-card" to={"/product/" + productID} state={{ from: location }}>
            <div className="card-body d-flex flex-column align-items-center">
                <div className="ratio ratio-1x1">
                    <img className="image-square" src={imageURL} alt="product" />
                </div>
                <span class="badge text-bg-dark">{categoryName}</span>
                <h6 className="card-title text-center">{productName}</h6>
                <p className="card-text">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)}</p>
            </div>
        </Link>
    )
}

export default ProductCard;