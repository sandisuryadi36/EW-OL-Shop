import axios from "../../../app/data/fetching";
import Input from "../../../component/Input";
import * as c from "../../../app/data/constants";

const EditAddress = (props) => { 

    const submitHandler = (e) => { 
        e.preventDefault();
        let payload = new URLSearchParams(new FormData(e.target));

        axios.put(c.API_URL + "/api/v1/delivery-address/" + props.address._id, payload).then(res => { 
            document.querySelector("#closeModal"+props.address._id).click()
            props.updateAddress(res.data.data)
        })
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
                            <Input type="text" name="name" label="Name" defaultValue={props.address.name} />
                            <Input type="text" name="detail" label="Detail" defaultValue={props.address.detail} />
                            <Input type="text" name="kelurahan" label="Kelurahan" defaultValue={props.address.kelurahan} />
                            <Input type="text" name="kecamatan" label="Kecamatan" defaultValue={props.address.kecamatan} />
                            <Input type="text" name="kota" label="Kota" defaultValue={props.address.kota} />
                            <Input type="text" name="provinsi" label="Provinsi" defaultValue={props.address.provinsi} />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" form={"editAddressForm"+props.address._id}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAddress;