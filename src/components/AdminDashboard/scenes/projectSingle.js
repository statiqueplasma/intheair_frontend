import Header from "../global/header";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    useTheme,
    TextField,
    Button,
    Typography,
    IconButton,
    MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../../../theme";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useData } from "../../../contexts/DataContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderIcon from "@mui/icons-material/Folder";
import Loading from "../global/loading";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
const ProjectSingle = () => {
    const initialValues = {
        name: "",
        description: "",
        hubspot_proj_id: "",
        proj_type: "",
        user: "",
    };
    const theme = useTheme();
    let navigate = useNavigate();
    const {
        usersData,
        fetchUsersData,
        projecttypesData,
        fetchProjecttypesData,
        fetchSingleProjectData,
        updateProject,
        projectData,
        deleteProjectData,
        createProject,
    } = useData();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState(false);
    const [openPoper, setOpenPoper] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { id } = useParams();
    const isNonMobile = useMediaQuery("(min-width:700px)");
    const handleFormSubmit = (values) => {
        if (id !== undefined) {
            if (values) {
                updateProject({ values, id });
                console.log(values);
            }
        } else {
            if (values) {
                createProject(values);
            }
        }
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenPoper((openPoper) => !openPoper);
        console.log(openPoper);
    };
    const dateStyle = {
        title:
            theme.palette.mode === "light"
                ? colors.black[400]
                : colors.turquoise[600],
        date:
            theme.palette.mode === "light"
                ? colors.turquoise[600]
                : colors.black[400],
    };
    useEffect(() => {
        if (loading) {
            if (id !== undefined) {
                fetchSingleProjectData(id);
            }
            fetchProjecttypesData();
            fetchUsersData();
            setLoading(false);
        }
        if (id === undefined) {
            if (projecttypesData && usersData) {
                setFormValues(true);
            }
        } else {
            if (projectData && projecttypesData && usersData) {
                setFormValues(true);
            }
        }
    }, [projectData, projecttypesData, loading]);
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
                        <Header
                            icon={
                                id === undefined ? (
                                    <CreateNewFolderIcon fontSize="inherit" />
                                ) : (
                                    <FolderIcon fontSize="inherit" />
                                )
                            }
                            title={
                                id === undefined
                                    ? "Add a Project"
                                    : `Project: ${projectData.name}`
                            }
                            subtitle={
                                id === undefined
                                    ? "You can use this form to Add a New Project to the Database"
                                    : `You can Edit the Data for ${projectData.name}`
                            }
                        />

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
                                                    DELETE This User ("
                                                    {projectData.name}")
                                                    <br />
                                                    All related projects will be
                                                    Deleted.
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
                                                                "/admin/projects"
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
                    <Box p="0 50px" m=" 15px auto" width="80%">
                        <Formik
                            onSubmit={handleFormSubmit}
                            initialValues={
                                id !== undefined
                                    ? {
                                          name: projectData.name,
                                          description: projectData.description,
                                          hubspot_proj_id:
                                              projectData.hubspot_proj_id,
                                          proj_type: projectData.proj_type,
                                          user: projectData.user,
                                      }
                                    : initialValues
                            }
                            validationSchema={projectSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box
                                        display="grid"
                                        gap="30px"
                                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                        sx={{
                                            "& > div": {
                                                gridColumn: isNonMobile
                                                    ? undefined
                                                    : "span 4",
                                            },
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name}
                                            name="name"
                                            error={
                                                !!touched.name && !!errors.name
                                            }
                                            helperText={
                                                touched.name && errors.name
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Hubspot Project Id"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.hubspot_proj_id}
                                            name="hubspot_proj_id"
                                            error={
                                                !!touched.hubspot_proj_id &&
                                                !!errors.hubspot_proj_id
                                            }
                                            helperText={
                                                touched.hubspot_proj_id &&
                                                errors.hubspot_proj_id
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Description"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.description}
                                            name="description"
                                            error={
                                                !!touched.description &&
                                                !!errors.description
                                            }
                                            helperText={
                                                touched.description &&
                                                errors.description
                                            }
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            select
                                            label="Project Type"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.proj_type}
                                            name="proj_type"
                                            error={
                                                !!touched.proj_type &&
                                                !!errors.proj_type
                                            }
                                            helperText={
                                                touched.proj_type &&
                                                errors.proj_type
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        >
                                            {projecttypesData.map(
                                                (option, index) => (
                                                    <MenuItem
                                                        key={option.id}
                                                        value={option.id}
                                                    >
                                                        {option.label}
                                                    </MenuItem>
                                                )
                                            )}
                                        </TextField>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            select
                                            label="User Linked"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.user}
                                            name="user"
                                            error={
                                                !!touched.user && !!errors.user
                                            }
                                            helperText={
                                                touched.user && errors.user
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        >
                                            {usersData.map((option) => (
                                                <MenuItem
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.username}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
                                    {id !== undefined ? (
                                        <>
                                            <Box
                                                p="10px 10px"
                                                mt="20px"
                                                display="flex"
                                                flexDirection="row"
                                                flex="right"
                                                justifyContent="space-between"
                                                alignItems="start"
                                            >
                                                <Box display="flex">
                                                    <Typography
                                                        p="5px"
                                                        variant="h7"
                                                        fontWeight="bold"
                                                        color={dateStyle.title}
                                                    >
                                                        Last Edit:
                                                    </Typography>
                                                    <Typography
                                                        p="5px"
                                                        variant="h8"
                                                        color={dateStyle.date}
                                                    >
                                                        {dateFormater(
                                                            projectData.last_edit
                                                        )}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box
                                                display="flex"
                                                justifyContent="end"
                                                p="20px"
                                                mt="20px"
                                            >
                                                <Button
                                                    onClick={() => {
                                                        setFormValues(false);
                                                        navigate(
                                                            "/admin/project/"
                                                        );
                                                        window.location.reload();
                                                    }}
                                                    color={
                                                        theme.palette.mode ===
                                                        "light"
                                                            ? "primary"
                                                            : "error"
                                                    }
                                                    variant="contained"
                                                    sx={{
                                                        p: "10px 10px",
                                                        m: "0 10px",
                                                    }}
                                                    endIcon={
                                                        <DoNotDisturbAltIcon />
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    color="secondary"
                                                    variant="contained"
                                                    sx={{ p: "10px 20px" }}
                                                    endIcon={<SaveIcon />}
                                                >
                                                    Save
                                                </Button>
                                            </Box>
                                        </>
                                    ) : (
                                        <Box
                                            display="flex"
                                            justifyContent="end"
                                            p="20px"
                                            mt="20px"
                                        >
                                            <Button
                                                type="submit"
                                                color="primary"
                                                variant="contained"
                                                sx={{ p: "10px 20px" }}
                                                startIcon={
                                                    <CreateNewFolderIcon />
                                                }
                                            >
                                                Add project
                                            </Button>
                                        </Box>
                                    )}
                                </form>
                            )}
                        </Formik>
                    </Box>
                </>
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default ProjectSingle;
