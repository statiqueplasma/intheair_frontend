import { Container, Navbar } from "react-bootstrap";
import logo from "../images/logoBlanc.webp";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function BarreViolette() {
    const violet = "#674CC0";
    const vert = "#60B4B8";

    const { user, logOut } = useAuth();

    const navBarStyle = {
        backgroundColor: user
            ? user.user_type === "ADMIN" || user.user_type === "AG_DATA"
                ? vert
                : violet
            : violet,
    };

    const navLinksStyle = {
        color: "white",
        textDecoration: "none",
        fontWeight: "bold",
        float: "left",
        paddingLeft: 10,
        paddingRight: 10,
    };
    const navLinksStyleHover = {
        color: "#60B4B8",
        textDecoration: "un",
        float: "left",
        paddingLeft: 10,
        paddingRight: 10,
    };
    const navLinkSeparatorStyle = {
        color: user
            ? user.user_type === "ADMIN" || user.user_type === "AG_DATA"
                ? violet
                : vert
            : vert,
        float: "left",
        fontWeight: "bold",
    };

    return (
        <Navbar style={navBarStyle} variant="dark">
            <Container fluid>
                <Navbar.Brand href="">
                    <img
                        alt=""
                        src={logo}
                        width="145"
                        height="50"
                        className="d-inline-block align-top"
                    />{" "}
                </Navbar.Brand>
                {/* adding the links in the nav bar */}
                <div
                    className="nav-links"
                    style={{
                        color: "white",
                        textDecoration: "none",
                        display: "inline-block",
                    }}
                >
                    <Link style={navLinksStyle} to="/">
                        Home
                    </Link>
                    <span style={navLinkSeparatorStyle}> | </span>

                    {/* if the user is logged in we show the respective userpage button*/}
                    {user ? (
                        user.user_type === "ADMIN" ||
                        user.user_type === "AG_DATA" ? (
                            //if he is an admin we show "Admin Panel" and "logout"
                            <div style={{ float: "right" }}>
                                <Link style={navLinksStyle} to="/admin">
                                    Admin Panel
                                </Link>
                                <span style={navLinkSeparatorStyle}> | </span>
                                <p style={navLinksStyle} onClick={logOut}>
                                    Logout
                                </p>
                            </div>
                        ) : (
                            //if he is a normal user we show "Dashboard" and "logout"
                            <div style={{ float: "right" }}>
                                <Link style={navLinksStyle} to="/dashboard">
                                    Dashboard
                                </Link>
                                <span style={navLinkSeparatorStyle}> | </span>
                                <a style={navLinksStyle} onClick={logOut}>
                                    Logout
                                </a>
                            </div>
                        )
                    ) : (
                        //if not logged in we only show him the "Login" button"
                        <Link style={navLinksStyle} to="/login">
                            Login
                        </Link>
                    )}
                </div>
            </Container>
        </Navbar>
    );
}

export default BarreViolette;
