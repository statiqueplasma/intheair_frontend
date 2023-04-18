import {
    Sidebar,
    Menu,
    MenuItem,
    useProSidebar,
    menuClasses,
    sidebarClasses,
} from "react-pro-sidebar";
import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
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
import FileOpenIcon from "@mui/icons-material/FileOpen";

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
    const separatorStyle =
        theme.palette.mode === "light"
            ? colors.black[400]
            : colors.turquoise[600];
    return (
        <div style={{ display: "flex", minHeight: "900px", height: "100%" }}>
            <Sidebar
                transitionDuration={300}
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
                            <Typography
                                variant="h6"
                                color={
                                    theme.palette.mode === "light"
                                        ? colors.indigo[600]
                                        : colors.black[300]
                                }
                                marginTop="40px"
                                marginBottom="40px"
                            >
                                ADMINIS
                            </Typography>
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
                        title="Projects"
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
                        title="Add Project Type"
                        to="/admin/projecttype"
                        icon={<BookmarkAddIcon />}
                        selected={selected}
                        setSelected={setSelected}
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
                </Menu>
            </Sidebar>
        </div>
    );
};

export default SideBar;
