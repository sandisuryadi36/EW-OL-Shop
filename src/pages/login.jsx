import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { postLogin } from "../app/data/slice";
import Spinner from "../component/spinner";

const Login = () => { 
    const logedIn = useSelector(state => state.slice.logedIn);
    const userData = useSelector(state => state.slice.userData);
    const status = useSelector(state => state.slice.status);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const origin = location.state ? location.state.from.pathname : "/login";
        const data = new URLSearchParams(new FormData(e.target));
        dispatch(postLogin(data)).then((res) => {
            if (res.payload.login) {
                localStorage.setItem("token", res.payload.data.token);
                navigate(origin)
            } else {
                alert(res.payload.message)
            }
        })      
    }

    return (
        <div className="d-flex flex-column align-items-center pt-5">
            {logedIn
                ? (userData.role === "admin")
                    ? <Navigate to="/admin/dashboard/process" />
                    : (userData.role === "user") && <Navigate to="/" />
                : null
            }
            {status === "pending" && <Spinner />}
            <h1>Login</h1>
            <div className="card m-2">
                <div className="card-body">
                    <form id="loginForm" onSubmit={submitHandler} className="d-flex flex-column align-items-center">
                        <div className="form-group mt-2">
                            <label htmlFor="inputEmail">Email address</label>
                            <input required name="email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group mt2">
                            <label htmlFor="inputPassword">Password</label>
                            <input required name="password" type="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary mt-2" form="loginForm">Submit</button>
                    </form>
                </div>
            </div>
            <div className="m-2">
                or <Link to="/register" className="text-primary">register</Link> you new account
            </div>
        </div>
    );
}

export default Login;