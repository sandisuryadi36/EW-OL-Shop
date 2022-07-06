import { useState } from "react";
import EditAddress from "./editAddress";
import * as c from "../../../app/data/constants";
import axios from "axios";
import Spinner from "../../../component/spinner";
import { config } from "../../../app/axiosSet";

const AddressListItem = (props) => { 
    const [address, setAddresses] = useState(props.address);
    const [loading, setLoading] = useState(false);

    const updateAddressHandler = (e) => { 
        setAddresses(e)
    }

    const deleteHandler = () => { 
        if (window.confirm("Are you sure you want to delete this address?")) { 
            setLoading(true);
            axios.delete(c.API_URL + "/api/v1/delivery-address/" + address._id, config(localStorage.getItem("token"))).then(res => { 
                props.updateAddress(res.data.data)
                setLoading(false);
            })
        }
    }

    return (
        <li className="list-group-item d-flex flex-row justify-content-between align-items-center">
            {loading && <Spinner />}
            <div>
                <h6>{address.name}</h6>
                <p>{address.addressString}</p>
            </div>
            <div>
                <button className="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target={"#editAddress"+address._id} >Edit</button>
                <EditAddress address={address} updateAddress={updateAddressHandler} />
                <button className="btn btn-sm btn-danger" onClick={deleteHandler} >
                    <i className="bi bi-trash-fill"></i>
                </button>
            </div>
        </li>
    )
}

export default AddressListItem;