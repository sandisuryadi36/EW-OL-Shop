import { Outlet } from "react-router-dom"

const AdminDashboard = () => { 
    return (
        <div className="container mt-3">
            <h1>Admin Dashboard</h1>
            <div className="d-flex felx-row mt-3">
                <div className="col-2 border rounded-3 border-dark p-2">
                    <nav className="nav flex-column nav-pills nav-fill">
                        <a className="nav-link active" aria-current="page" href="#">Active</a>
                        <a className="nav-link" href="#">Link</a>
                        <a className="nav-link" href="#">Link</a>
                        <a className="nav-link disabled">Disabled</a>
                    </nav>
                </div>
                <div className="col-10 p-2 ps-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;