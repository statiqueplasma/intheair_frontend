import Home from "./Home";
import Homee from "./Home-e";
import UserRoute from "./Routes/UserRoute";
import Dashboard from "./UserDashboard/Dashboard";
import BarreViolette from "./BarreViolette";
import Login from "./Login";
import TestGeoData from "./TestGeoData";
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
// import Test from "./AdminDashboard/test";

import Users1 from "./UserDashboard/scenes/users";
import UserSingle1 from "./UserDashboard/scenes/userSingle";
import UserProjects from "./UserDashboard/scenes/projectsPage";
import UserProjectSingle from "./UserDashboard/scenes/projectSingle";
import NewProject from "./UserDashboard/scenes/NewProject";
import ReportPage1 from "./UserDashboard/scenes/report";
import ViewGeo from "./UserDashboard/scenes/ViewGeo";
import Analytics from "./UserDashboard/scenes/analytics";

import "../styles/App.css";

import About from "./HomeCode/About/About";
import Aboute from "./HomeCodee/Aboute";

import Services from "./HomeCode/Services";
import Servicese from "./HomeCodee/Servicese";

import Contact from "./HomeCode/Contact";

import Faq from "./HomeCode/Faq";
import Faqe from "./HomeCodee/Faqe";

import Cgv from "./HomeCode/Cgv";
import Cgve from "./HomeCodee/Cgve";

import Logout from "./Routes/Logout";
import Map from "./AdminDashboard/scenes/testRaster";
import ProjectsMap from "./UserDashboard/scenes/ProjectsMap";
import MapView from "./UserDashboard/scenes/mapview";
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
                                <Route path="/test" element={<ProjectsMap />} />
                                <Route
                                    path="/testgeodata"
                                    element={<TestGeoData />}
                                />
                                <Route path="/testraster" element={<Map />} />
                                <Route
                                    path="/testan/:id"
                                    element={<Analytics />}
                                />
                                <Route
                                    path="/tesreport/:id"
                                    element={<ReportPage1 />}
                                />
                                <Route path="/about" element={<About />} />
                                <Route path="/faq" element={<Faq />} />
                                <Route path="/cgv" element={<Cgv />} />
                                <Route
                                    path="/services"
                                    element={<Services />}
                                />
                                ///////////////////////////////English//////////////////////////////////////
                                <Route path="/homee" element={<Homee />} />
                                <Route path="/testmap" element={<MapView />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/logout" element={<Logout />} />
                                {/* <Route path="/test" element={<Test />} /> */}
                                <Route
                                    path="/testgeodata"
                                    element={<TestGeoData />}
                                />
                                <Route path="/aboute" element={<Aboute />} />
                                <Route path="/faqe" element={<Faqe />} />
                                <Route path="/cgve" element={<Cgve />} />
                                <Route
                                    path="/servicese"
                                    element={<Servicese />}
                                />
                                /////////////////////////////////////////////////////////////////////////////
                                <Route element={<PrivateRoute />}>
                                    {/* <Route path="/userroute" element={<UserRoute />}/>
									<Route path="/projects">
										<Route index element={<ProjectsPage/>}/>
										<Route element={<ProjectRoute/>}>
											<Route path=":id" element={<Project/>}/>
                                        </Route>
                                    </Route> */}
                                    <Route
                                        path="/userroute"
                                        element={<UserRoute />}
                                    />
                                    <Route
                                        path="/mapview/:id"
                                        element={<MapView />}
                                    >
                                        <Route
                                            path="/mapview/:id/:projectfile"
                                            element={<MapView />}
                                        />
                                    </Route>
                                    <Route
                                        path="/dashboard"
                                        element={<Dashboard />}
                                    >
                                        <Route
                                            path="/dashboard/user/"
                                            element={<Users1 />}
                                        />

                                        <Route
                                            path="/dashboard/userprojects"
                                            element={<UserProjects />}
                                        />
                                        <Route
                                            path="/dashboard/NewProject"
                                            element={<NewProject />}
                                        />
                                        <Route
                                            path="/dashboard/report/:id"
                                            element={<ReportPage1 />}
                                        />
                                        <Route
                                            path="/dashboard/project/"
                                            element={<UserProjectSingle />}
                                        >
                                            <Route
                                                path="/dashboard/project/:id"
                                                element={<UserProjectSingle />}
                                            />
                                        </Route>

                                        <Route
                                            path="/dashboard/analytics/:id/:file_name"
                                            element={<Analytics />}
                                        />
                                        <Route
                                            path="/dashboard/user/"
                                            element={<UserSingle1 />}
                                        >
                                            <Route
                                                path="/dashboard/user/:id"
                                                element={<UserSingle1 />}
                                            />
                                        </Route>
                                        <Route
                                            path="/dashboard/report/"
                                            element={<ReportPage1 />}
                                        >
                                            <Route
                                                path="/dashboard/report/:id"
                                                element={<ReportPage1 />}
                                            />
                                        </Route>
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
