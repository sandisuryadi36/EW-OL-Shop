import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MenuList = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.slice.userData);

    const userMenu = [
        {
            name: "Profile",
            link: "/user/profile"
        },
        {
            name: "My Address",
            link: "/user/address"
        },
        {
            name: "My Orders",
            link: "/user/order"
        }
    ]

    const adminMenu = [
        {
            name: "Dashboard",
            link: "/admin/dashboard/process"
        },
        {
            name: "Profile",
            link: "/admin/profile"
        },
        {
            name: "List Products",
            link: "/admin/list"
        },
        {
            name: "Add Product",
            link: "/admin/add"
        },
        {
            name: "Manage Category",
            link: "/admin/categories"
        }
    ]

    return (
        <div>
            {user.role === "admin"
                ? adminMenu.map((item, index) => {
                    return (
                        <div key={index}>
                            <button onClick={() => navigate(item.link)} className="btn-link no-m dropdown-item">{item.name}</button>
                        </div>
                    )
                })
                : userMenu.map((item, index) => {
                    return (
                        <div key={index}>
                            <button onClick={() => navigate(item.link)} className="btn-link no-m dropdown-item">{item.name}</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MenuList;