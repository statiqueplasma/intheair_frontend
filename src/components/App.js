import Home from "./Home";
import UserRoute from "./Routes/UserRoute";
import Dashboard from "./UserDashboard/Dashboard";
import BarreViolette from "./BarreViolette";
import Login from "./Login";
import TestGeoData from "./UserDashboard/Project";
import ProjectsPage from "./UserDashboard/ProjectsPage";
import Project from "./UserDashboard/Project";
import ProjectRoute from "./Routes/ProjectRoute";
import SplitMap from "./SplitMap";
import TestGraphs from "./UserDashboard/TestGraphs";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import DataProvider from "../contexts/DataContext";
import PrivateRoute from "./Routes/PrivateRoute";
import AdminPage from "./AdminDashboard/AdminPage";
import AdminRoute from "./Routes/AdminRoute";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Companies from "./AdminDashboard/scenes/companies";
import CompanySingle from "./AdminDashboard/scenes/companySingle";
import SectorSingle from "./AdminDashboard/scenes/sectorSingle";
import Users from "./AdminDashboard/scenes/users";
import UserSingle from "./AdminDashboard/scenes/userSingle";
import Projects from "./AdminDashboard/scenes/projects";
import ProjectSingle from "./AdminDashboard/scenes/projectSingle";
import ProjecttypeSingle from "./AdminDashboard/scenes/projecttypeSingle";
import ReportPage from "./AdminDashboard/scenes/report";
import "../styles/App.css";

import About from "./HomeCode/About";
import Services from "./HomeCode/Services";
import Contact from "./HomeCode/Contact";
import Faq from "./HomeCode/Faq";
import Navbare from "./HomeCode/Navbare";
import Logout from "./Routes/Logout";
import Map from "./AdminDashboard/scenes/testRaster";

function App() {
    const [theme, colorMode] = useMode();
    const user = localStorage.getItem("authToken");
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <AuthProvider>
                        <DataProvider>
                            <Routes>
                                <Route path="/" element={<Home />} exact />
                                <Route path="/login" element={<Login />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/test" element={<Map />} />
                                <Route
                                    path="/testgeodata"
                                    element={<TestGeoData />}
                                />
                                <Route
                                    path="/testgraphs"
                                    element={<TestGraphs />}
                                />
                                <Route path="/about" element={<About />} />
                                <Route path="/faq" element={<Faq />} />
                                <Route
                                    path="/services"
                                    element={<Services />}
                                />

                                <Route element={<PrivateRoute />}>
                                    <Route
                                        path="/dashboard"
                                        element={<Dashboard />}
                                    />
                                    <Route
                                        path="/userroute"
                                        element={<UserRoute />}
                                    />
                                    <Route
                                        path="/projects"
                                        element={<ProjectsPage />}
                                    />
                                    <Route element={<ProjectRoute />}>
                                        <Route
                                            path="/projects/:id"
                                            element={<Project />}
                                        />
                                    </Route>

                                    <Route element={<AdminRoute />}>
                                        <Route
                                            path="/admin"
                                            element={<AdminPage />}
                                        >
                                            <Route
                                                path="/admin/users/"
                                                element={<Users />}
                                            />
                                            <Route
                                                path="/admin/projects"
                                                element={<Projects />}
                                            />
                                            <Route
                                                path="/admin/projecttype"
                                                element={<ProjecttypeSingle />}
                                            />
                                            <Route
                                                path="/admin/project/"
                                                element={<ProjectSingle />}
                                            >
                                                <Route
                                                    path="/admin/project/:id"
                                                    element={<ProjectSingle />}
                                                />
                                            </Route>
                                            <Route
                                                path="/admin/companies"
                                                element={<Companies />}
                                            />
                                            <Route
                                                path="/admin/sector"
                                                element={<SectorSingle />}
                                            />
                                            <Route
                                                path="/admin/company/"
                                                element={<CompanySingle />}
                                            >
                                                <Route
                                                    path="/admin/company/:id"
                                                    element={<CompanySingle />}
                                                />
                                            </Route>
                                            <Route
                                                path="/admin/user/"
                                                element={<UserSingle />}
                                            >
                                                <Route
                                                    path="/admin/user/:id"
                                                    element={<UserSingle />}
                                                />
                                            </Route>
                                            <Route
                                                path="/admin/report/"
                                                element={<ReportPage />}
                                            >
                                                <Route
                                                    path="/admin/report/:id"
                                                    element={<ReportPage />}
                                                />
                                            </Route>
                                        </Route>
                                    </Route>
                                </Route>

                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </DataProvider>
                    </AuthProvider>
                </Router>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
