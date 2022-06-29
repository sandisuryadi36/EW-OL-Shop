import { viewRP } from "../../../app/script";

const ListTable = (props) => { 

    function sendItem(e) {
        props.sendItem(e.target.value)
    }
    
    return (
            props.orders.map((item, key) => {
                let total = item.orderItems.reduce((total, val) => total += val.total, 0)
                return (
                    <tr key={key}>
                        <td>{item.order_number}</td>
                        <td>{item.user.full_name}</td>
                        <td>{viewRP(total)}</td>
                        <td>{item.status}</td>
                        <td>
                            <button className="btn btn-primary" value={item._id} onClick={sendItem}>View</button>
                        </td>
                    </tr>
                )
            })
    )
}

export default ListTable;