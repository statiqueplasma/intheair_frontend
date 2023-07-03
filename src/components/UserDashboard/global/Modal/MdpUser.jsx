import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Pen from "@mui/icons-material/Edit";
import "../../scenes/users.css";
import { Height } from "@mui/icons-material";
import { tokens } from "../../../../theme";
import { Box, useTheme, Typography, TextField, Button } from "@mui/material";
import { Formik } from "formik";
import { useData } from "../../../../contexts/DataContext";
import * as yup from "yup";
function MdpUser() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const iconStyle =
        theme.palette.mode === "light" ? colors.white[500] : colors.black[200];
    const { userChangePassword } = useData();
    const Schema = yup.object().shape({
        old_password: yup.string().required("Field Required"),
        new_password: yup.string().required("Field Required"),
        confirm_password: yup
            .string()
            .oneOf([yup.ref("new_password")], "Passwords must match")
            .required("Field Required"),
    });
    const handleFormSubmit = (values) => {
        userChangePassword(values);
        handleClose();
    };
    return (
        <>
            <Box
                mr="5px"
                height="40px"
                margin="13px 20% 0px 5%"
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
                        Changer le mot de passe
                    </Modal.Title>
                </Modal.Header>

                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={{
                        old_password: "",
                        new_password: "",
                        confirm_password: "",
                    }}
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
                                        label="Current Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.old_password}
                                        name="old_password"
                                        error={
                                            !!touched.old_password &&
                                            !!errors.old_password
                                        }
                                        helperText={
                                            touched.old_password &&
                                            errors.old_password
                                        }
                                        sx={{ gridColumn: "span 6" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="New Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.new_password}
                                        name="new_password"
                                        error={
                                            !!touched.new_password &&
                                            !!errors.new_password
                                        }
                                        helperText={
                                            touched.new_password &&
                                            errors.new_password
                                        }
                                        sx={{ gridColumn: "span 6" }}
                                    />
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Confirm Password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.confirm_password}
                                        name="confirm_password"
                                        error={
                                            !!touched.confirm_password &&
                                            !!errors.confirm_password
                                        }
                                        helperText={
                                            touched.confirm_password &&
                                            errors.confirm_password
                                        }
                                        sx={{ gridColumn: "span 6" }}
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

export default MdpUser;
