import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {  useEffect } from "react";
import BarreViolette from "../BarreViolette";
import Graphs from "./Graphs";
import BarChartSample from "../../data/barchart.json";
import LineChartSample from "../../data/linechart.json";
import PieChartSample from "../../data/piechart.json";

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
            <Graphs graph_type={"LineChart"} data={LineChartSample} />
        </>  
    );
}

export default Dashboard;