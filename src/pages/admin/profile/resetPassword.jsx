import { useEffect, useState } from "react"

const ResetPassword = (props) => {
    const [properties, setProperties] = useState({
        className: "form-control m-0" + props.className,
    })
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [validated, setValidated] = useState(false)

    useEffect(() => { 
        if (newPassword.length >= 6 && confirmPassword.length >= 6) {
            if (newPassword === confirmPassword) {
                setValidated(true)
            } else  setValidated(false)
        } else setValidated(false)
    }, [newPassword, confirmPassword])

    useEffect(() => { 
        if (validated) {
            setProperties({
                className: "form-control text-success m-0 border border-2 border-success"
            })
            props.edited({ name: "password", action: "save" })
        } else {
            setProperties({
                className: "form-control m-0"
            })
            props.edited({ name: "password", action: "cancel" })
        }
    }, [validated, props])

    return (
        <div>
            <div className="mb-3">
                <label>New Password <span className="fw-light">( minimum 6 characters )</span></label>
                <input type="password" name="password" required {...properties} onChange={(e) => setNewPassword(e.target.value)} ></input>
            </div>
            <div className="mb-1">
                <label>Confirm Password</label>
                <input type="password" required {...properties} onChange={(e) => setConfirmPassword(e.target.value)} ></input>
            </div>
        </div>
    )
}

export default ResetPassword