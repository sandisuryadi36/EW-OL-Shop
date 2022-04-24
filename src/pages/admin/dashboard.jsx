import { Link, Outlet } from "react-router-dom"

const AdminDashboard = () => { 
    return (
        <div className="container mt-3">
            <h1>Admin Dashboard</h1>
            <div className="d-flex felx-row mt-3 gap-2">
                <div className="col-2 border rounded-3 border-dark p-2">
                    <nav className="nav flex-column nav-pills nav-fill">
                        <Link className="nav-link active" aria-current="page" to="/admin/dashboard/add">Add Product</Link>
                        <Link className="nav-link disabled" to="/admin/dashboard">Disabled</Link>
                    </nav>
                </div>
                <div className="w-100 p-2 ps-4 border rounded-3 border-dark ">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;