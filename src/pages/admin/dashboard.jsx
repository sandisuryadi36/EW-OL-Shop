import { NavLink, Outlet } from "react-router-dom"

const AdminDashboard = () => { 
    return (
        <div className="container mt-3">
            <h1>Admin Dashboard</h1>
            <div className="">
                <div className="border rounded-top border-dark border-bottom-0 p-2">
                    <nav className="navbar container">
                        <ul className="nav nav-tabs flex-row w-100">
                            <li className="nav-item active">
                                <NavLink className="nav-link" aria-current="page" to="/admin/dashboard/">Overview</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/admin/dashboard/profile">My Profile</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/admin/dashboard/add">Add Product</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/admin/dashboard/list">View Products</NavLink>
                            </li>

                        </ul>
                    </nav>
                </div>
                <div className="w-100 p-4 pt-0 border rounded-bottom border-dark border-top-0 ">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;