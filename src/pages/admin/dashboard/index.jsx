import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../../app/axiosSet";
import * as c from '../../../app/data/constants'
import Spinner from "../../../component/spinner";
import ListTable from "./listTable";
import OrderModal from "./modal";

const AdminDashboard = () => { 
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => { 
        setLoading(true)
        axios.get(c.API_URL + "/api/v1/order-all/", config(localStorage.getItem("token"))).then(res => { 
            setOrders(res.data.data)
            setLoading(false)
        })
    }, [])

    function compare(a, b) {
        if (a.createdAt < b.createdAt) return -1;
        if (a.createdAt > b.createdAt) return 1;
        return 0;
    }

    async function getItem(val) {
        setModalContent(orders.filter(item => item._id === val)[0])
    }

    useEffect(() => { 
        if (modalContent) {
            document.getElementById("showModal").click()
            window.addEventListener("hidden.bs.modal", () => { 
                setModalContent(null)
                window.removeEventListener("hidden.bs.modal", () => { })
            })
        }
    }, [modalContent])

    return (
        <div className="d-flex flex-column gap-4">
            <h1>Admin Dashboard</h1>
            <div>
                {loading && <Spinner />}
                <h5>Pending Orders</h5>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Order No.</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && <ListTable orders={orders.filter(item => item.status === "paid").sort(compare)} sendItem={getItem} />}
                    </tbody>
                </table>
            </div>
            <div>
                <h5>Waiting Paiment</h5>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Order No.</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && <ListTable orders={orders.filter(item => item.status === "waiting payment").sort(compare)} sendItem={getItem} />}
                    </tbody>
                </table>
            </div>
            <button id="showModal" type="button" className="btn btn-primary visually-hidden" data-bs-toggle="modal" data-bs-target="#orderModal">
                Modal
            </button>
            {modalContent && <OrderModal order={modalContent} />}
        </div>
    )
}

export default AdminDashboard;