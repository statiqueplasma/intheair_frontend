import { Outlet } from "react-router-dom";
import Topbar from "./global/topBar";
import Sidebar from "./global/sideBar";
import { ProSidebarProvider } from "react-pro-sidebar";
import BarreViolette from "../BarreViolette";
function AdminPage() {
    return (
        <ProSidebarProvider>
            <BarreViolette/>
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
