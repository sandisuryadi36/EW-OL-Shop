import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";
import * as c from "../app/data/constants"
import "./index.scss";
import { useSelector } from 'react-redux';
import AddCartButton from "../component/addCartButton";
import { viewRP } from '../app/script';

const DetailProduct = (props) => { 
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const id = params.id;
    const [product, setProduct] = useState(null);
    const userRole = useSelector(state => state.slice.userData ? state.slice.userData.role : null);

    useEffect(() => {
        axios.get(c.API_URL + "/api/v1/product/" + id)
            .then(res => {
                setProduct(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

    return (
        <div className='pt-4'>
            <div className="">
                <div className="d-flex justify-content-between">
                    <h3>Detail Product</h3>
                    <div>
                        <button type="button" className="btn-close" aria-label="Close"
                            onClick={() => {
                                let origin = location.state ? location.state.from.pathname : "/";
                                if (location.state.from.search) { 
                                    origin += location.state.from.search;
                                }
                                navigate(origin)
                            }}
                        ></button>
                    </div>
                </div>
                {product && (
                    <div className='d-flex flex-column flex-md-row gap-4'>
                        <div className='d-flex justify-content-center'>
                            <img src={product.image ? product.image.filePath : "https://via.placeholder.com/150/999999/FFFFFF/?text=no%20image"}
                                height={"200px"}
                                alt="product"
                            />
                        </div>
                        <div className='w-100'>
                            <div className='d-flex flex-column flex-md-row justify-content-between'>
                                <div>
                                    <h4>{product.name}</h4>
                                    <p className='price'>{viewRP(product.price)}</p>
                                    {userRole === "admin" && <p>{product.status ? <span className="badge text-bg-success">Active</span> : <span className="badge text-bg-danger">Inactive</span>}</p>}
                                    <p>{"Stock : " + product.stock}</p>
                                    <p>{"Category : " + product.category.name}</p>
                                </div>
                                <div>
                                    <AddCartButton product={product} detail={true} />
                                    {userRole === "admin" &&
                                        <button className="btn btn-primary"
                                            onClick={() => navigate("/admin/list/edit/" + id, { state: { from: location } })}
                                        >Edit</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {product && (
                <div className='d-flex flex-column'>
                    <h6>Description</h6>
                    <span dangerouslySetInnerHTML={{ __html: product.description }} />
                    <p>Tags: {
                        product.tags.map((tag, key) => {
                            if (key === 0) return tag.name;
                            else return ", " + tag.name;
                        })
                    }</p>
                </div>
            )}
        </div>
    )
}

export default DetailProduct;