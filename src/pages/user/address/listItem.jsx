import { useState } from "react";
import EditAddress from "./editAddress";

const AddressListItem = (props) => { 
    const [address, setAddresses] = useState(props.address);

    const updateAddressHandler = (e) => { 
        setAddresses(e)
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
            </div>
        </li>
    )
}

export default AddressListItem;