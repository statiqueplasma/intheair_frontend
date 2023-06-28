import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Pen from '@mui/icons-material/Edit';
import "../../scenes/users.css"
import { Height } from '@mui/icons-material';
import { tokens } from "../../../../theme";
import { Box, useTheme } from "@mui/material";

function MailUser() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  return (
    <>
    <Box mr="5px"
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
                        }}>
      <Button style={{  alignItems : 'end', color: 'white', width : '100%' }} onClick={handleShow} variant="">
        <Pen/>Modifier
      </Button>
    </Box>
      <Modal show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title style={{ color: "black" }}>Changer l’adresse e-mail</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Form>
            <p>Vous pouvez contacter le service client directement</p>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "black" }}>nouvelle adresse mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "black" }}>Confirmation</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
        <Button variant="" onClick={handleClose} style={{ backgroundColor: "#674CC0", color: "white", "&:hover": { backgroundColor: "grey" } }}>
          Fermer
        </Button>
          <Box>
            <Button variant="" onClick={handleClose} style={{ backgroundColor: "#f0f0f0" }} >
              Enregister
            </Button>
          </Box>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default MailUser;