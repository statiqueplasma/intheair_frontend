import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { KeyboardReturnOutlined } from "@mui/icons-material";
function Logout() {
    // if the user is an admin/AG_DATA we send him to the adminpage else we send him to the dashboard
    const { user, logOut } = useAuth();
    useEffect(() => {
        if (user) {
            logOut();
        }
    }, [user]);
    return <Navigate to="/" />;
}

export default Logout;
