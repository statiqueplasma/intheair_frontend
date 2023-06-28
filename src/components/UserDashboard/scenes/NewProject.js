import Header from "../global/header";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {Form, Row, Col,} from "react-bootstrap";
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
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const NewProject = () => {
    const initialValues = {
        name: "",
        description: "",
        project: "",
    };
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let navigate = useNavigate();
    const { fetchReport, reportData, deleteReport } = useData();//

    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [openPoper, setOpenPoper] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [newReportData, setNewReportData] = useState();
    //const [newProjectData, setNewProjectData] = useState();//
    const { id } = useParams();
    //const {userData, fetchSingleUserData} = useData()

    const isNonMobile = useMediaQuery("(min-width:700px)");

    const handleFormSubmit = (values) => {
        if (id !== undefined) {
            if (values) {
            }
        } else {
            if (values) {
            }
        }
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenPoper((openPoper) => !openPoper);
        console.log(openPoper);
    };

    const DragEnd = (event) => {};
    const reportSchema = yup.object().shape({
        name: yup.string().required("Field Required"),
        description: yup.string().required("Field Required"),
    });

    useEffect(() => {
        if (loading) {
            if (id !== undefined) {
                fetchReport(id);
            }

            setLoading(false);
        }
        if (id === undefined) {
            setDataLoaded(true);
        } else {
            if (reportData) {
                setNewReportData(reportData);
                setDataLoaded(true);
            }
        }
    }, [loading]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="800px"
            height="100%"
            mt="20px"
        >
            {dataLoaded ? (
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
                                    : `Edit Report: ${newReportData.name}`
                            }
                            subtitle={
                                id === undefined
                                    ? "You can use this form to Add a New Project"
                                    : `You can Edit the Data for ${newReportData.name}`
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
                                                    DELETE This Report ("
                                                    {newReportData.name}")
                                                    <br />
                                                    All related data will be
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
                                                            deleteReport(id);
                                                            navigate(
                                                                `/admin/project/${id}`
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
                                {
                                        // name: newReportData.name,
                                        // description:newReportData.description,
                                        description: "",
                                        fichier_cdc: "",
                                        rendu_autocad: false,
                                        rendu_sketchup: false,
                                        rendu_qgis: false,
                                        rendu_autre: false,
                                        commentaires: "",    
                                      }
                                    
                            }
                            validationSchema={reportSchema}
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
                                                type="email"
                                                label="email@email.com"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name="email"
                                                error={
                                                    !!touched.email && !!errors.email
                                                }
                                                helperText={
                                                    touched.email && errors.email
                                                }
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="First Name"
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
                                                label="Last Name"
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
                                                label="Company"
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
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            

                                        
                                        <TextField
                                            fullWidth
                                            // variant="filled"
                                            type="file"
                                            // label="Description"
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
                                            sx={{
                                                gridColumn: "span 4",
                                                backgroundColor: theme.palette.mode === "light" ? "rgb(238, 238, 238)" : theme.palette.background.default,
                                                border: "none",
                                              }}
                                        />

                                        {/* //////////// */}
                                        
                                        <h4 style={{
                                            gridColumn: "span 4",
                                            color: theme.palette.mode === "light" ? "grey" : theme.palette.text.primary,
                                            // "&:hover": {
                                            //     backgroundColor: theme.palette.mode === "light" ? colors.turquoise[500] : colors.indigo[200],
                                            // },
                                            }}
                                        >
                                            Rendu Désiré:
                                        </h4>

                                        <Form.Group>
                                            <Form.Check
                                                label={`Autocad`}
                                                name="rendu_autocad"
                                                value={values.rendu_autocad}
                                                onChange={handleChange}
                                                isValid={
                                                    touched.rendu_autocad &&
                                                    !errors.rendu_autocad
                                                }
                                                isInvalid={!!errors.rendu_autocad}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.rendu_autocad}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Check
                                                label={`Sketchup`}
                                                name="rendu_sketchup"
                                                value={values.rendu_sketchup}
                                                onChange={handleChange}
                                                isValid={
                                                    touched.rendu_sketchup &&
                                                    !errors.rendu_sketchup
                                                }
                                                isInvalid={!!errors.rendu_sketchup}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.rendu_sketchup}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Check
                                                label={`Qgis`}
                                                name="rendu_qgis"
                                                value={values.rendu_qgis}
                                                onChange={handleChange}
                                                isValid={
                                                    touched.rendu_qgis &&
                                                    !errors.rendu_qgis
                                                }
                                                isInvalid={!!errors.rendu_qgis}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.rendu_qgis}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Check
                                                label={"Autre"}
                                                name="rendu_autre"
                                                value={values.rendu_autre}
                                                onChange={handleChange}
                                                isValid={
                                                    touched.rendu_autre &&
                                                    !errors.rendu_autre
                                                }
                                                isInvalid={!!errors.rendu_autre}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.rendu_autre}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        
                                        {/* //////////// */}


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
                                    </Box>
                                </form>
                            )}
                        </Formik>

                        

                        {id !== undefined ? (
                            <>
                                <Box
                                    display="flex"
                                    justifyContent="end"
                                    p="20px"
                                    mt="20px"
                                >
                                    <Button
                                        onClick={() => {
                                            setDataLoaded(false);
                                            navigate("/admin/project/");
                                            window.location.reload();
                                        }}
                                        color={
                                            theme.palette.mode === "light"
                                                ? "primary"
                                                : "error"
                                        }
                                        variant="contained"
                                        sx={{
                                            p: "10px 10px",
                                            m: "0 10px",
                                        }}
                                        endIcon={<DoNotDisturbAltIcon />}
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
                                    startIcon={<CreateNewFolderIcon />}
                                >
                                    Add project
                                </Button>
                            </Box>
                        )}
                    </Box>
                </>
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default NewProject;
