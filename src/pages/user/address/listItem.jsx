import { useState } from "react";
import EditAddress from "./editAddress";
import * as c from "../../../app/data/constants";
import axios from "../../../app/data/fetching";

const AddressListItem = (props) => { 
    const [address, setAddresses] = useState(props.address);

    const updateAddressHandler = (e) => { 
        setAddresses(e)
    }

    const deleteHandler = () => { 
        console.log(address._id)
        if (window.confirm("Are you sure you want to delete this address?")) { 
            axios.delete(c.API_URL + "/api/v1/delivery-address/" + address._id).then(res => { 
                props.updateAddress(res.data.data)
            })
        }
    }

    return (
        <li className="list-group-item d-flex flex-row justify-content-between align-items-center">
            <div>
                <h6>{address.name}</h6>
                <p>
                    {
                        address.detail + ", "
                        + address.kelurahan + ", "
                        + address.kecamatan + ", "
                        + address.kota + ", "
                        + address.provinsi
                    }
                </p>
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