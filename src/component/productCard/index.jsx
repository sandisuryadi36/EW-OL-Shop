import { Link, useLocation } from "react-router-dom";
import { viewRP } from "../../app/script";
import AddCartButton from "../addCartButton";
import "./index.scss"

const ProductCard = (props) => {
    let { productName, productID, price, imageURL, categoryName } = props.product;
    const location = useLocation()

    return (
        <div className="col">
            <div className="card mb-3 pt-2 pb-2 d-flex flex-column align-items-center justify-content-between">
                <Link className="product-card card-body p-0 text-dark w-100" to={"/product/" + productID} state={{ from: location }}>
                    <div className="ratio ratio-1x1">
                        <img className="image-square" src={imageURL} alt="product" />
                    </div>
                    <div className="ps-2 pe-2">
                        <div className="badge text-bg-dark mt-1">{categoryName}</div>
                        <div className="mt-2 mb-1 limit-text" data-bs-toggle="tooltip" data-bs-placement="bottom" title={productName}>{productName}</div>
                        <h6 className="mb-0 fw-bold limit-text">{viewRP(price)}</h6>
                    </div>
                </Link>
                <>
                    <AddCartButton product={props.product} />
                </>
            </div>
        </div>
    )
}

export default ProductCard;