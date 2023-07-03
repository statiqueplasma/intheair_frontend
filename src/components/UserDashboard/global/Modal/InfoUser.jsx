import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Pen from "@mui/icons-material/Edit";
import "../../scenes/users.css";
import { Height } from "@mui/icons-material";
import { tokens } from "../../../../theme";
import {
    Box,
    Typography,
    IconButton,
    useTheme,
    Button,
    TextField,
} from "@mui/material";
import { useData } from "../../../../contexts/DataContext";
import { Formik } from "formik";
import * as yup from "yup";
function InfoUser({ userData }) {
    const [show, setShow] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const iconStyle =
        theme.palette.mode === "light" ? colors.white[500] : colors.black[200];
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { updateUser } = useData();
    const handleFormSubmit = (values) => {
        values.email = userData.email;
        updateUser({ values: values, id: userData.id });
        handleClose();
    };
    const userSchema = yup.object().shape({
        username: yup.string().required("Field Required"),
        first_name: yup.string().required("Field Required"),
        last_name: yup.string().required("Field Required"),
        telephone_number: yup.string().required("Field Required"),
        linkedin_url: yup.string(),
    });

    return (
        <>
            <Box
                mr="5px"
                height="40px"
                margin="110px 20% 0px 5%"
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
                <Button
                    style={{ alignItems: "end", color: "white", width: "100%" }}
                    onClick={handleShow}
                    variant=""
                >
                    <Pen />
                    Modifier
                </Button>
            </Box>
            <Modal
                show={show}
                onHide={handleClose}
                className={theme.palette.mode === "dark" && "edit-modal-black"}
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        style={{
                            color: ` ${
                                theme.palette.mode === "dark"
                                    ? "white"
                                    : "black"
                            }`,
                        }}
                    >
                        Mettre à jour mes coordonnées
                    </Modal.Title>
                </Modal.Header>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={{
                        username: userData.username,
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        telephone_number: userData.telephone_number,

                        linkedin_url: userData.linkedin_url,
                    }}
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
                            <Modal.Body>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": {
                                            gridColumn: "span 4",
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
                                            touched.username && errors.username
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
                                </Box>
                            </Modal.Body>
                            <Modal.Footer>
                                <Box
                                    display="flex"
                                    justifyContent="end"
                                    p="10px"
                                >
                                    <Button
                                        onClick={handleClose}
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
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        color="secondary"
                                        variant="contained"
                                        sx={{ p: "10px 20px" }}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </Modal.Footer>
                        </form>
                    )}
                </Formik>
            </Modal>
        </>
    );
}

export default InfoUser;
