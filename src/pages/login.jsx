import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { postLogin } from "../app/data/slice";

const Login = () => { 
    const logedIn = useSelector(state => state.slice.logedIn);
    const userData  = useSelector(state => state.slice.userData);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const data = new URLSearchParams(new FormData(e.target));
        dispatch(postLogin(data));
    }

    return (
        <div className="d-flex flex-column align-items-center pt-5">
            {logedIn
                ? (userData.role === "admin")
                    ? <Navigate to="/admin/dashboard" />
                    : (userData.role === "user") && <Navigate to="/user/dashboard" />
                : null
            }
            <h1>Login</h1>
            <div className="card m-2">
                <div className="card-body">
                    <form id="loginForm" onSubmit={submitHandler} className="d-flex flex-column align-items-center">
                        <div className="form-group mt-2">
                            <label htmlFor="inputEmail">Email address</label>
                            <input name="email" type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group mt2">
                            <label htmlFor="inputPassword">Password</label>
                            <input name="password" type="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary mt-2" form="loginForm">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;