import { viewRP } from "../../../app/script";

const ListTable = (props) => { 

    function sendItem(e) {
        props.sendItem(e.target.value)
    }
    
    return (
            props.orders.length > 0 
                ? props.orders.map((item, key) => {
                    return (
                        <tr key={key}>
                            <td>{item.order_number}</td>
                            <td>{item.user.full_name}</td>
                            <td>{viewRP(item.total)}</td>
                            <td>{item.status}</td>
                            <td className="text-end">
                                <button className="btn btn-primary" value={item._id} onClick={sendItem}>View</button>
                            </td>
                        </tr>
                    )
                })
                : <tr><td colSpan="5" className="text-center">No data</td></tr>
    )
}

export default ListTable;