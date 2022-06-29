import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewRP } from "../../../app/script";

const Checkout = () => {
    const totalCart = useSelector(state => state.slice.totalCart);
    const navigate = useNavigate();
    return (
        <div className="d-flex flex-column gap-3 align-items-end">
            <div className="d-flex justify-content-end align-intems-center p-3 bg-warning rounded w-100" >
                <h5 className="m-0">Total: {viewRP(totalCart)}</h5>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-lg btn-success btn-block" onClick={() => {
                    navigate("/user/checkout");
                }}>Checkout</button>
            </div>
        </div>
    )
}

export default Checkout;