import Header from "../global/header";
import { useState, useEffect, createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import LinearProgress from "@mui/material/LinearProgress";
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
import Section from "../global/section";
import DropSection from "../global/dropSection";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SectionsTest } from "../test";
import ArticleIcon from "@mui/icons-material/Article";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { useAuth } from "../../../contexts/AuthContext";
import { FileUpload } from "primereact/fileupload";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
export const SectionContext = createContext();
const ReportPage = () => {
    const initialValues = {
        name: "",
        description: "",
        project: "",
        date: "",
        site: "",
        adresse: "",
    };
    const theme = useTheme();
    const { authTokens } = useAuth();
    const colors = tokens(theme.palette.mode);
    let navigate = useNavigate();
    const {
        fetchReport,
        reportData,
        deleteReport,
        fetchSections,
        reportSectionsData,
        datatypes,
        fetchDataTypes,
        createSection,
        sectionData,
        files,
        fetchFiles,
        updateReport,
        uploadLogos,
        deleteLogo,
        filesUploaded,
    } = useData();
    const [sections, setSections] = useState([]);
    const [orderedSections, setOrderedSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [openPoper, setOpenPoper] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [newReportData, setNewReportData] = useState();
    const [reportName, setReportName] = useState();
    const [reportDescription, setReportDescription] = useState();
    const [reportSite, setReportSite] = useState();
    const [reportAdresse, setReportAdresse] = useState();
    const [reportLogos, setReportLogos] = useState();
    const [reportDate, setReportDate] = useState();
    const [isEditing, setEditing] = useState(false);
    const { id } = useParams();

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
    };

    const reportSchema = yup.object().shape({
        name: yup.string().required("Field Required"),
        description: yup.string().required("Field Required"),
        site: yup.string().required("Field Required"),
        adresse: yup.string().required("Field Required"),
        date: yup.date().required("Field Required"),
    });

    let uploadlogo = (event) => {
        uploadLogos({ report: newReportData.id, uploaded_logos: event.files });
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
    const putInChildren = (object, arr) => {
        let array = arr;

        let found = false;
        for (let o = 0; o < array.length; o++) {
            if (array[o].id === object.parent) {
                for (let i = 0; i < array[o].children.length; i++) {
                    if (array[o].children[i] === object.id) {
                        array[o].children[i] = object;
                        found = true;
                        array[o].children.sort(function(a, b) {
                            return a.order - b.order;
                        });
                        return [array, found];
                    } else if (array[o].children[i].id === object.id) {
                        found = true;
                        array[o].children.sort(function(a, b) {
                            if (a.order && b.order) {
                                return a.order - b.order;
                            } else return 0;
                        });
                        return [array, found];
                    }
                }
            } else {
                if (array[o].children && array[o].children.length) {
                    let [newarr, childfound] = putInChildren(
                        object,
                        array[o].children
                    );
                    array[o].children = newarr;
                    found = childfound;
                    if (found) {
                        array[o].children.sort(function(a, b) {
                            if (a.order && b.order) {
                                return a.order - b.order;
                            } else return 0;
                        });
                    }
                }
            }
        }
        return [array, found];
    };
    function orderSections(array) {
        let arr = array;
        let obj = [];
        let waiting = [];
        let found = false;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].parent === null) {
                obj.unshift(arr[i]);
            } else {
                [obj, found] = putInChildren(arr[i], obj);
                if (found) {
                    found = false;
                } else {
                    obj.push(arr[i]);
                    waiting.push(arr[i]);
                }
            }
        }
        if (waiting.length > 0) {
            for (let o = 0; o < obj.length; o++) {
                obj = orderSections(obj);
                for (let w = 0; w < waiting.length; w++) {
                    if (obj[o].id === waiting[w].id) {
                        waiting.splice(w, 1);
                    }
                }
            }
            obj.sort(function(a, b) {
                if (a.order && b.order) {
                    return a.order - b.order;
                } else return 0;
            });
            return obj;
        } else {
            obj.sort(function(a, b) {
                if (a.order && b.order) {
                    return a.order - b.order;
                } else return 0;
            });
            return obj;
        }
    }
    const changePosition = (originID, targetID, position) => {
        let newArr = [];
        newArr = sections;
        let originSection = {};
        let targetSection = {};
        let originIndex = 0;
        let targetIndex = 0;
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].id === originID) {
                originSection = newArr[i];
                originIndex = i;
            } else if (newArr[i].id === targetID) {
                targetSection = newArr[i];
                targetIndex = i;
            }
        }
        console.log(originIndex, targetIndex);
        if (position === "above") {
            let parentBuff = newArr[targetIndex].parent;
            let orderBuff = newArr[targetIndex].order;
            for (let i = 0; i < newArr.length; i++) {
                if (
                    newArr[i].parent === targetSection.parent &&
                    newArr[i].order >= targetSection.order
                ) {
                    newArr[i].order++;
                }
                if (
                    newArr[i].parent === originSection.parent &&
                    newArr[i].order > originSection.order
                ) {
                    newArr[i].order--;
                }
                if (newArr[i].id === parentBuff) {
                    newArr[i].children.push(originID);
                }
                if (newArr[i].id === originSection.parent) {
                    let rm_index = newArr[i].children.indexOf(originID);
                    newArr[i].children.splice(rm_index, 1);
                }
            }
            newArr[originIndex].parent = parentBuff;
            newArr[originIndex].order = orderBuff;
        } else if (position === "child") {
            let parentBuff = newArr[targetIndex].id;
            for (let i = 0; i < newArr.length; i++) {
                if (newArr[i].parent === newArr[targetIndex].id) {
                    newArr[i].order++;
                }
                if (newArr[i].parent !== null) {
                    if (
                        newArr[i].parent === originSection.parent &&
                        newArr[i].order > originSection.order
                    ) {
                        newArr[i].order--;
                    }
                }
                if (newArr[i].id === parentBuff) {
                    newArr[i].children.push(originID);
                }
                if (newArr[i].id === originSection.parent) {
                    let rm_index = newArr[i].children.indexOf(originID);
                    newArr[i].children.splice(rm_index, 1);
                }
            }
            newArr[originIndex].parent = parentBuff;
            newArr[originIndex].order = 1;
        }
        console.log("new arr = ", newArr);
        setSections(newArr);
        var buff = JSON.parse(JSON.stringify(sections));
        setOrderedSections(orderSections(buff));
        console.log("new sorted arr = ", orderedSections);
    };
    const updateAll = async () => {
        for (let i = 0; i < sections.length; i++) {
            const element = sections[i];
            let response = await fetch(`/api/section/${element.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${authTokens.access}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    report: newReportData.id,
                    title: element.title,
                    content: element.content,
                    graph: element.graph ? element.graph.id : element.graph,
                    order: element.order,
                    parent: element.parent,
                }),
            });

            var success = response.ok;
            response.json().then((res) => {
                if (success) {
                }
            });
        }
        updateReport(newReportData.id, {
            project: id,
            name: reportName,
            description: reportDescription,
            site: reportSite,
            adresse: reportAdresse,
            date: reportDate,
        });
    };
    useEffect(() => {
        if (loading) {
            if (id !== undefined) {
                fetchReport(id);

                fetchFiles(id);
            }
            fetchDataTypes();
            setLoading(false);
        }
        if (id === undefined) {
            setDataLoaded(true);
        } else {
            if (reportData && !newReportData) {
                setNewReportData(reportData[0]);
                setReportName(reportData[0].name);
                setReportDescription(reportData[0].description);
                setReportAdresse(reportData[0].adresse);
                setReportSite(reportData[0].site);
                setReportDate(reportData[0].date);
                setReportLogos(reportData[0].logos);
                fetchSections(reportData[0].id);
            }
            if (reportSectionsData && files) {
                setSections(reportSectionsData);
                var buff = JSON.parse(JSON.stringify(reportSectionsData));
                setOrderedSections(orderSections(buff));
                setDataLoaded(true);
            }
        }
    }, [loading, reportSectionsData, reportData, datatypes, files]);

    let DataContext = {
        changePosition: changePosition,
        isEditing: isEditing,
        setEditing: setEditing,
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="800px"
            height="100%"
            mt="20px"
        >
            {!filesUploaded && (
                <Box mt="40px" mb="20px">
                    <Typography
                        variant="h4"
                        fontStyle="oblique"
                        align="center"
                        color="primary"
                        mb="25px"
                    >
                        Uploading Your Data...
                    </Typography>
                    <Box sx={{ width: "80%", m: "auto" }}>
                        <LinearProgress />
                    </Box>
                </Box>
            )}
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
                                    ? "Add a Report"
                                    : `Edit Report: ${newReportData.name}`
                            }
                            subtitle={
                                id === undefined
                                    ? "You can use this form to Add a New Report to the Project Selected"
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
                                id !== undefined
                                    ? {
                                          name: newReportData.name,
                                          description:
                                              newReportData.description,
                                          site: newReportData.site,
                                          date: newReportData.date,
                                          adresse: newReportData.adresse,
                                      }
                                    : initialValues
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
                                            type="text"
                                            label="Title"
                                            onBlur={handleBlur}
                                            onChange={(event) => {
                                                handleChange(event);
                                                setReportName(
                                                    event.target.value
                                                );
                                            }}
                                            value={reportName}
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
                                            variant="filled"
                                            type="text"
                                            label="Description"
                                            onBlur={handleBlur}
                                            onChange={(event) => {
                                                handleChange(event);
                                                setReportDescription(
                                                    event.target.value
                                                );
                                            }}
                                            value={reportDescription}
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
                                            type="text"
                                            label="Site"
                                            onBlur={handleBlur}
                                            onChange={(event) => {
                                                handleChange(event);
                                                setReportSite(
                                                    event.target.value
                                                );
                                            }}
                                            value={reportSite}
                                            name="site"
                                            error={
                                                !!touched.site && !!errors.site
                                            }
                                            helperText={
                                                touched.site && errors.site
                                            }
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Adresse"
                                            onBlur={handleBlur}
                                            onChange={(event) => {
                                                handleChange(event);
                                                setReportAdresse(
                                                    event.target.value
                                                );
                                            }}
                                            value={reportAdresse}
                                            name="adresse"
                                            error={
                                                !!touched.adresse &&
                                                !!errors.adresse
                                            }
                                            helperText={
                                                touched.adresse &&
                                                errors.adresse
                                            }
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="date"
                                            label="Date"
                                            onBlur={handleBlur}
                                            onChange={(event) => {
                                                handleChange(event);
                                                setReportDate(
                                                    event.target.value
                                                );
                                            }}
                                            value={reportDate}
                                            name="date"
                                            error={
                                                !!touched.date && !!errors.date
                                            }
                                            helperText={
                                                touched.date && errors.date
                                            }
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </Box>
                    <Box width="80%" m="auto">
                        <Typography variant="h5">Logos</Typography>
                        {reportLogos.length === 0 ? (
                            <Typography ml="auto" mr="auto" mt="10px" mb="10px">
                                No Logo
                            </Typography>
                        ) : (
                            <Stack
                                marginBottom="15px"
                                marginTop="15px"
                                direction="row"
                                spacing={1}
                            >
                                {reportLogos.map((logo) => {
                                    return (
                                        <Chip
                                            label={
                                                logo.logo
                                                    .split("/")
                                                    .pop()
                                                    .substring(0, 10) + "..."
                                            }
                                            variant="outlined"
                                            onDelete={() => {
                                                setReportLogos(
                                                    reportLogos.filter(function(
                                                        arrlogo
                                                    ) {
                                                        return (
                                                            arrlogo.id !==
                                                            logo.id
                                                        );
                                                    })
                                                );
                                                deleteLogo(logo.id);
                                            }}
                                        />
                                    );
                                })}
                            </Stack>
                        )}
                        <Box
                            sx={{
                                "& .p-fileupload-buttonbar": {
                                    background: colors.white["700"],
                                    borderColor: `${theme.palette.mode ===
                                        "dark" &&
                                        colors.black["800"] + " !important"} `,
                                },
                                "& .p-fileupload-buttonbar > .p-button": {
                                    background: colors.indigo["500"],
                                },
                                "& .p-fileupload-content": {
                                    background: colors.white["500"],
                                    color: colors.black["500"],
                                    borderColor: `${theme.palette.mode ===
                                        "dark" &&
                                        colors.black["800"] + " !important"} `,
                                },
                                "& .p-fileupload": {
                                    border: "0px",
                                },
                                "& .p-fileupload-buttonbar>.p-disabled": {
                                    backgroundColor: `${theme.palette.mode ===
                                        "dark" &&
                                        colors.white["400"]} !important`,
                                },
                            }}
                        >
                            <FileUpload
                                name="logo"
                                url={""}
                                multiple
                                accept="image/*"
                                customUpload
                                uploadHandler={uploadlogo}
                                emptyTemplate={
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: colors.black["500"],
                                        }}
                                    >
                                        <Box fontSize="100px">
                                            <AddPhotoAlternateIcon fontSize="200px" />
                                        </Box>
                                        <p
                                            style={{
                                                fontSize: "15px",
                                            }}
                                        >
                                            Choose Images or drag them here to
                                            upload them
                                        </p>
                                    </Box>
                                }
                            />
                            {!filesUploaded && (
                                <Box
                                    sx={{
                                        zIndex: "2000",
                                        width: "100%",
                                        margin: "auto",
                                        height: "95%",
                                        display: "block",
                                        position: "absolute",
                                        backgroundColor: `${
                                            theme.palette.mode === "light"
                                                ? colors.black["300"] + 40
                                                : colors.white["200"] + 40
                                        }`,
                                        top: "70px",
                                        left: "0px",
                                    }}
                                >
                                    <Box mt="200px">
                                        <Typography
                                            variant="h4"
                                            fontStyle="oblique"
                                            align="center"
                                            color="primary"
                                            mb="25px"
                                        >
                                            Uploading Your Data...
                                        </Typography>
                                        <Box
                                            sx={{
                                                width: "80%",
                                                m: "auto",
                                            }}
                                        >
                                            <LinearProgress />
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Box m=" 20px auto" width="100%">
                        <Box
                            width="100%"
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                        >
                            <Header
                                title={"Report Sections"}
                                subtitle={
                                    "Drag and drop to change the order, Or click on edit to edit the sections"
                                }
                                icon={<ArticleIcon />}
                            />
                            <IconButton
                                onClick={() => {
                                    createSection({
                                        report: newReportData.id,
                                        title: "new section",
                                        order: 1,
                                        content: null,
                                        parent: null,
                                        graph: null,
                                    });
                                    window.location.reload();
                                }}
                                sx={{
                                    marginRight: "70px",
                                    height: "100px",
                                    width: "100px",
                                    fontSize: "55px",
                                    color: colors.indigo[500],
                                }}
                            >
                                <AddToPhotosIcon fontSize="55px" />
                            </IconButton>
                        </Box>
                        <SectionContext.Provider value={DataContext}>
                            <Box
                                width="90%"
                                p="20px"
                                border="1px solid gray"
                                borderRadius="5px"
                                m="40px auto"
                                height={`${sections.length * 100}px`}
                            >
                                <DndProvider backend={HTML5Backend}>
                                    {orderedSections.map((section) => {
                                        console.log(orderedSections);
                                        return (
                                            <Section
                                                key={section.id}
                                                id={section.id}
                                                project={id}
                                                title={section.title}
                                                content={section.content}
                                                graph={section.graph}
                                                children={section.children}
                                                files={files}
                                                report={newReportData.id}
                                                dataTypes={datatypes}
                                            />
                                        );
                                    })}
                                </DndProvider>
                            </Box>
                        </SectionContext.Provider>
                    </Box>
                    <Box width="80%" m="auto">
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
                                        onClick={() => {
                                            updateAll();
                                        }}
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
                            ></Box>
                        )}
                    </Box>
                </>
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default ReportPage;
