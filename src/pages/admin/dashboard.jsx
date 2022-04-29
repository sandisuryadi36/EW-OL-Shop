import { NavLink, Outlet } from "react-router-dom"

const AdminDashboard = () => { 
    return (
        <div className="container mt-3">
            <h1>Admin Dashboard</h1>
            <div className="d-flex felx-row mt-3 gap-2">
                <div className="col-2 border rounded-3 border-dark p-2">
                    <nav className="navbar">
                        <ul className="nav flex-column nav-pills nav-fill">
                            <li className="nav-item active">
                                <NavLink className="nav-link" aria-current="page" to="/admin/dashboard/">Overview</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/admin/dashboard/add">Add Product</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/admin/dashboard/list">View Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link disabled" to="/">Disabled</NavLink>
                            </li>

                        </ul>
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