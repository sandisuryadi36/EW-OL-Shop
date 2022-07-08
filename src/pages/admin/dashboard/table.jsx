import ListTable from "./listTable"

const DashboardTable = (props) => {
    const {orders, title, status} = props

    function compare(a, b) {
        if (a.createdAt < b.createdAt) return -1;
        if (a.createdAt > b.createdAt) return 1;
        return 0;
    }

    function sendItem(val) {
        props.sendItem(val)
    }

    return (
        <div className="overflow-auto">
            <h5>{title}</h5>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Order No.</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th className="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && status !== "other"
                        ? <ListTable orders={orders.filter(item => item.status === status).sort(compare)} sendItem={sendItem} />
                        : <ListTable orders={orders.filter(item => item.status !== "waiting payment" && item.status !== "paid" && item.status !== "processing").sort(compare)} sendItem={sendItem} />
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DashboardTable