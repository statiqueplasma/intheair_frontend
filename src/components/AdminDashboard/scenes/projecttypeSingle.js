import Header from "../global/header";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, useTheme, TextField, Button } from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../../../theme";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useData } from "../../../contexts/DataContext";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Loading from "../global/loading";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
const ProjecttypeSingle = () => {
    const initialValues = {
        label: "",
    };

    const theme = useTheme();
    let navigate = useNavigate();
    const { createProjecttype } = useData();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState(false);
    const { id } = useParams();
    const isNonMobile = useMediaQuery("(min-width:700px)");
    const handleFormSubmit = (values) => {
        if (values) {
            createProjecttype(values);
        }
    };

    useEffect(() => {
        if (loading) {
            setLoading(false);
        }
    }, [loading]);

    const Schema = yup.object().shape({
        label: yup.string().required("Field Required"),
    });

    return (
        <Box display="flex" flexDirection="column" height="900px" mt="20px">
            {!loading ? (
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
                            icon={<BookmarkAddIcon fontSize="inherit" />}
                            title={"Add a Project Type"}
                            subtitle={
                                "You can use this form to Add a New Project Type to the Database"
                            }
                        />
                    </Box>
                    <Box p="0 50px" m=" 15px auto" width="80%">
                        <Formik
                            onSubmit={handleFormSubmit}
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
                </>
            ) : (
                <Loading />
            )}
        </Box>
    );
};

export default ProjecttypeSingle;
