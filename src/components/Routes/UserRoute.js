import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function UserRoute() {
    // if the user is an admin/AG_DATA we send him to the adminpage else we send him to the dashboard
    let {user} = useAuth()
    return (
        user.user_type === "AG_DATA" ? <Navigate to='/admin'/> : <Navigate to='/dashboard'/>
    );
}

export default UserRoute;