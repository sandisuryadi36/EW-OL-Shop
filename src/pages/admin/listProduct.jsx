import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { deleteProduct, getProduct } from "../../app/data/slice";

const ListProduct = () => { 
    const dispatch = useDispatch();
    const products = useSelector(state => state.slice.data);
    const location = useLocation()
    // const recentAction = useSelector(state => state.slice.recentAction);

    useEffect(() => { 
        if (products.length < 1) {
            dispatch(getProduct());
        }
    }, [products, dispatch])


    // delete product
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id))
        }
    }

    const ItemList = () => { 
        // console.log(products);
        if (products.length > 0) {
            let el = products.map((product, key) => {
                    return (
                        <tr key={key}>
                            <td className="text-center">{key + 1}</td>
                            <td>{product.name}</td>
                            <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}</td>
                            <td className="text-center">{product.category ? product.category.name : ""}</td>
                            <td className="text-center">{product.status ? "Active" : "Inactive"}</td>
                            <td className="d-flex justify-content-center">
                                <Link to={`/admin/dashboard/list/detail/${product._id}`} state={{ from: location }}>
                                    <button type="button" className="btn btn-sm btn-secondary">Detail</button>
                                </Link>
                                <Link to={`/admin/dashboard/list/edit/${product._id}`}>
                                    <button type="button" className="btn btn-sm btn-primary">Edit</button>
                                </Link>
                                <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteHandler(product._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            )
            return el;
        } else { 
            return (
                <tr>
                    <td colSpan="6">No Product</td>
                </tr>
            )
        }
    }

    // console.log(products);
    return (
        <div>
            <h3>List Product</h3>
            <div className="table-responsive">
                <table className="table table-sm table-striped">
                    <thead>
                        <tr>
                            <th className="text-center">No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th className="text-center">Category</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ItemList />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListProduct;