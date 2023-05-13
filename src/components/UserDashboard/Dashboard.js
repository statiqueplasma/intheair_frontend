import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {  useEffect } from "react";
import BarreViolette from "../BarreViolette";

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
            <BarreViolette/>
        </>  
    );
}

export default Dashboard;