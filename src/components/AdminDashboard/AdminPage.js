import { Navigate, Outlet } from "react-router-dom";
import Topbar from "./global/topBar";
import Sidebar from "./global/sideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import BarreViolette from "../BarreViolette";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

function AdminPage() {
    const { updateToken, user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            updateToken();
            setLoading(false);
        }
    });
    if (user.user_type !== "AG_DATA" && user.user_type !== "AG_DATA") {
        return <Navigate to="/userroute" />;
    }
    return (
        <ProSidebarProvider>
            <BarreViolette />
            <div style={{ display: "flex", height: "100%" }}>
                <Sidebar />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                    }}
                >
                    <Topbar />
                    <Outlet
                        style={{
                            flex: "right",
                            width: "100%",
                        }}
                    />
                </div>
            </div>
        </ProSidebarProvider>
    );
}

export default AdminPage;
