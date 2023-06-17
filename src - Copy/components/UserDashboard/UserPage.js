import Bouton from "./Bouton";
import { useState, useRef } from "react";
import { Form, Nav, Container, Stack, ListGroup, FormCheck } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import image from "../images/loginContact.webp";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";


function UserPage() {
    
        
            return (
                <Container className="align-items-center">
                <div class="col">
                    <div class="col" style={{ borderRight: "0px solid" }}>
                        <h5>Ajouter un client</h5>
                        {/* <img
                            alt=""
                            src={image}
                            width="200"
                            height="200"
                        />{' '} */}
                    </div>
                    <div class="col">
                        <Form>
                            <Stack gap={2}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Votre adresse mail</Form.Label>
                                    <Form.Control type="email" placeholder="votreemail@email.com" />
                                </Form.Group>
                                <Container className="align-items-center">
                                    <div class="row"></div>
                                        <div class="col">
                                            <Form.Group className="mb-0">
                                                <Form.Label>Vos coordonnées</Form.Label>
                                                <Form.Control type="text" placeholder="Prénom" />
                                            </Form.Group>
                                        </div>
                                        <div class="col">
                                            <Form.Group className="mb-0" >
                                                <Form.Control type="text" placeholder="Nom" />
                                            </Form.Group>
                                        </div>
                                </Container>
                                
                                <Container fluid style={{ paddingLeft: "50%"}}>
                                    <Bouton type={"submit"} couleurFond={"#674CC0"} couleurTexte={"white"}><strong>Envoyer</strong></Bouton>
                                </Container>
                            </Stack>
                        </Form>
                    </div>
                </div>
                </Container>
            );
}

export default UserPage;