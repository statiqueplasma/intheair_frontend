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
                <Router basename="/intheair_frontend">
                    <AuthProvider>
                        <BarreViolette />
                        <DataProvider>
                            <Routes>
                                <Route path="/" element={<Home />} exact />
                                <Route
                                    exact
                                    path="/login"
                                    element={<Login />}
                                />
                                <Route exact path="/test" element={<Test />} />
                                <Route exact element={<PrivateRoute />}>
                                    <Route
                                        exact
                                        path="/dashboard"
                                        element={<Dashboard />}
                                    />
                                    <Route
                                        exact
                                        path="/userroute"
                                        element={<UserRoute />}
                                    />
                                    <Route element={<AdminRoute />}>
                                        <Route
                                            exact
                                            path="/admin"
                                            element={<AdminPage />}
                                        >
                                            <Route
                                                exact
                                                path="/admin/users/"
                                                element={<Users />}
                                            />
                                            <Route
                                                exact
                                                path="/admin/projects"
                                                element={<Projects />}
                                            />
                                            <Route
                                                exact
                                                path="/admin/projecttype"
                                                element={<ProjecttypeSingle />}
                                            />
                                            <Route
                                                exact
                                                path="/admin/project/"
                                                element={<ProjectSingle />}
                                            >
                                                <Route
                                                    exact
                                                    path="/admin/project/:id"
                                                    element={<ProjectSingle />}
                                                />
                                            </Route>
                                            <Route
                                                exact
                                                path="/admin/companies"
                                                element={<Companies />}
                                            />
                                            <Route
                                                exact
                                                path="/admin/sector"
                                                element={<SectorSingle />}
                                            />
                                            <Route
                                                exact
                                                path="/admin/company/"
                                                element={<CompanySingle />}
                                            >
                                                <Route
                                                    exact
                                                    path="/admin/company/:id"
                                                    element={<CompanySingle />}
                                                />
                                            </Route>
                                            <Route
                                                exact
                                                path="/admin/user/"
                                                element={<UserSingle />}
                                            >
                                                <Route
                                                    exact
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
