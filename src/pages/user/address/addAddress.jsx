import axios from "axios";
import Input from "../../../component/Input";
import * as c from "../../../app/data/constants";
import { useState } from "react";
import Spinner from "../../../component/spinner";
import { config } from "../../../app/axiosSet";

const AddAddress = (props) => { 
    const [loading, setLoading] = useState(false);

    const submitHandler = (e) => { 
        e.preventDefault();
        e.target.disabled = true;
        setLoading(true);
        let payload = new URLSearchParams(new FormData(e.target));

        axios.post(c.API_URL + "/api/v1/delivery-address", payload, config(localStorage.getItem("token"))).then(res => { 
            setLoading(false);
            document.querySelector("#addAddressCloseModal").click()
            props.updateAddress(res.data.data)
            e.target.reset()
        })
    }

    return (
        <div className="modal fade" id="addAddress" tabIndex="-1" aria-labelledby="addAddressLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addAddressLabel">Add Address</h5>
                        <button id="addAddressCloseModal" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="addAddressForm" onSubmit={submitHandler}>
                            <Input type="text" name="name" label="Name" />
                            <Input type="text" name="detail" label="Detail" />
                            <Input type="text" name="kelurahan" label="Kelurahan" />
                            <Input type="text" name="kecamatan" label="Kecamatan" />
                            <Input type="text" name="kota" label="Kota" />
                            <Input type="text" name="provinsi" label="Provinsi" />
                            <Input type="text" maxLength={5} name="kodePos" label="Kode Pos" />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {loading
                            ? <button type="button" className="btn btn-primary" disabled>
                                <Spinner button={true} />
                                Loading...
                            </button>
                            : <button type="submit" className="btn btn-primary" form="addAddressForm">Save changes</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAddress;