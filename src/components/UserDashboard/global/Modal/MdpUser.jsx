import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Pen from '@mui/icons-material/Edit';
import "../../scenes/users.css"
import { Height } from '@mui/icons-material';
import { tokens } from "../../../../theme";
import { Box, useTheme, Typography } from "@mui/material";

function MdpUser() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const iconStyle = theme.palette.mode === "light" ? colors.white[500] : colors.black[200];

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
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
        <Modal.Title style={{ color: "black" }}>
          Changer le mot de passe
        </Modal.Title>
          
        </Modal.Header>
        
        <Modal.Body>
          <Form>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "black" }}>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                style={{ outline: "none", border: "1px solid rgba(0, 0, 0, 0.3)", boxShadow: "none" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "black" }}>Nouveau mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                style={{ outline: "none", border: "1px solid rgba(0, 0, 0, 0.3)", boxShadow: "none" }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "black" }}>Veuillez confirmer ce mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="confirm password"
                autoFocus
                style={{ outline: "none", border: "1px solid rgba(0, 0, 0, 0.3)", boxShadow: "none" }}
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
        <Modal.Footer>
        <Button variant="" onClick={handleClose} style={{ backgroundColor: "#674CC0", color: "white"}}>
          Fermer
        </Button>
          <Box>
            <Button variant="" onClick={handleClose} style={{ backgroundColor: "#f0f0f0" }} >
              Enregister
            </Button>
          </Box>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MdpUser;