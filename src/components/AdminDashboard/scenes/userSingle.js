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
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Loading from "../global/loading";

import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";

const UserSingle = () => {
    const initialValues = {
        password: "",
        password_2: "",
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        telephone_number: "",
        hubspot_user_id: "",
        position: "",
        linkedin_url: "",
        company: "",
        user_type: "",
    };
    const test = [
        {
            N_SIRET: "gdsefrs",
            commercial_name: "fewqewqgewqg",
            legal_name: "ewqgewgeqw",
            address: "ewqgewgq",
            telephone_number: "ewqgweqgw",
            activity_sector: "test",
        },
    ];
    const theme = useTheme();
    let navigate = useNavigate();
    const {
        userData,
        fetchSingleUserData,
        updateUser,
        deleteUserData,
        companiesData,
        fetchCompaniesData,
        createUser,
        userTypes,
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
            if (values) updateUser({ values, id });
        } else {
            if (values) {
                createUser(values);
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
                fetchSingleUserData(id);
            }
            fetchCompaniesData();
            setLoading(false);
        }
        if (id === undefined) {
            if (companiesData) {
                console.log(companiesData);
                setFormValues(true);
            }
        } else {
            if (userData && companiesData) {
                setFormValues(true);
            }
        }
    }, [userData, companiesData, loading]);
    const dateFormater = (date) =>
        new Date(date).toDateString() +
        " " +
        new Date(date).toLocaleTimeString();
    const userSchema = yup.object().shape(
        id === undefined
            ? {
                  password: yup.string().required("Field Required"),
                  password_2: yup
                      .string()
                      .oneOf(
                          [yup.ref("password"), null],
                          "Passwords must match"
                      ),
                  email: yup
                      .string()
                      .email("Invalid Email Adress")
                      .required("Field Required"),
                  username: yup.string().required("Field Required"),
                  first_name: yup.string().required("Field Required"),
                  last_name: yup.string().required("Field Required"),
                  telephone_number: yup.string().required("Field Required"),
                  hubspot_user_id: yup.string().required("Field Required"),
                  position: yup.string().required("Field Required"),
              }
            : {
                  email: yup
                      .string()
                      .email("Invalid Email Adress")
                      .required("Field Required"),
                  username: yup.string().required("Field Required"),
                  first_name: yup.string().required("Field Required"),
                  last_name: yup.string().required("Field Required"),
                  telephone_number: yup.string().required("Field Required"),
                  hubspot_user_id: yup.string().required("Field Required"),
                  position: yup.string().required("Field Required"),
              }
    );

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
                                    <PersonAddAlt1Icon fontSize="inherit" />
                                ) : (
                                    <ManageAccountsIcon fontSize="inherit" />
                                )
                            }
                            title={
                                id === undefined
                                    ? "Add a User"
                                    : `User: ${userData.username}`
                            }
                            subtitle={
                                id === undefined
                                    ? "You can use this form to Add a New User to the Database"
                                    : `You can Edit the Data for ${userData.first_name} ${userData.last_name}`
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
                                                    Are you Sure you want to
                                                    DELETE This User ("
                                                    {userData.username}")
                                                    <br />
                                                    All related projects will be
                                                    Deleted.
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignSelf: "end",
                                                        justifyContent:
                                                            "space-between",
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
                                                            deleteUserData(id);
                                                            navigate(
                                                                "/admin/users"
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
                                          email: userData.email,
                                          username: userData.username,
                                          first_name: userData.first_name,
                                          last_name: userData.last_name,
                                          telephone_number:
                                              userData.telephone_number,
                                          hubspot_user_id:
                                              userData.hubspot_user_id,
                                          position: userData.position,
                                          linkedin_url: userData.linkedin_url,
                                          company: userData.company,
                                          user_type: userData.user_type,
                                      }
                                    : initialValues
                            }
                            validationSchema={userSchema}
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
                                            label="First Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.first_name}
                                            name="first_name"
                                            error={
                                                !!touched.first_name &&
                                                !!errors.first_name
                                            }
                                            helperText={
                                                touched.first_name &&
                                                errors.first_name
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
                                            value={values.last_name}
                                            name="last_name"
                                            error={
                                                !!touched.last_name &&
                                                !!errors.last_name
                                            }
                                            helperText={
                                                touched.last_name &&
                                                errors.last_name
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Username"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.username}
                                            name="username"
                                            error={
                                                !!touched.username &&
                                                !!errors.username
                                            }
                                            helperText={
                                                touched.username &&
                                                errors.username
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="email"
                                            label="Email"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            name="email"
                                            error={
                                                !!touched.email &&
                                                !!errors.email
                                            }
                                            helperText={
                                                touched.email && errors.email
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        {id === undefined && (
                                            <>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="password"
                                                    label="Password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.password}
                                                    name="password"
                                                    error={
                                                        !!touched.password &&
                                                        !!errors.password
                                                    }
                                                    helperText={
                                                        touched.password &&
                                                        errors.password
                                                    }
                                                    sx={{
                                                        gridColumn: "span 2",
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="password"
                                                    label="Retype Password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.password_2}
                                                    name="password_2"
                                                    error={
                                                        !!touched.password_2 &&
                                                        !!errors.password_2
                                                    }
                                                    helperText={
                                                        touched.password_2 &&
                                                        errors.password_2
                                                    }
                                                    sx={{
                                                        gridColumn: "span 2",
                                                    }}
                                                />
                                            </>
                                        )}
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
                                            type="text"
                                            label="User Hubspot ID"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.hubspot_user_id}
                                            name="hubspot_user_id"
                                            error={
                                                !!touched.hubspot_user_id &&
                                                !!errors.hubspot_user_id
                                            }
                                            helperText={
                                                touched.hubspot_user_id &&
                                                errors.hubspot_user_id
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            select
                                            label="Compamy"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.company}
                                            name="company"
                                            error={
                                                !!touched.company &&
                                                !!errors.company
                                            }
                                            helperText={
                                                touched.company &&
                                                errors.company
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        >
                                            {companiesData.map(
                                                (option, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={
                                                            option.legal_name
                                                        }
                                                    >
                                                        {option.commercial_name}
                                                    </MenuItem>
                                                )
                                            )}
                                        </TextField>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Position"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.position}
                                            name="position"
                                            error={
                                                !!touched.position &&
                                                !!errors.position
                                            }
                                            helperText={
                                                touched.position &&
                                                errors.position
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="url"
                                            label="LinkedIn"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.linkedin_url}
                                            name="linkedin_url"
                                            error={
                                                !!touched.linkedin_url &&
                                                !!errors.linkedin_url
                                            }
                                            helperText={
                                                touched.linkedin_url &&
                                                errors.linkedin_url
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            select
                                            label="User Type"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.user_type}
                                            name="user_type"
                                            error={
                                                !!touched.user_type &&
                                                !!errors.user_type
                                            }
                                            helperText={
                                                touched.user_type &&
                                                errors.user_type
                                            }
                                            sx={{ gridColumn: "span 2" }}
                                        >
                                            {userTypes.map((option, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={option.value}
                                                >
                                                    {option.label}
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
                                                        Last Login:
                                                    </Typography>
                                                    <Typography
                                                        p="5px"
                                                        variant="h8"
                                                        color={dateStyle.date}
                                                    >
                                                        {userData.last_login
                                                            ? dateFormater(
                                                                  userData.last_login
                                                              )
                                                            : "Not yet Loged In"}
                                                    </Typography>
                                                </Box>
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
                                                            userData.last_edit_date
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
                                                            "/admin/user/"
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
                                                startIcon={<PersonAddAltIcon />}
                                            >
                                                Add user
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

export default UserSingle;
