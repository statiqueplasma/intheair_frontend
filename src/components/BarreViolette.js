import { Container, Navbar } from "react-bootstrap";
import logo from "../images/logoBlanc.webp";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@mui/material";
import Login from "./Login";

function BarreViolette() {
    const violet = "#674CC0";
    const vert = "#60B4B8";

    const { user, logOut } = useAuth();
    const navigate = useNavigate();
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
        paddingLeft: 20,
        paddingRight: 20,
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
        fontSize: "16px",
        margin: "10px",
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
                        alignItems: "center",
                    }}
                >
                    <Button
                        onClick={() => navigate("/")}
                        variant="contained"
                        size="medium"
                        style={{ margin: "10px" }}
                    >
                        Home
                    </Button>
                    {/* <span style={navLinkSeparatorStyle}> | </span> */}

                    {/* if the user is logged in we show the respective userpage button*/}
                    {user ? (
                        user.user_type === "ADMIN" ||
                        user.user_type === "AG_DATA" ? (
                            //if he is an admin we show "Admin Panel" and "logout"
                            <div style={{ float: "right" }}>
                                <Button
                                    onClick={() => navigate("/admin")}
                                    variant="contained"
                                    size="medium"
                                    style={{ margin: "10px" }}
                                >
                                    Admin Panel
                                </Button>
                                {/* <span style={navLinkSeparatorStyle}> | </span> */}
                                <Button
                                    onClick={() => navigate("/logout")}
                                    variant="contained"
                                    size="medium"
                                    style={{ margin: "10px" }}
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            //if he is a normal user we show "Dashboard" and "logout"
                            <div style={{ float: "right" }}>
                                <Button
                                    onClick={() => navigate("/dashboard")}
                                    variant="contained"
                                    size="medium"
                                    style={{ margin: "10px" }}
                                >
                                    Dashboard
                                </Button>
                                {/* <span style={navLinkSeparatorStyle}> | </span> */}
                                <Button
                                    onClick={() => logOut()}
                                    variant="contained"
                                    size="medium"
                                    style={{ margin: "10px" }}
                                >
                                    Logout
                                </Button>
                            </div>
                        )
                    ) : (
                        //if not logged in we only show him the "Login" button"
                        <Button
                            onClick={() => navigate("/login")}
                            variant="contained"
                            size="medium"
                            style={{ margin: "10px" }}
                        >
                            Login
                        </Button>
                    )}
                </div>
            </Container>
        </Navbar>
    );
}

export default BarreViolette;
