const AddressOptions = (props) => {

    return (
        props.addresses.map((address, key) => {
            return <option key={key} value={address._id}>{address.name}</option>
        })
    )
}

export default AddressOptions