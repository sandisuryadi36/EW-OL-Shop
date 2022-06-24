import { useState } from "react"
import { useSelector } from "react-redux"
import DetailProfile from "./detail"
import * as c from "../../../app/data/constants";
import axios from "axios";
import { config } from "../../../app/axiosSet";
import ResetPassword from "./resetPassword";

const AdminProfile = () => {
    const userData = useSelector(state => state.slice.userData)
    const [edited, setEdited] = useState([])
    const [editPassowrd, setEditPassword] = useState(false)

    function handleEdited(e) {
        if (e.action === "save") {
            setEdited([...edited, e.name])
        } else if (e.action === "cancel") {
            setEdited(edited.filter(item => item !== e.name))
        }
    }

    function saveEdit(e) {
        e.preventDefault()
        let confirmData = document.getElementById("formConfirm")
        let confirmPayload = new URLSearchParams(new FormData(confirmData))
        confirmPayload.set("email", userData.email)
        axios.post(c.API_URL + "/auth/login", confirmPayload).then(res => {
            if (res.data.login) {
                const formData = new FormData(document.getElementById("formEditProfile"))
                const payload = {}
                if (edited.includes("full_name")) {
                    payload.full_name = formData.get("full_name")
                }
                if (edited.includes("email")) {
                    payload.email = formData.get("email")
                }
                if (edited.includes("password")) {
                    payload.password = formData.get("password")
                }
                axios.put(c.API_URL + "/api/v1/user", payload, config(localStorage.getItem("token")))
                    .then((res) => {
                        if (!res.data.error) {
                            confirmPayload.set("email", payload.email ? payload.email : userData.email)
                            if (edited.includes("password")) {
                                confirmPayload.set("password", payload.password)
                            }
                            axios.post(c.API_URL + "/auth/login", confirmPayload).then(res => {
                                if (res.data.login) {
                                    localStorage.setItem("token", res.data.data.token)
                                    window.location.reload()
                                }
                            })
                        } else {
                            alert(res.data.message)
                        }
                    })
                document.getElementById("editProfileCloseModal").click()
            } else {
                alert("Password incorrect")
                confirmData.reset()
            }
        })
    }

    return (
        <div>
            <div>
                <h1>My Profile</h1>
            </div>
            <form className="mt-4" id="formEditProfile">
                <DetailProfile label="Full Name" name="full_name" defaultValue={userData.full_name} user={userData} edited={handleEdited} />
                <DetailProfile label="Email" name="email" defaultValue={userData.email} user={userData} edited={handleEdited} />
                {!editPassowrd && <button type="button" className="btn btn-link text-decoration-none text-danger m-0 p-0" onClick={() => setEditPassword(true)}>Change password</button>}
                {editPassowrd &&
                    <>
                        <ResetPassword edited={handleEdited} />
                        <button type="button" className="btn btn-link text-secondary m-0 p-0 text-decoration-none" onClick={() => {
                            setEdited(edited.filter(item => item !== "password"))
                            setEditPassword(false)
                        }}>Cancel change password</button>
                    </>
                }
            </form>
            <div className="text-end">
                {edited.length > 0
                    ? <button type="button" foem="formEditProfile" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#confirmModal" >Save</button>
                    : <button type="button" foem="formEditProfile" className="btn btn-success" disabled >Save</button>
                }
            </div>


            <div className="modal fade" id="confirmModal" tabIndex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form id="formConfirm" onSubmit={(e) => e.preventDefault()} className="modal-body d-flex flex-column justify-content-center align-items-center">
                            <h5 className="modal-title" id="confirmModalLabel">Your password</h5>
                            <button id="editProfileCloseModal" type="button" className="btn-close visually-hidden" data-bs-dismiss="modal" aria-label="Close"></button>
                            <input required type="password" className="form-control my-3" placeholder="Password" name="password" />
                            <button type="button" form="formConfirm" className="btn btn-success" onClick={saveEdit}>OK</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProfile