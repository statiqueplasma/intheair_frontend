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
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import Loading from "../global/loading";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
const CompanySingle = () => {
    const initialValues = {
        N_SIRET: "",
        commercial_name: "",
        legal_name: "",
        address: "",
        telephone_number: "",
        activity_sector: "",
    };
    const theme = useTheme();
    let navigate = useNavigate();
    const {
        sectorsData,
        fetchSectorsData,
        fetchSingleCompanyData,
        updateCompany,
        companyData,
        deleteCompanyData,
        createCompany,
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
                updateCompany({ values, id });
                console.log(values);
            }
        } else {
            if (values) {
                createCompany(values);
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
                fetchSingleCompanyData(id);
            }
            fetchSectorsData();
            setLoading(false);
        }
        if (id === undefined) {
            if (sectorsData) {
                setFormValues(true);
            }
        } else {
            console.log(companyData);
            if (companyData && sectorsData) {
                setFormValues(true);
            }
        }
    }, [companyData, sectorsData, loading]);
    const dateFormater = (date) =>
        new Date(date).toDateString() +
        " " +
        new Date(date).toLocaleTimeString();

    const companySchema = yup.object().shape({
        N_SIRET: yup.string().required("Field Required"),
        address: yup.string().required("Field Required"),
        commercial_name: yup.string().required("Field Required"),
        legal_name: yup.string().required("Field Required"),
        activity_sector: yup.string().required("Field Required"),
        telephone_number: yup.string().required("Field Required"),
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
                                    <DomainAddIcon fontSize="inherit" />
                                ) : (
                                    <RoomPreferencesIcon fontSize="inherit" />
                                )
                            }
                            title={
                                id === undefined
                                    ? "Add a Company"
                                    : `Company: ${companyData.legal_name}`
                            }
                            subtitle={
                                id === undefined
                                    ? "You can use this form to Add a New Company to the Database"
                                    : `You can Edit the Data for ${companyData.legal_name}`
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
                                                    {companyData.legal_name}")
                                                    <br />
                                                    All related companies will
                                                    be Deleted.
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
                                                            deleteCompanyData(
                                                                id
                                                            );
                                                            navigate(
                                                                "/admin/companies"
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
                                          N_SIRET: companyData.N_SIRET,
                                          address: companyData.address,
                                          commercial_name:
                                              companyData.commercial_name,
                                          legal_name: companyData.legal_name,
                                          telephone_number:
                                              companyData.telephone_number,
                                          activity_sector:
                                              companyData.activity_sector,
                                      }
                                    : initialValues
                            }
                            validationSchema={companySchema}
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
                                            label="N de SIRET"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.N_SIRET}
                                            name="N_SIRET"
                                            error={
                                                !!touched.N_SIRET &&
                                                !!errors.N_SIRET
                                            }
                                            helperText={
                                                touched.N_SIRET &&
                                                errors.N_SIRET
                                            }
                                            sx={{ gridColumn: "span 4" }}
                                        />

                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Adress"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.address}
                                            name="address"
                                            error={
                                                !!touched.address &&
                                                !!errors.address
                                            }
                                            helperText={
                                                touched.address &&
                                                errors.address
                                            }
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Commercial Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.commercial_name}
                                            name="commercial_name"
                                            error={
                                                !!touched.commercial_name &&
                                                !!errors.commercial_name
                                            }
                                            helperText={
                                                touched.commercial_name &&
                                                errors.commercial_name
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Legal Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.legal_name}
                                            name="legal_name"
                                            error={
                                                !!touched.legal_name &&
                                                !!errors.legal_name
                                            }
                                            helperText={
                                                touched.legal_name &&
                                                errors.legal_name
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Phone Number"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.telephone_number}
                                            name="telephone_number"
                                            error={
                                                !!touched.telephone_number &&
                                                !!errors.telephone_number
                                            }
                                            helperText={
                                                touched.telephone_number &&
                                                errors.telephone_number
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            select
                                            label="Company Sector"
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
                                            sx={{ gridColumn: "span 2" }}
                                        >
                                            {sectorsData.map(
                                                (option, index) => (
                                                    <MenuItem
                                                        key={
                                                            option.activity_sector
                                                        }
                                                        value={
                                                            option.activity_sector
                                                        }
                                                    >
                                                        {option.activity_sector}
                                                    </MenuItem>
                                                )
                                            )}
                                        </TextField>
                                    </Box>
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
                                                        setFormValues(false);
                                                        navigate(
                                                            "/admin/company/"
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
                                                startIcon={<AddToPhotosIcon />}
                                            >
                                                Add company
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

export default CompanySingle;
