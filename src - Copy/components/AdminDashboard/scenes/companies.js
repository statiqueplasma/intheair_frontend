import Header from "../global/header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, useTheme, Button } from "@mui/material";
import { tokens } from "../../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useData } from "../../../contexts/DataContext";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Table from "../global/table";
import Loading from "../global/loading";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ApartmentIcon from "@mui/icons-material/Apartment";

const Companies = () => {
    const isNonMobile = useMediaQuery("(min-width:700px)");
    let navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {
        companiesData,
        sectorsData,
        fetchCompaniesData,
        fetchSectorsData,
        deleteSectorData,
    } = useData();
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [openPoper, setOpenPoper] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const iconStyle =
        theme.palette.mode === "light" ? colors.white[500] : colors.black[200];

    const handleClick = (id) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpenPoper((openPoper) => !openPoper);
        setDeleteId(id);
    };
    useEffect(() => {
        if (loading) {
            fetchCompaniesData();
            fetchSectorsData();
            setLoading(false);
        }
        if (companiesData && sectorsData) {
            setDataLoaded(true);
        }
    }, [companiesData, sectorsData, loading]);
    const columnsSectors = [
        { field: "activity_sector", headerName: "Activity Sector", flex: 2 },
        {
            field: "description",
            headerName: "Desctiption",
            flex: 2,
            cellClassName: "name-column--cell",
        },
        {
            field: "delete",
            headerName: "Delete",
            flex: 1,
            renderCell: ({ row: { activity_sector } }) => {
                return (
                    <Box>
                        <Button
                            onClick={handleClick(activity_sector)}
                            color="error"
                            variant="contained"
                        >
                            <DeleteForeverIcon />
                        </Button>
                        <Popper
                            open={openPoper}
                            anchorEl={anchorEl}
                            placement="bottom-end"
                            transition
                        >
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={200}>
                                    <Box
                                        sx={{
                                            p: "5px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-around",
                                            flexDirection: "column",
                                            width: "350px",
                                            height: "170px",
                                            bgcolor: `${colors.white[500]}`,

                                            border: `1px solid ${colors.indigo[500]}`,
                                            borderRadius: "5px",
                                        }}
                                    >
                                        <Typography
                                            p="5px"
                                            width="90%"
                                            variant="h7"
                                            color={colors.black[500]}
                                        >
                                            Are you Sure you want to DELETE This
                                            Project Type? <br />
                                            All related companies will be
                                            Deleted.
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignSelf: "end",
                                                justifyContent: "space-between",
                                                flexDirection: "row",
                                            }}
                                        >
                                            <Button
                                                onClick={() =>
                                                    setOpenPoper(false)
                                                }
                                                color="primary"
                                                variant="contained"
                                                sx={{
                                                    p: "5px 10px",
                                                    m: "0 10px",
                                                }}
                                                endIcon={
                                                    <DoNotDisturbAltIcon />
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    deleteSectorData(deleteId);
                                                }}
                                                color="error"
                                                variant="contained"
                                                sx={{
                                                    p: "5px 10px",
                                                    mr: "10px",
                                                }}
                                                endIcon={<DeleteForeverIcon />}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </Box>
                                </Fade>
                            )}
                        </Popper>
                    </Box>
                );
            },
        },
    ];

    const columnsCompanies = [
        { field: "N_SIRET", headerName: "N SIRET", flex: 0.5 },
        {
            field: "commercial_name",
            headerName: "Commercial Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "legal_name",
            headerName: "Legal Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "address",
            headerName: "Adresse",
            flex: 1,
        },
        {
            field: "telephone_number",
            headerName: "Phone Number",
            flex: 1,
        },
        {
            field: "activity_sector",
            headerName: "Activity Sector",
            flex: 1,
        },
        {
            field: "Edit",
            headerName: "Edit",
            flex: 1,
            renderCell: ({ row: { N_SIRET } }) => {
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
                                navigate(`/admin/company/${N_SIRET}`);
                            }}
                        >
                            <SettingsSuggestIcon fontSize="30px" />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];
    const visibility_sector = {};
    const visibility_company = {};
    return (
        <Box minHeight="800px" height="100%">
            {dataLoaded ? (
                <Box display="flex" flexDirection="column" height="100%">
                    <Grid container spacing={3}>
                        <Grid item sx={12} md={4}>
                            <Header
                                icon={<HomeWorkIcon fontSize="inherit" />}
                                title="Sectors"
                                subtitle="List of The Sectors Handeled"
                            />
                        </Grid>
                        <Grid item sx={12} md={8}>
                            <Box
                                display="flex"
                                alignItems="flex-start"
                                width="80%"
                                ml="150px"
                            >
                                <Table
                                    fields={columnsSectors}
                                    data={sectorsData}
                                    idParam={(row) => row.activity_sector}
                                    height={"18rem"}
                                    visibility={visibility_sector}
                                    paginationModel={{ pageSize: 3, page: 0 }}
                                    pageSizeOptions={[3]}
                                />
                                <IconButton
                                    onClick={() => navigate("/admin/sector/")}
                                    sx={{
                                        marginLeft: "25px",
                                        fontSize: "55px",
                                        color: colors.indigo[500],
                                    }}
                                >
                                    <AddToPhotosIcon fontSize="55px" />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between "
                        m="30px 0"
                    >
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb="10px"
                            mt="5px"
                        >
                            <Header
                                icon={<ApartmentIcon fontSize="inherit" />}
                                title="Companies"
                                subtitle="List of the Companies in Database"
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
                                <AddToPhotosIcon fontSize="55px" />
                            </IconButton>
                        </Box>
                        <Table
                            fields={columnsCompanies}
                            visibility={visibility_company}
                            data={companiesData}
                            idParam={(row) => row.N_SIRET}
                            paginationModel={{ pageSize: 5, page: 0 }}
                            pageSizeOptions={[5, 10]}
                            components={{ Toolbar: GridToolbar }}
                        />
                    </Box>
                </Box>
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default Companies;
