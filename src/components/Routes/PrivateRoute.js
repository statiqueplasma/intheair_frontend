import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Children } from "react";



const PrivateRoute = ({children, ...rest}) => {
    let {user} = useAuth()
    console.log(user)
    //if the user is logged in we give him access to the page he is trying to access, else we redirect him to the login page
    return user === null ? <Navigate to="/login"/> : <Outlet />
}


export default PrivateRoute;