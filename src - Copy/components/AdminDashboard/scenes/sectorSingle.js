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
import AddHomeIcon from "@mui/icons-material/AddHome";
import Loading from "../global/loading";

const SectorSingle = () => {
    const initialValues = {
        activity_sector: "",
        description: "",
    };

    const theme = useTheme();
    let navigate = useNavigate();
    const { createSector } = useData();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(true);
    const [formValues, setFormValues] = useState(false);
    const { id } = useParams();
    const isNonMobile = useMediaQuery("(min-width:700px)");
    const handleFormSubmit = (values) => {
        if (values) {
            createSector(values);
        }
    };

    useEffect(() => {
        if (loading) {
            setLoading(false);
        }
    }, [loading]);

    const Schema = yup.object().shape({
        activity_sector: yup.string().required("Field Required"),
        description: yup.string().required("Field Required"),
    });

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="800px"
            height="100%"
            mt="20px"
        >
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
                            icon={<AddHomeIcon fontSize="inherit" />}
                            title={"Add a Sector"}
                            subtitle={
                                "You can use this form to Add a New Activity Sector to the Database"
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
                                            label="Activity Sector"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.activity_sector}
                                            name="activity_sector"
                                            error={
                                                !!touched.activity_sector &&
                                                !!errors.activity_sector
                                            }
                                            helperText={
                                                touched.activity_sector &&
                                                errors.activity_sector
                                            }
                                            sx={{ gridColumn: "span 6" }}
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

export default SectorSingle;
