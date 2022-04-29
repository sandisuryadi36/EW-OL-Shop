import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";
import * as c from "../app/data/constants"
import "./index.scss";
import { useSelector } from 'react-redux';

const DetailProduct = () => { 
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const id = params.id;
    const [product, setProduct] = useState(null);
    const userRole = useSelector(state => state.slice.userData ? state.slice.userData.role : null);

    if (product === null) {
        axios.get(c.API_URL + "/api/v1/product/" + id)
            .then(res => {
                setProduct(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h3>Detail Product</h3>
                <div>
                    <button className="btn btn-primary btn-sm" onClick={() => navigate("/admin/dashboard/list")}>Back</button>
                    {userRole === "admin" &&
                        <button className="btn btn-primary btn-sm"
                            onClick={() => navigate("/admin/dashboard/list/edit/" + id, { state: { from: location } })}
                        >Edit</button>
                    }
                </div>
            </div>
            {product && (
                <div className='d-flex gap-4'>
                    <div>
                        <img src={product.image ? product.image.filePath : "https://via.placeholder.com/150/999999/FFFFFF/?text=no%20image"}
                            height={"200px"}
                            alt="product"
                        />
                    </div>
                    <div>
                        <h4>{product.name}</h4>
                        <p className='price'>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}</p>
                        {userRole === "admin" && <p>{product.status ? "Status : Active" : "Status : Inactive"}</p>}
                        <p>{"Stock : " + product.stock}</p>
                        <p>{"Category : " + product.category.name}</p>
                        <h6>Description</h6>
                        <p>{product.description}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DetailProduct;