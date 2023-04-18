import Home from "./Home";
import UserRoute from "./Routes/UserRoute";
import Dashboard from "./UserDashboard/Dashboard";
import BarreViolette from "./BarreViolette";
import Login from "./Login";
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
import Files from "./AdminDashboard/scenes/files";
import FileSingle from "./AdminDashboard/scenes/fileSingle";
import Test from "./AdminDashboard/test";
import "./App.css";
function App() {
    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <AuthProvider>
                        <BarreViolette />
                        <DataProvider>
                            <Routes>
                                <Route path="/" element={<Home />} exact />
                                <Route path="/login" element={<Login />} />
                                <Route path="/test" element={<Test />} />
                                <Route element={<PrivateRoute />}>
                                    <Route
                                        path="/dashboard"
                                        element={<Dashboard />}
                                    />
                                    <Route
                                        path="/userroute"
                                        element={<UserRoute />}
                                    />
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
