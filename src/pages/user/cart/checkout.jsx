import { useSelector } from "react-redux";

const Checkout = () => {
    const totalCart = useSelector(state => state.slice.totalCart);
    return (
        <div className="d-flex flex-column gap-3 align-items-end">
            <div className="d-flex justify-content-end align-intems-center p-3 bg-warning rounded w-100" >
                <h5 className="m-0">Total: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalCart)}</h5>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-lg btn-success btn-block">Checkout</button>
            </div>
        </div>
    )
}

export default Checkout;