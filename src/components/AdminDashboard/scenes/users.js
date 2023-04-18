import Header from "../global/header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { GridToolbar } from "@mui/x-data-grid";
import { useData } from "../../../contexts/DataContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import Table from "../global/table";
import Loading from "../global/loading";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
const Users = () => {
    let navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { usersData, fetchUsersData } = useData();
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const iconStyle =
        theme.palette.mode === "light" ? colors.white[500] : colors.black[200];
    useEffect(() => {
        if (loading) {
            fetchUsersData();
            setLoading(false);
        }
        if (usersData) {
            setDataLoaded(true);
        }
    }, [usersData, loading]);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "first_name",
            headerName: "First Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "last_name",
            headerName: "Last Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "username",
            headerName: "Username",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "telephone_number",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "hubspot_user_id",
            headerName: "Hubspot ID",
            flex: 1,
        },
        {
            field: "company",
            headerName: "Company",
            flex: 1,
        },
        {
            field: "position",
            headerName: "Position",
            flex: 1,
        },
        {
            field: "user_type",
            headerName: "User Type",
            flex: 1,
        },
        {
            field: "linkedin_url",
            headerName: "LinkedIn",
            flex: 1,
        },
        {
            field: "last_login",
            headerName: "Last Login",
            flex: 1,
        },
        {
            field: "last_edit_date",
            headerName: "Last Edit",
            flex: 1,
            status: true,
        },
        {
            field: "Edit",
            headerName: "Edit",
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <Box
                        mr="5px"
                        height="40px"
                        display="flex"
                        justifyContent="center"
                        borderRadius="4px"
                        backgroundColor={colors.indigo[500]}
                        sx={{
                            "&:hover": {
                                backgroundColor: `${
                                    theme.palette.mode === "light"
                                        ? colors.turquoise[500]
                                        : colors.indigo[200]
                                }`,
                            },
                        }}
                    >
                        <IconButton
                            sx={{
                                width: "100%",
                                fontSize: "30px",
                                color: `${iconStyle}`,
                                "&:hover": {
                                    color: `${colors.white[500]}`,
                                },
                            }}
                            onClick={() => {
                                navigate(`/admin/user/${id}`);
                            }}
                        >
                            <SettingsSuggestIcon fontSize="30px" />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];
    const visibility = {
        linkedin_url: false,
        last_login: false,
        last_edit_date: false,
    };
    return (
        <Box minHeight="800px" height="100%">
            {dataLoaded ? (
                <Box display="flex" flexDirection="column">
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb="10px"
                        mt="5px"
                    >
                        <Header
                            icon={<SupervisorAccountIcon fontSize="inherit" />}
                            title="Users"
                            subtitle="List of the Users in Database"
                        />
                        <IconButton
                            onClick={() => navigate("/admin/user/")}
                            sx={{
                                marginRight: "50px",
                                height: "100px",
                                width: "100px",
                                fontSize: "55px",
                                color: colors.indigo[500],
                            }}
                        >
                            <PersonAddIcon fontSize="55px" />
                        </IconButton>
                    </Box>
                    <Table
                        fields={columns}
                        visibility={visibility}
                        data={usersData}
                        idParam={(row) => row.id}
                        components={{ Toolbar: GridToolbar }}
                        paginationModel={{ pageSize: 15, page: 0 }}
                        pageSizeOptions={[15, 25]}
                    />
                </Box>
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default Users;
