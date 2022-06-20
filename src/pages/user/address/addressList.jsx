import axios from "axios";
import { useEffect, useState } from "react";
import * as c from "../../../app/data/constants";
import AddAddress from "./addAddress";
import AddressListItem from "./listItem";
import Spinner from "../../../component/spinner";
import { config } from "../../../app/axiosSet";

const AddressList = (props) => { 
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(c.API_URL + "/api/v1/delivery-address", config(localStorage.getItem("token"))).then(res => {
            setLoading(false);
            setAddresses(res.data.data)
        })
    }, [])

    const updateListHandler = (address) => { 
        setLoading(true);
        axios.get(c.API_URL + "/api/v1/delivery-address", config(localStorage.getItem("token"))).then(res => {
            setLoading(false);
            setAddresses(res.data.data)
        })
    }

    return (
        <div>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <h1>Address List</h1>
                <div>
                    <button className="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target={"#addAddress"} >Add address</button>
                    <AddAddress updateAddress={updateListHandler} />
                </div>
            </div>
            <div>
                {loading && <Spinner child={true} />}
                <ul className="list-group list-group-flush">
                    {addresses.map((address, key) => { 
                        return (
                            <AddressListItem address={address} key={key} updateAddress={updateListHandler} />
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default AddressList;