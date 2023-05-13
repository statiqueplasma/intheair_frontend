import { Component } from "react";
import "./NavbareStyles.css";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import logo from "../../images/logo.webp";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LogoutIcon from "@mui/icons-material/Logout";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
class Navbare extends Component {
    state = { clicked: false };
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    };
    render() {
        let user = localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null;
        return (
            <nav className="NavbareItems">
                <div>
                    <img src={logo} className="nav-logo" />
                </div>

                <div className="menu-icons " onClick={this.handleClick}>
                    <i
                        className={
                            this.state.clicked ? "fas fa-times" : "fas fa-bars"
                        }
                    ></i>
                </div>

                <ul
                    className={
                        this.state.clicked ? "nav-menu active" : "nav-menu "
                    }
                >
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link className={item.cName} to={item.url}>
                                    <i className={item.icon}></i>
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                    {user ? (
                        user.user_type === "ADMIN" ? (
                            //if he is an admin we show "Admin Panel" and "logout"
                            <>
                                <li>
                                    <Link className="nav-linkss" to="/admin">
                                        <AdminPanelSettingsIcon />
                                        Admin Panel
                                    </Link>
                                </li>
                                <li>
                                    <Link className="nav-linkss" to="/logout">
                                        <LogoutIcon />
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            //if he is a normal user we show "Dashboard" and "logout"
                            <>
                                <li>
                                    <Link
                                        className="nav-linkss"
                                        to="/dashboard"
                                    >
                                        <SpaceDashboardIcon />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link className="nav-linkss" to="/logout">
                                        <LogoutIcon />
                                        Logout
                                    </Link>
                                </li>
                            </>
                        )
                    ) : (
                        //if not logged in we only show him the "Login" button"
                        <li>
                            <Link className="nav-linkss" to="/login">
                                <VpnKeyIcon />
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        );
    }
}
export default Navbare;
