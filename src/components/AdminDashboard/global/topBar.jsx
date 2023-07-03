import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useData } from "../../../contexts/DataContext";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const { responsStat } = useData();
    const [open, setOpen] = useState(true);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState([]);
    const styleIconTop =
        theme.palette.mode === "light"
            ? colors.black[400]
            : colors.turquoise[500];

    const click = () => {
        colorMode.toggleColorMode();
    };
    useEffect(() => {
        if (responsStat) {
            console.log(responsStat);

            if (responsStat.status >= 200 && responsStat.status <= 203) {
                if (responsStat.keep !== null) {
                    setSuccess((arr) => [...arr, responsStat]);
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                }
            } else {
                setErrors((arr) => [...arr, responsStat]);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }
            setOpen(true);
        }
    }, [responsStat]);
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p={2}
        >
            {/* SEARCH BAR */}
            <Box
                display="flex"
                justifyContent="space-between"
                flexDirection="raw"
            >
                <Box
                    display="flex"
                    backgroundColor={
                        theme.palette.mode === "light"
                            ? colors.black[100]
                            : colors.indigo[100]
                    }
                    borderRadius="3px"
                >
                    <InputBase
                        sx={{
                            ml: 2,
                            flex: 1,
                        }}
                        placeholder="Search"
                    />
                    <IconButton type="button" sx={{ p: 1 }}>
                        <SearchIcon
                            style={{
                                color: `${styleIconTop}`,
                            }}
                        />
                    </IconButton>
                </Box>

                {/* ICONS */}
                <Box display="flex">
                    <IconButton onClick={click}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlinedIcon
                                style={{
                                    color: `${styleIconTop}`,
                                }}
                            />
                        ) : (
                            <LightModeOutlinedIcon
                                style={{
                                    color: `${styleIconTop}`,
                                }}
                            />
                        )}
                    </IconButton>
                    <IconButton>
                        <NotificationsOutlinedIcon
                            style={{
                                color: `${styleIconTop}`,
                            }}
                        />
                    </IconButton>
                    <IconButton>
                        <SettingsOutlinedIcon
                            style={{
                                color: `${styleIconTop}`,
                            }}
                        />
                    </IconButton>
                    <IconButton>
                        <PersonOutlinedIcon
                            style={{
                                color: `${styleIconTop}`,
                            }}
                        />
                    </IconButton>
                </Box>
            </Box>
            {errors.length > 0 &&
                errors.map((response, index) => {
                    return (
                        // ======== NOTIFICATION ERROR ============
                        <Box
                            key={index}
                            sx={{ width: "100%", m: "10px 0 0 0" }}
                        >
                            <Collapse in={open}>
                                <Alert
                                    severity="error"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="#c70300"
                                            size="small"
                                            fontSize="300px"
                                            onClick={() => {
                                                setOpen(false);
                                                setErrors([]);
                                            }}
                                        >
                                            <CloseIcon fontSize="300px" />
                                        </IconButton>
                                    }
                                    sx={{
                                        p: "40px 20px ",
                                        height: "60px",
                                        alignItems: "center",
                                    }}
                                >
                                    <AlertTitle>
                                        Error {response.status}!
                                    </AlertTitle>
                                    {response.error}—
                                    <strong>
                                        {response.message !== ""
                                            ? response.message
                                            : "Please try again or contact the Administrator"}
                                    </strong>
                                </Alert>
                            </Collapse>
                        </Box>
                    );
                })}

            {success.length > 0 &&
                success.map((response, index) => {
                    return (
                        // ======== NOTIFICATION SUCCESS ============
                        <Box
                            key={index}
                            sx={{ width: "100%", m: "10px 0 0 0" }}
                        >
                            <Collapse in={open}>
                                <Alert
                                    severity="success"
                                    action={
                                        <IconButton
                                            aria-label="close"
                                            color="#065006"
                                            size="small"
                                            fontSize="300px"
                                            onClick={() => {
                                                setOpen(false);

                                                setSuccess([]);
                                            }}
                                        >
                                            <CloseIcon fontSize="300px" />
                                        </IconButton>
                                    }
                                    sx={{
                                        mb: 2,
                                        height: "60px",
                                        alignItems: "center",
                                        color: "#065006",
                                        backgroundColor: "#8dee8d",
                                    }}
                                >
                                    <AlertTitle>Successful !</AlertTitle>
                                    {response.message}
                                </Alert>
                            </Collapse>
                        </Box>
                    );
                })}
        </Box>
    );
};

export default Topbar;
