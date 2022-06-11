import axios from "axios";
import { useEffect, useState } from "react";
import * as c from "../../../app/data/constants";
import AddressListItem from "./listItem";

const AddressList = (props) => { 
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        axios.get(c.API_URL + "/api/v1/delivery-address").then(res => setAddresses(res.data.data))
    }, [])

    return (
        <div>
            <h1>Address List</h1>
            <ul className="list-group list-group-flush">
                {addresses.map((address, key) => { 
                    return (
                        <AddressListItem address={address} key={key} />
                    )
                })}
            </ul>
        </div>
    );
}

export default AddressList;