import axios from "axios";
import Input from "../../../component/Input";
import * as c from "../../../app/data/constants";
import Spinner from "../../../component/spinner";
import { useState } from "react";
import { config } from "../../../app/axiosSet";

const EditAddress = (props) => { 
    const [loading, setLoading] = useState(false);

    const submitHandler = (e) => { 
        e.preventDefault();
        setLoading(true);
        let payload = new URLSearchParams(new FormData(e.target));

        axios.put(c.API_URL + "/api/v1/delivery-address/" + props.address._id, payload, config(localStorage.getItem("token"))).then(res => { 
            setLoading(false);
            document.querySelector("#closeModal"+props.address._id).click()
            props.updateAddress(res.data.data)
        })
    }

    function maxNumber(e) {
        if (e.target.value.toString().length > 5) {
            e.target.value = e.target.value.slice(0, 5)
        }
    }

    return (
        <div className="modal fade" id={"editAddress"+props.address._id} tabIndex="-1" aria-labelledby="editAddressLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="editAddressLabel">Edit Address</h5>
                        <button id={"closeModal"+props.address._id} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id={"editAddressForm"+props.address._id} onSubmit={submitHandler}>
                            <Input required type="text" name="name" label="Name" defaultValue={props.address.name} />
                            <Input required type="text" name="detail" label="Detail" defaultValue={props.address.detail} />
                            <Input required type="text" name="kelurahan" label="Kelurahan" defaultValue={props.address.kelurahan} />
                            <Input required type="text" name="kecamatan" label="Kecamatan" defaultValue={props.address.kecamatan} />
                            <Input required type="text" name="kota" label="Kota" defaultValue={props.address.kota} />
                            <Input required type="text" name="provinsi" label="Provinsi" defaultValue={props.address.provinsi} />
                            <Input required type="number" onChange={maxNumber} name="kodePos" label="Kode Pos" defaultValue={props.address.kodePos} />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {loading
                            ? <button type="button" className="btn btn-primary" disabled>
                                <Spinner button={true} />
                                Loading...
                            </button>
                            : <button type="submit" className="btn btn-primary" form={"editAddressForm" + props.address._id}>Save changes</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAddress;