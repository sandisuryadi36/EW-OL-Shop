import { viewRP } from "../../../app/script";

const ListTable = (props) => { 

    function sendItem(e) {
        props.sendItem(e.target.value)
    }
    
    return (
            props.orders.map((item, key) => {
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
    )
}

export default ListTable;