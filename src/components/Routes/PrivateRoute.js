import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function PrivateRoute({ children, ...rest }) {
    const { user } = useAuth();
    //if the user is logged in we give him access to the page he is trying to access, else we redirect him to the login page
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
