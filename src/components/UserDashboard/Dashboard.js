import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import BarreViolette from "../BarreViolette";
import BarChartSample from "../../data/barchart.json";
import LineChartSample from "../../data/linechart.json";
import PieChartSample from "../../data/piechart.json";
import { Outlet } from "react-router-dom";
import Topbar from "./global/topBar";
import Sidebar from "./global/sideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import ProjectsGeoData from "../ProjectsGeoData";
import { useData } from "../../contexts/DataContext";
function Dashboard() {
    const { updateToken, user } = useAuth();
    const [loading, setLoading] = useState(true);
    const {
        companyData,
        fetchSingleCompanyData,
        userData,
        fetchSingleUserData,
    } = useData();

    useEffect(() => {
        if (loading) {
            updateToken();
            fetchSingleUserData(user.user_id);
            setLoading(false);
        }
        if (userData) {
            fetchSingleCompanyData(userData.company_id);
        }
    }, [loading, userData]);
    if (user.user_type !== "CLIENT") {
        return <Navigate to="/userroute" />;
    }
    return (
        //<Graphs graph_type={"LineChart"} data={LineChartSample} />
        <ProSidebarProvider>
            <BarreViolette />
            <div style={{ display: "flex", height: "100%" }}>
                <Sidebar logo={companyData ? companyData.company_logo : null} />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Topbar />
                    {/* <ProjectsGeoData/> */}
                    <Outlet
                        style={{
                            flex: "right",
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </div>
            </div>
        </ProSidebarProvider>
    );
}

export default Dashboard;
