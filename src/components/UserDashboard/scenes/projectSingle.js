import Header from "../global/header";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, useTheme, Button, Typography, IconButton } from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../../../theme";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useData } from "../../../contexts/DataContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderIcon from "@mui/icons-material/Folder";
import Loading from "../global/loading";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import { FileUpload } from "primereact/fileupload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NestedFileBrowser from "../global/filebrowser";
import LinearProgress from "@mui/material/LinearProgress";
import major from "../../../images/Major.jpg";

const UserProjectSingle = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let navigate = useNavigate();
    const {
        usersData,
        fetchUsersData,
        fetchSingleProjectData,
        updateProject,
        deleteProjectData,
        projectData,
        files,
        fetchFiles,
        checkForReport,
        checkReportData,
    } = useData();

    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState(false);
    const [openPoper, setOpenPoper] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { id } = useParams(); ////////////////////////
    const [fileform, setFileform] = useState({
        name: "",
        description: "",
        file_type: "",
        data_type: "",
        project: id,
        uploaded_files: [],
    });

    const isNonMobile = useMediaQuery("(min-width:700px)");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenPoper((openPoper) => !openPoper);
        console.log(openPoper);
    };
    useEffect(() => {
        if (id === undefined) {
            navigate("/");
        }
        if (loading) {
            fetchUsersData();
            fetchSingleProjectData(id);
            fetchFiles(id);
            checkForReport(id);
            setLoading(false);
        } else {
            if (projectData && usersData && files) {
                setFormValues(true);
            }
        }
    }, [projectData, loading, files]);
    const dateFormater = (date) =>
        new Date(date).toDateString() +
        " " +
        new Date(date).toLocaleTimeString();
    const projectSchema = yup.object().shape({
        name: yup.string().required("Field Required"),
        description: yup.string().required("Field Required"),
        hubspot_proj_id: yup.string().required("Field Required"),
        proj_type: yup.number().required("Field Required"),
        user: yup.number().required("Field Required"),
    });

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="800px"
            height="100%"
            mt="20px"
            sx={{ backgroundImage: major }}
        >
            {formValues ? (
                <>
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb="40px"
                        mt="5px"
                    >
                        <div style={{ textAlign: "center" }}>
                            <Header
                                icon={
                                    id === undefined ? (
                                        <CreateNewFolderIcon fontSize="inherit" />
                                    ) : (
                                        <FolderIcon fontSize="inherit" />
                                    )
                                }
                                title={`Project: ${projectData.name}`}
                            />
                        </div>

                        {id !== undefined && (
                            <Box>
                                <IconButton
                                    onClick={(event) => {
                                        handleClick(event);
                                    }}
                                    sx={{
                                        marginRight: "100px",
                                        fontSize: "55px",
                                        color: colors.indigo[500],
                                    }}
                                >
                                    <DeleteForeverIcon fontSize="55px" />
                                </IconButton>
                                <Popper
                                    open={openPoper}
                                    anchorEl={anchorEl}
                                    placement="bottom-end"
                                    transition
                                >
                                    {({ TransitionProps }) => (
                                        <Fade
                                            {...TransitionProps}
                                            timeout={200}
                                        >
                                            <Box
                                                sx={{
                                                    p: "5px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-around",
                                                    flexDirection: "column",
                                                    width: "350px",
                                                    height: "180px",
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
                                                    Are you Sure you want to
                                                    DELETE This Project ("
                                                    {projectData.name}")
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignSelf: "end",
                                                        justifyContent:
                                                            "space-between",
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
                                                            deleteProjectData(
                                                                id
                                                            );
                                                            navigate(
                                                                "/dashboard/projects"
                                                            );
                                                        }}
                                                        color="error"
                                                        variant="contained"
                                                        sx={{
                                                            p: "5px 10px",
                                                            mr: "10px",
                                                        }}
                                                        endIcon={
                                                            <DeleteForeverIcon />
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Fade>
                                    )}
                                </Popper>
                            </Box>
                        )}
                    </Box>

                    {id !== undefined && (
                        <Box>
                            {/* File section  */}

                            <Box>
                                <Box width="75%" m="30px auto 40px auto">
                                    <NestedFileBrowser
                                        title={"Files Uploaded :"}
                                        files={files}
                                        project={{
                                            id: projectData.id,
                                            name: projectData.name,
                                        }}
                                    />
                                </Box>
                                <Box width="80%" m="auto" position="relative">
                                    <Box
                                        width="100%"
                                        m="5px auto 20px auto"
                                        sx={{
                                            "& .p-fileupload-buttonbar": {
                                                background: colors.white["700"],
                                                borderColor: `${theme.palette
                                                    .mode === "dark" &&
                                                    colors.black["800"] +
                                                        " !important"} `,
                                            },
                                            "& .p-fileupload-buttonbar > .p-button": {
                                                background:
                                                    colors.indigo["500"],
                                            },
                                            "& .p-fileupload-content": {
                                                background: colors.white["500"],
                                                color: colors.black["500"],
                                                borderColor: `${theme.palette
                                                    .mode === "dark" &&
                                                    colors.black["800"] +
                                                        " !important"} `,
                                            },
                                            "& .p-fileupload": {
                                                border: "0px",
                                            },
                                            "& .p-fileupload-buttonbar>.p-disabled": {
                                                backgroundColor: `${theme
                                                    .palette.mode === "dark" &&
                                                    colors.white[
                                                        "400"
                                                    ]} !important`,
                                            },
                                        }}
                                    ></Box>
                                </Box>

                                <Box mt="50px">
                                    <Header
                                        // icon={
                                        // <AssessmentIcon fontSize="inherit" />
                                        // }
                                        title={"Report"}
                                        subtitle={"The Report for this project"}
                                    />
                                    {checkReportData ? (
                                        <Box
                                            ml="60px"
                                            mt="20px"
                                            mb="40px"
                                            display="flex"
                                            justifyContent="space-between"
                                            width="80%"
                                        >
                                            <Typography variant="h5">
                                                {checkReportData.name}
                                            </Typography>
                                            <Button
                                                sx={{ fontSize: "16px" }}
                                                variant="contained"
                                                onClick={() => {
                                                    navigate(
                                                        `/dashboard/report/${id}`
                                                    );
                                                }}
                                            >
                                                <VisibilityIcon marginRight="20px" />
                                                View
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Box
                                            ml="60px"
                                            mt="20px"
                                            mb="50px"
                                            display="flex"
                                            justifyContent="space-between"
                                            width="80%"
                                        >
                                            <Typography variant="h5">
                                                No report for this project
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    )}
                </>
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default UserProjectSingle;
