import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function AdminRoute() {
    const { user } = useAuth();
    //if the user has admin privilage we give him access to the page wanted, else we redirect him to his respective userpage
    return user.user_type === "ADMIN" ? (
        <Outlet />
    ) : (
        <Navigate to="/userroute" />
    );
}

export default AdminRoute;
