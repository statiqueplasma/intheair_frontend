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
import FolderIcon from "@mui/icons-material/Folder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Projects = () => {
    const isNonMobile = useMediaQuery("(min-width:700px)");
    let navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {
        projectsData,
        projecttypesData,
        fetchProjectsData,
        fetchProjecttypesData,
        deleteProjecttypeData,
        datatypes,
        fileext,
        filetypes,
        fetchFileTypes,
        fetchDataTypes,
        fetchFileExt,
        deleteDataType,
        deleteFileType,
        deleteFileExt,
    } = useData();
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [fileextSTR, setFileextSTR] = useState([]);
    const [projecttype, setProjecttype] = useState([]);
    const [openPoper, setOpenPoper] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPoperProjType, setOpenPoperProjType] = useState(false);
    const [deleteIdProjType, setDeleteIdProjType] = useState();
    const [anchorElProjType, setAnchorElProjType] = useState(null);
    const [openPoperData, setOpenPoperData] = useState(false);
    const [deleteIdData, setDeleteIdData] = useState();
    const [anchorElData, setAnchorElData] = useState(null);
    const [openPoperFile, setOpenPoperFile] = useState(false);
    const [deleteIdFile, setDeleteIdFile] = useState();
    const [anchorElFile, setAnchorElFile] = useState(null);
    const [openPoperExt, setOpenPoperExt] = useState(false);
    const [deleteIdExt, setDeleteIdExt] = useState();
    const [anchorElExt, setAnchorElExt] = useState(null);
    const iconStyle =
        theme.palette.mode === "light" ? colors.white[500] : colors.black[200];

    const handleClick = (id) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpenPoper((openPoper) => !openPoper);
        setDeleteId(id);
    };
    const handleClickProjType = (id) => (event) => {
        setAnchorElProjType(event.currentTarget);
        setOpenPoperProjType((openPoper) => !openPoper);
        setDeleteIdProjType(id);
    };
    const handleClickData = (id) => (event) => {
        setAnchorElData(event.currentTarget);
        setOpenPoperData((openPoper) => !openPoper);
        setDeleteIdData(id);
    };
    const handleClickFile = (id) => (event) => {
        setAnchorElFile(event.currentTarget);
        setOpenPoperFile((openPoper) => !openPoper);
        setDeleteIdFile(id);
    };
    const handleClickExt = (id) => (event) => {
        setAnchorElExt(event.currentTarget);
        setOpenPoperExt((openPoper) => !openPoper);
        setDeleteIdExt(id);
    };
    useEffect(() => {
        if (loading) {
            fetchProjectsData();
            fetchProjecttypesData();
            fetchFileTypes();
            fetchDataTypes();
            fetchFileExt();
            setLoading(false);
        }
        if (
            projectsData &&
            projecttypesData &&
            filetypes &&
            datatypes &&
            fileext
        ) {
            if (filetypes.length > 1 && fileext.length > 1 && !loading) {
                let arr = [];
                for (let i = 0; i < fileext.length; i++) {
                    for (let j = 0; j < filetypes.length; j++) {
                        if (fileext[i]["file_type"] === filetypes[j]["id"]) {
                            arr.push({
                                ...fileext[i],
                                label: filetypes[j].label,
                            });
                        }
                    }
                }
                setFileextSTR(arr);
            }
            setDataLoaded(true);
            setProjecttype(projecttypesData);
        }
    }, [
        projectsData,
        filetypes,
        datatypes,
        fileext,
        projecttypesData,
        loading,
    ]);
    const columnsProjecttypes = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "label",
            headerName: "Type Label",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "delete",
            headerName: "Delete",
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <Box>
                        <Button
                            onClick={handleClickProjType(id)}
                            color="error"
                            variant="contained"
                        >
                            <DeleteForeverIcon />
                        </Button>
                        <Popper
                            open={openPoperProjType}
                            anchorEl={anchorElProjType}
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
                                            All related projects will be
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
                                                    setOpenPoperProjType(false)
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
                                                    setOpenPoperProjType(false);
                                                    deleteProjecttypeData(
                                                        deleteIdProjType
                                                    );
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
    const columnsFiletypes = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "label",
            headerName: "Type Label",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "delete",
            headerName: "Delete",
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <Box>
                        <Button
                            onClick={handleClickFile(id)}
                            color="error"
                            variant="contained"
                        >
                            <DeleteForeverIcon />
                        </Button>
                        <Popper
                            open={openPoperFile}
                            anchorEl={anchorElFile}
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
                                            File Type? <br />
                                            All related files will be Deleted.
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
                                                    setOpenPoperFile(false)
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
                                                    deleteFileType(
                                                        deleteIdFile
                                                    );
                                                    setOpenPoperFile(false);
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
    const columnsDatatypes = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "label",
            headerName: "Type Label",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "delete",
            headerName: "Delete",
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <Box>
                        <Button
                            onClick={handleClickData(id)}
                            color="error"
                            variant="contained"
                        >
                            <DeleteForeverIcon />
                        </Button>
                        <Popper
                            open={openPoperData}
                            anchorEl={anchorElData}
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
                                            Data Type? <br />
                                            All related Data will be Deleted.
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
                                                    setOpenPoperData(false)
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
                                                    setOpenPoperData(false);
                                                    deleteDataType(
                                                        deleteIdData
                                                    );
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
    const columnsFileExt = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "extention",
            headerName: "Extention",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "label",
            headerName: "File Type",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "delete",
            headerName: "Delete",
            flex: 1,
            renderCell: ({ row: { id } }) => {
                return (
                    <Box>
                        <Button
                            onClick={handleClickExt(id)}
                            color="error"
                            variant="contained"
                        >
                            <DeleteForeverIcon />
                        </Button>
                        <Popper
                            open={openPoperExt}
                            anchorEl={anchorElExt}
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
                                            File Extention? <br />
                                            All related Files will be Deleted.
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
                                                    setOpenPoperExt(false)
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
                                                    deleteFileExt(deleteIdExt);
                                                    setOpenPoperExt(false);
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
    const columnsProjects = [
        { field: "id", headerName: "ID", flex: 0.5 },
        {
            field: "name",
            headerName: "Project Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "description",
            headerName: "Project Description",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "hubspot_proj_id",
            headerName: "Project Hubspot ID",
            flex: 1,
        },
        {
            field: "last_edit",
            headerName: "Last Edit",
            flex: 1,
        },
        {
            field: "project_type_label",
            headerName: "Project Type",
            flex: 1,
        },
        {
            field: "user_username",
            headerName: "Users Linked",
            flex: 1,
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
                                navigate(`/admin/project/${id}`);
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
        last_edit_date: false,
    };

    return (
        <Box minHeight="800px" height="100%">
            {dataLoaded ? (
                <Box display="flex" flexDirection="column" height="100%">
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
                                icon={<FolderIcon fontSize="inherit" />}
                                title="Projects"
                                subtitle="List of the Projects in Database"
                            />
                            <IconButton
                                onClick={() => navigate("/admin/project/")}
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
                            fields={columnsProjects}
                            visibility={visibility}
                            data={projectsData}
                            idParam={(row) => row.id}
                            paginationModel={{ pageSize: 5, page: 0 }}
                            pageSizeOptions={[5, 10]}
                            components={{ Toolbar: GridToolbar }}
                        />
                    </Box>
                    <Box>
                        <Header
                            icon={<BookmarkIcon fontSize="inherit" />}
                            title="Types"
                            subtitle="List of the Diffeent Types Handeled"
                        />
                        <Grid container spacing={1} marginTop="25px">
                            <Grid item sx={12} md={6}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    width="80%"
                                    ml="100px"
                                >
                                    <Typography variant="h6">
                                        Project Types :
                                    </Typography>
                                    <Table
                                        fields={columnsProjecttypes}
                                        data={projecttype}
                                        height="390px"
                                        idParam={(row) => row.id}
                                        paginationModel={{
                                            pageSize: 5,
                                            page: 0,
                                        }}
                                        pageSizeOptions={[5]}
                                        checkbox={false}
                                    />
                                </Box>
                            </Grid>
                            <Grid item sx={12} md={6}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    width="80%"
                                    ml="50px"
                                >
                                    <Typography variant="h6">
                                        Data Types :
                                    </Typography>
                                    <Table
                                        fields={columnsDatatypes}
                                        data={datatypes}
                                        height="390px"
                                        idParam={(row) => row.id}
                                        paginationModel={{
                                            pageSize: 5,
                                            page: 0,
                                        }}
                                        pageSizeOptions={[5]}
                                        checkbox={false}
                                    />
                                </Box>
                            </Grid>
                            <Grid item sx={12} md={6}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    width="80%"
                                    ml="100px"
                                    mt="20px"
                                >
                                    <Typography variant="h6">
                                        File Types :
                                    </Typography>
                                    <Table
                                        fields={columnsFiletypes}
                                        data={filetypes}
                                        height="390px"
                                        idParam={(row) => row.id}
                                        paginationModel={{
                                            pageSize: 5,
                                            page: 0,
                                        }}
                                        pageSizeOptions={[5]}
                                        checkbox={false}
                                    />
                                </Box>
                            </Grid>
                            <Grid item sx={12} md={6}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    width="80%"
                                    ml="50px"
                                    mt="20px"
                                >
                                    <Typography variant="h6">
                                        File Extentions :
                                    </Typography>
                                    <Table
                                        fields={columnsFileExt}
                                        data={fileextSTR}
                                        height="390px"
                                        idParam={(row) => row.id}
                                        paginationModel={{
                                            pageSize: 5,
                                            page: 0,
                                        }}
                                        pageSizeOptions={[5]}
                                        checkbox={false}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default Projects;
