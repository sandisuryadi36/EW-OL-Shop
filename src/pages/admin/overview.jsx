import { useSelector } from "react-redux";

const Overview = () => { 
    const user = useSelector(state => state.slice.userData);
    return (
        <div>
            <h3>Welcome {user.full_name}</h3>
        </div>    
    )
}

export default Overview;