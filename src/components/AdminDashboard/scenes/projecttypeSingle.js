import Header from "../global/header";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    useTheme,
    TextField,
    Button,
    Typography,
    MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../../../theme";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useData } from "../../../contexts/DataContext";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DatasetLinkedIcon from "@mui/icons-material/DatasetLinked";
import Loading from "../global/loading";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { FileUpload } from "primereact/fileupload";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertPageBreakIcon from "@mui/icons-material/InsertPageBreak";
import LinearProgress from "@mui/material/LinearProgress";
const ProjecttypeSingle = () => {
    const initialValues = {
        label: "",
    };
    const initialValuesData = {
        label: "",
        description: "",
    };
    const initialValuesFile = {
        label: "",
        description: "",
    };
    const initialValuesExt = {
        extention: "",
        file_type: "",
    };

    const theme = useTheme();
    let navigate = useNavigate();
    const {
        createProjecttype,
        filetypes,
        fetchFileTypes,
        createFiletype,
        createDatatype,
        createFileExt,
        filesUploaded,
        setResponseStat,
    } = useData();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [dataform, setDataform] = useState({
        label: "",
        description: "",
        uploaded_files: [],
    });
    const isNonMobile = useMediaQuery("(min-width:700px)");
    let addData = (event) => {
        if (
            dataform.label !== "" &&
            dataform.description !== "" &&
            event.files.length > 0
        ) {
            let pass = false;
            for (let i = 0; i < event.files.length; i++) {
                if (
                    event.files[i].name.split(".")[1] === "shp" ||
                    event.files[i].name.split(".")[1] === "xlsx"
                ) {
                    pass = true;
                }
            }
            if (pass) {
                createDatatype({ ...dataform, uploaded_files: event.files });
            } else {
                setResponseStat({
                    status: "",
                    error: "Careful",
                    keep: "yes",
                    message: "SHP or XLSX file Missing !",
                });
            }
        } else {
            setResponseStat({
                status: "",
                error: "",
                keep: "yes",
                message: "Missing Elements",
            });
        }
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
    const handleFormSubmitProject = (values) => {
        if (values) {
            createProjecttype(values);
        }
    };

    const handleFormSubmitData = (values) => {
        if (values) {
            console.log(values);
        }
    };

    const handleFormSubmitFile = (values) => {
        if (values) {
            createFiletype(values);
        }
    };
    const handleFormSubmitExt = (values) => {
        if (values) {
            createFileExt(values);
        }
    };

    useEffect(() => {
        if (loading) {
            fetchFileTypes();
            setLoading(false);
        }
        if (filetypes) {
            setLoaded(true);
        }
    }, [filetypes, loading]);

    const Schema = yup.object().shape({
        label: yup.string().required("Field Required"),
    });
    const SchemaFile = yup.object().shape({
        label: yup.string().required("Field Required"),
        description: yup.string().required("Field Required"),
    });
    const SchemaData = yup.object().shape({
        data_label: yup.string().required("Field Required"),
        description: yup.string().required("Field Required"),
    });
    const SchemaExt = yup.object().shape({
        extention: yup.string().required("Field Required"),
        file_type: yup.number().required("Field Required"),
    });

    return (
        <Box display="flex" flexDirection="column" height="auto" mt="20px">
            {loaded ? (
                <>
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
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb="40px"
                        mt="5px"
                    >
                        <Header
                            icon={<BookmarkAddIcon fontSize="inherit" />}
                            title={"Add a Project Type"}
                            subtitle={
                                "You can use this form to Add a New Project Type to the Database"
                            }
                        />
                    </Box>
                    <Box p="0 50px" m=" 15px auto" width="80%">
                        <Formik
                            onSubmit={handleFormSubmitProject}
                            initialValues={initialValues}
                            validationSchema={Schema}
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
                                            label="Project Type Label"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.label}
                                            name="label"
                                            error={
                                                !!touched.label &&
                                                !!errors.label
                                            }
                                            helperText={
                                                touched.label && errors.label
                                            }
                                            sx={{ gridColumn: "span 6" }}
                                        />
                                    </Box>
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
                                            startIcon={<AddToPhotosIcon />}
                                        >
                                            Add
                                        </Button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </Box>
                    {/* Data Type Section  */}
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb="40px"
                        mt="5px"
                    >
                        <Header
                            icon={<DatasetLinkedIcon fontSize="inherit" />}
                            title={"Add a Data Type"}
                            subtitle={
                                "You can use this form to Add a New Data Type to the Database"
                            }
                        />
                    </Box>
                    <Box p="0 50px" m=" 15px auto" width="80%">
                        <Formik
                            onSubmit={handleFormSubmitData}
                            initialValues={dataform}
                            validationSchema={SchemaData}
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
                                            label="Data Type Label"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                setDataform({
                                                    ...dataform,
                                                    label: e.target.value,
                                                });
                                                handleChange(e);
                                            }}
                                            value={dataform.label}
                                            name="data_label"
                                            error={
                                                !!touched.data_label &&
                                                !!errors.data_label
                                            }
                                            helperText={
                                                touched.data_label &&
                                                errors.data_label
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Data Type Description"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setDataform({
                                                    ...dataform,
                                                    description: e.target.value,
                                                });
                                            }}
                                            value={dataform.description}
                                            name="description"
                                            error={
                                                !!touched.description &&
                                                !!errors.description
                                            }
                                            helperText={
                                                touched.description &&
                                                errors.description
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                    </Box>
                                    <Box m="auto" mt="20px" position="relative">
                                        <Box
                                            width="100%"
                                            m="5px auto 20px auto"
                                            sx={{
                                                "& .p-fileupload-buttonbar": {
                                                    background:
                                                        colors.white["700"],
                                                    borderColor: `${theme
                                                        .palette.mode ===
                                                        "dark" &&
                                                        colors.black["800"] +
                                                            " !important"} `,
                                                },
                                                "& .p-fileupload-buttonbar > .p-button": {
                                                    background:
                                                        colors.indigo["500"],
                                                },
                                                "& .p-fileupload-content": {
                                                    background:
                                                        colors.white["500"],
                                                    color: colors.black["500"],
                                                    borderColor: `${theme
                                                        .palette.mode ===
                                                        "dark" &&
                                                        colors.black["800"] +
                                                            " !important"} `,
                                                },
                                                "& .p-fileupload": {
                                                    border: "0px",
                                                },
                                                "& .p-fileupload-buttonbar>.p-disabled": {
                                                    backgroundColor: `${theme
                                                        .palette.mode ===
                                                        "dark" &&
                                                        colors.white[
                                                            "400"
                                                        ]} !important`,
                                                },
                                            }}
                                        >
                                            <Typography
                                                color={colors.indigo["400"]}
                                                fontSize="20px"
                                                mb="5px"
                                            >
                                                Upload The Shapefile to Create
                                                This new Data Type Table
                                            </Typography>
                                            <FileUpload
                                                name="datatype"
                                                url={""}
                                                multiple
                                                accept="*"
                                                customUpload
                                                uploadHandler={addData}
                                                emptyTemplate={
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            color:
                                                                colors.black[
                                                                    "500"
                                                                ],
                                                        }}
                                                    >
                                                        <Box fontSize="100px">
                                                            <NoteAddIcon fontSize="200px" />
                                                        </Box>
                                                        <p
                                                            style={{
                                                                fontSize:
                                                                    "15px",
                                                            }}
                                                        >
                                                            Choose files or drag
                                                            them here to upload
                                                            them
                                                        </p>
                                                    </Box>
                                                }
                                            />
                                        </Box>
                                        {!filesUploaded && (
                                            <Box
                                                sx={{
                                                    zIndex: "2000",
                                                    width: "100%",
                                                    margin: "auto",
                                                    height: "auto",
                                                    display: "block",
                                                    position: "absolute",
                                                    backgroundColor: `${
                                                        theme.palette.mode ===
                                                        "light"
                                                            ? colors.black[
                                                                  "300"
                                                              ] + 40
                                                            : colors.white[
                                                                  "200"
                                                              ] + 40
                                                    }`,
                                                    top: "30px",
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
                                </form>
                            )}
                        </Formik>
                    </Box>
                    {/* File Type Section */}
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb="40px"
                        mt="5px"
                    >
                        <Header
                            icon={<DescriptionIcon fontSize="inherit" />}
                            title={"Add a File Type"}
                            subtitle={
                                "You can use this form to Add a New File Type to the Database"
                            }
                        />
                    </Box>
                    <Box p="0 50px" m=" 15px auto" width="80%">
                        <Formik
                            onSubmit={handleFormSubmitFile}
                            initialValues={initialValuesFile}
                            validationSchema={SchemaFile}
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
                                            label="File Type Label"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.label}
                                            name="label"
                                            error={
                                                !!touched.label &&
                                                !!errors.label
                                            }
                                            helperText={
                                                touched.label && errors.label
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="File Type Description"
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
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                    </Box>
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
                                            startIcon={<AddToPhotosIcon />}
                                        >
                                            Add
                                        </Button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </Box>
                    {/* File Extention Section */}
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb="40px"
                        mt="5px"
                    >
                        <Header
                            icon={<InsertPageBreakIcon fontSize="inherit" />}
                            title={"Add a File Extention"}
                            subtitle={
                                "You can use this form to Add a New File Extention to the Database"
                            }
                        />
                    </Box>
                    <Box p="0 50px" m=" 15px auto" width="80%">
                        <Formik
                            onSubmit={handleFormSubmitExt}
                            initialValues={initialValuesExt}
                            validationSchema={SchemaExt}
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
                                            label="Extention"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.extention}
                                            name="extention"
                                            error={
                                                !!touched.extention &&
                                                !!errors.extention
                                            }
                                            helperText={
                                                touched.extention &&
                                                errors.extention
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            select
                                            label="File Type"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.file_type}
                                            name="file_type"
                                            error={
                                                !!touched.file_type &&
                                                !!errors.file_type
                                            }
                                            helperText={
                                                touched.file_type &&
                                                errors.file_type
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        >
                                            {filetypes.map((option) => (
                                                <MenuItem
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
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
                                            startIcon={<AddToPhotosIcon />}
                                        >
                                            Add
                                        </Button>
                                    </Box>
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

export default ProjecttypeSingle;
