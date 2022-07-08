import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
                    ? <Navigate to="/admin/dashboard/process" />
                    : (userData.role === "user") && <Navigate to="/" />
                : null
            }
            {status === "pending" && <Spinner />}
            <h1>Register</h1>
            <div className="card col-8 col-md-6 m-2">
                <div className="card-body">
                    <form id="loginForm" onSubmit={submitHandler} className="d-flex flex-column">
                        <Input required name="userName" type="text" label="User Name" />
                        <Input required name="email" type="email" label="Email" />
                        <Input required name="full_name" type="text" label="Full Name" />
                        <Input required name="password" type="password" label="Password" />
                        <Input required name="confirmPassword" type="password" label="Confirm Password" />
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

            <div className="m-2">
                already have an account? <Link to="/login" className="text-primary">login</Link> here
            </div>
        </div>
    );
}

export default Register;