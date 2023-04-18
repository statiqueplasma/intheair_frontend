import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {  useEffect } from "react";


function Dashboard() {
    let navigate = useNavigate()
    const {user, logIn} = useAuth();
    
    //if the user is already logged in, we send the user to his respective userpage
    useEffect (() => {
        if (user.user_type === 'AG_DATA'){
            navigate("/adminpage")
        } 
    }, [])
    return (
        <>
            <h1>User Page</h1>
            <h3>à faire par Mehdi</h3>
        </>  
    );
}

export default Dashboard;