import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../component/Input";
import Spinner from "../component/spinner";
import * as c from "../app/data/constants";
import axios from "axios";
import { useState } from "react";

const Register = () => {
    const logedIn = useSelector(state => state.slice.logedIn);
    const userData = useSelector(state => state.slice.userData);
    const status = useSelector(state => state.slice.status);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        if (data.get("password") !== data.get("confirmPassword")) {
            alert("Password not match");
            return;
        }
        data = new URLSearchParams(data);
        setLoading(true);
        axios.post(c.API_URL + "/auth/register", data).then(res => { 
            setLoading(false);
            if (res.data.message === "User successfully created") {
                alert("Register Success");
                navigate("/login");
            } else { 
                alert(res.data.message);
            }
        })
    }

    return (
        <div className="d-flex flex-column align-items-center pt-5">
            {logedIn
                ? (userData.role === "admin")
                    ? <Navigate to="/admin/dashboard/" />
                    : (userData.role === "user") && <Navigate to="/" />
                : null
            }
            {status === "pending" && <Spinner />}
            <h1>Register</h1>
            <div className="card col-8 col-md-6 m-2">
                <div className="card-body">
                    <form id="loginForm" onSubmit={submitHandler} className="d-flex flex-column">
                        <Input name="userName" type="text" label="User Name" />
                        <Input name="email" type="email" label="Email" />
                        <Input name="full_name" type="text" label="Full Name" />
                        <Input name="password" type="password" label="Password" />
                        <Input name="confirmPassword" type="password" label="Confirm Password" />
                        {loading
                            ? <button type="submit" className="btn btn-primary mt-2" form="loginForm" disabled>
                                <Spinner button={true} />
                                Loading...
                            </button>
                            : <button type="submit" className="btn btn-primary mt-2" form="loginForm">Submit</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;