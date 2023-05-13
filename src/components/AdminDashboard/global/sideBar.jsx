import {
    Sidebar,
    Menu,
    MenuItem,
    useProSidebar,
    menuClasses,
    sidebarClasses,
} from "react-pro-sidebar";
import { useState } from "react";
import { Box, IconButton, Typography, useTheme, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderIcon from "@mui/icons-material/Folder";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import AddHomeIcon from "@mui/icons-material/AddHome";
import AddchartIcon from "@mui/icons-material/Addchart";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useAuth } from "../../../contexts/AuthContext";

const Item = ({ title, to, icon, selected, setSelected }) => {
    let navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const click = (title, to) => {
        setSelected(title);
        navigate(to);
    };
    return (
        <MenuItem
            active={
                to === location.pathname ||
                to ===
                    location.pathname.slice(
                        0,
                        location.pathname.lastIndexOf("/")
                    )
            }
            rootStyles={{
                ["." + menuClasses.button]: {
                    "&:hover": {
                        color: `${colors.white[500]} !important`,
                        backgroundColor: `${colors.indigo[500]} !important`,
                    },
                },
            }}
            onClick={() => click(title, to)}
            icon={icon}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    );
};

const SideBar = () => {
    const { collapseSidebar, toggleSidebar, collapsed } = useProSidebar();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Dashboard");
    const { user, logIn } = useAuth();
    const separatorStyle =
        theme.palette.mode === "light"
            ? colors.black[400]
            : colors.turquoise[600];
    return (
        <div
            style={{
                display: "flex",
                minHeight: "920px",
                height: "100%",
                position: "sticky",
                top: 0,
            }}
        >
            <Sidebar
                transitionDuration={500}
                rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                        boxShadow: `${
                            collapsed
                                ? "1px 5px 10px -5px black"
                                : "1px 5px 15px -1px black"
                        }`,
                        backgroundColor: `${
                            theme.palette.mode === "dark"
                                ? colors.white[700]
                                : colors.white[900]
                        } !important`,
                        width: `${collapsed ? undefined : "250px"}`,
                    },
                    border: "none",
                    width: "250px",
                }}
            >
                <Menu
                    menuItemStyles={{
                        button: ({ level, active, hover, disabled }) => {
                            // only apply styles on first level elements of the tree
                            if (level === 0)
                                return {
                                    color: active
                                        ? colors.white[700]
                                        : theme.palette.mode === "dark"
                                        ? colors.black[400]
                                        : colors.indigo[600],
                                    backgroundColor: active
                                        ? colors.indigo[600]
                                        : undefined,
                                };
                        },
                    }}
                >
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        ml="15px"
                        color={colors.black[300]}
                    >
                        {!collapsed && (
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                margin="auto"
                            >
                                <Typography
                                    variant="h4"
                                    align="center"
                                    color={
                                        theme.palette.mode === "light"
                                            ? colors.indigo[600]
                                            : colors.black[300]
                                    }
                                    marginTop="40px"
                                >
                                    {user.username.toUpperCase()}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    align="center"
                                    color={
                                        theme.palette.mode === "light"
                                            ? colors.black[400]
                                            : colors.white[300]
                                    }
                                    marginBottom="40px"
                                >
                                    {user.user_type}
                                </Typography>
                            </Box>
                        )}
                        <IconButton onClick={() => collapseSidebar()}>
                            <MenuOutlinedIcon />
                        </IconButton>
                    </Box>
                    {/* ============================== USER SECTION ======================== */}
                    {!collapsed && (
                        <Typography
                            variant="h8"
                            color={separatorStyle}
                            display="block"
                            sx={{ m: "10px 0px 5px 10px" }}
                        >
                            User Section
                        </Typography>
                    )}

                    <Item
                        title="Users"
                        to="/admin/users"
                        icon={<SupervisorAccountIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Add/Edit user"
                        to="/admin/user"
                        icon={<ManageAccountsIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <hr
                        style={{
                            border: `1.5px solid ${colors.black["400"]}`,
                        }}
                    />
                    {/* ============================== Project SECTION ======================== */}
                    {!collapsed && (
                        <Typography
                            variant="h8"
                            display="block"
                            color={separatorStyle}
                            sx={{ m: "10px 0 5px 10px" }}
                        >
                            Project Section
                        </Typography>
                    )}
                    <Item
                        title="Projects/Types"
                        to="/admin/projects"
                        icon={<FolderIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Add/Edit Project"
                        to="/admin/project"
                        icon={<CreateNewFolderIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Add New Types"
                        to="/admin/projecttype"
                        icon={<AddchartIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Add/Edit Report"
                        to="/admin/report"
                        icon={<AssessmentIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <hr
                        style={{
                            border: `1.5px solid ${colors.black["400"]}`,
                        }}
                    />
                    {/* ============================== Company SECTION ======================== */}
                    {!collapsed && (
                        <Typography
                            variant="h8"
                            display="block"
                            color={separatorStyle}
                            sx={{ m: "10px 0 5px 10px" }}
                        >
                            Company Section
                        </Typography>
                    )}
                    <Item
                        title="Companies"
                        to="/admin/companies"
                        icon={<ApartmentIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Add/Edit Company"
                        to="/admin/company"
                        icon={<DomainAddIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Add Sector"
                        to="/admin/sector"
                        icon={<AddHomeIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <hr
                        style={{
                            border: `1.5px solid ${colors.black["400"]}`,
                        }}
                    />
                </Menu>
            </Sidebar>
        </div>
    );
};

export default SideBar;
