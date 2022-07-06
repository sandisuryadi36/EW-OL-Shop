import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../../app/axiosSet";
import * as c from '../../../app/data/constants'
import Spinner from "../../../component/spinner";
import OrderModal from "./modal";
import DashboardTable from "./table";

const AdminDashboard = () => { 
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => { 
        initData()
    }, [])

    function initData() {
        setLoading(true)
        axios.get(c.API_URL + "/api/v1/order-all/", config(localStorage.getItem("token"))).then(res => {
            setOrders(res.data.data)
            setLoading(false)
        })
    }

    async function getItem(val) {
        setModalContent(orders.find(item => item._id === val))
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

    function getLoading(e) {
        if (e === true) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }

    function doUpdate(e) { 
        if (e) {
            setModalContent(null)
            initData()
        }
    }

    return (
        <div className="d-flex flex-column gap-4">
            <h1>Admin Dashboard</h1>
            {loading && <Spinner />}
            <DashboardTable orders={orders} title="Orders on Process" status="processing" sendItem={getItem} />
            <DashboardTable orders={orders} title="Pending Orders" status="paid" sendItem={getItem} />
            <DashboardTable orders={orders} title="Waiting Payment" status="waiting payment" sendItem={getItem} />
            <DashboardTable orders={orders} title="Other Orders" status="other" sendItem={getItem} />
            <button id="showModal" type="button" className="btn btn-primary visually-hidden" data-bs-toggle="modal" data-bs-target="#orderModal">
                Modal
            </button>
            {modalContent && <OrderModal order={modalContent} loading={getLoading} update={doUpdate} />}
        </div>
    )
}

export default AdminDashboard;