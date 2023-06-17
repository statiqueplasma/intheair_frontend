import Bouton from "./Bouton";
import { useState, useRef } from "react";
import { Form, Nav, Container, Stack, ListGroup, FormCheck, Col, Row } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import image11 from "../images/acc1/img1.webp"
import image12 from "../images/acc1/img2.webp"
import image13 from "../images/acc1/img3.webp"
import image14 from "../images/acc1/img4.webp"
import image15 from "../images/acc1/img5.webp"
import image21 from "../images/acc2/img1.webp"
import image22 from "../images/acc2/img2.webp"
import image23 from "../images/acc2/img3.webp"
import image24 from "../images/acc2/img4.webp"
import image25 from "../images/acc2/logo.webp"

import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

function Home() {
    
        
    return (
        <Container className="align-items-center">
            
        
        <div>
            <h1 style={{ textAlign: "center" }}>Nos domaines d'expertise</h1>
            <br></br>
            <Container>
                <Row style={{ backgroundColor: "grey" }}>
                    <Col>
                    
                    <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "20px" }}>
                            Energies Vertes & Environnement
                            </p>
                    </div>
                        <img 
                        src={image11} 
                        alt="Energies Vertes & Environnement" 
                        width="208"
                        height= "138"
                        object-fit= "cover"
                        object-position=" 50% 50%"
                        fetchpriority="high"
                        />
                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "10px" }}>
                            Optimiser le rendement de panneaux photovoltaïques.
                            <br></br>
                            Préparer et assurer la maintenance des éoliennes
                            <br></br>
                            Diagnostic des îlots de chaleur en milieu urbain
                            </p>
                        </div>
                    </Col>

                    <Col>
                    <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "20px" }}>
                            Immobilier & BTP
                            </p>
                    </div>
                    <br></br>
                        <img
                        src={image12}
                        alt="Immobilier et BTP" 
                        width="208"
                        height= "138"
                        object-fit= "cover"
                        object-position=" 50% 50%"
                        fetchpriority="high"
                        />
                        <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "10px" }}>
                            <br></br>
                        Modélisation 3D & BIM
                            <br></br>
                            Promotion immobilière
                            <br></br>
                            Inspection terrains
                            <br></br>
                            Bilans énergétiques
                            </p>
                        </div>
                    </Col>

                    <Col>
                    <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "20px" }}>
                            Viticulture de Précision
                            </p>
                    </div>
                    <br></br>
                        <img
                            src={image13}
                            alt="Viticulture de Précision" 
                            width="208"
                            height= "138"
                            object-fit= "cover"
                            object-position=" 50% 50%"
                            fetchpriority="high"
                        />
                         <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "12px" }}>
                            Voici mon paragraphe avec une taille de police de 16 pixels.
                             </p>
                        </div>                       
                    </Col>

                    <Col>
                    <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "20px" }}>
                            Evènementiel
                            </p>
                    </div>
                    <br></br>
                        <img
                            src={image14}
                            alt="Evènementiel" 
                            width="208"
                            height= "138"
                            object-fit= "cover"
                            object-position=" 50% 50%"
                            fetchpriority="high"
                        />
                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "12px" }}>
                            Voici mon paragraphe avec une taille de police de 16 pixels.
                             </p>
                        </div>
                    </Col>

                    <Col>
                    <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "20px" }}>
                            Logistique & Shipping
                            </p>
                    </div>
                    <br></br>
                        <img 
                            src={image15} 
                            alt="Immobilier et BTP" 
                            width="208"
                            height= "138"
                            object-fit= "cover"
                            object-position=" 50% 50%"
                            fetchpriority="high"
                            />
                            
                            
                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "12px" }}>
                            Voici mon paragraphe avec une taille de police de 16 pixels.
                             </p>
                        </div>
                    </Col>
                </Row>
            </Container>











            <h1 style={{ textAlign: "center" }}>Comment fonctionne Intheair ?</h1>
            <br></br>
            <Container>
                <Row style={{ backgroundColor: "white" }}>
                    <Col>
                        <div style={{ textAlign: "center" }}>
                                <p style={{ fontSize: "20px" }}>
                                <img src={image25}  width="60" height= "40" object-fit= "cover" object-position=" 50% 50%" fetchpriority="high"/>
                    
                                Capter les données
                                </p>
                        </div>
                            <img 
                            src={image21} 
                            alt="Energies Vertes & Environnement" 
                            width="208"
                            height= "138"
                            object-fit= "cover"
                            object-position=" 50% 50%"
                            fetchpriority="high"
                            />
                            <div style={{ textAlign: "center" }}>
                                <p style={{ fontSize: "10px" }}>
                                Le télépilote Intheair capte les données thermiques avec du matériel de pointe pour répondre à votre besoin
                                </p>
                            </div>
                    </Col>
                    <Col md={1} style={{borderRight: '1px solid #ccc', width :'50px', borderLeft: '1px solid #ccc'}}>
                    
                    <img 
                            src={image21} 
                            alt="Energies Vertes & Environnement" 
                            width="20"
                            height= "13"
                            object-fit= "cover"
                            object-position=" 50% 50%"
                            fetchpriority="high"
                            />
                    </Col>
                    
                    <Col>
                    <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "20px" }}>
                            <img src={image25}  width="60" height= "40" object-fit= "cover" object-position=" 50% 50%" fetchpriority="high"/>
                    
                            Analyser les données
                            </p>
                    </div>
                        <img
                        src={image22}
                        alt="Immobilier et BTP" 
                        width="208"
                        height= "138"
                        object-fit= "cover"
                        object-position=" 50% 50%"
                        fetchpriority="high"
                        />
                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "10px" }}>
                            Les données brutes sont traitées par nos équipes ingénieurs Data grâce à des algorithmes et logiciels dédiés
                            </p>
                        </div>
                    </Col>

                    <Col>
                    <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "20px" }}>
                            <img src={image25}  width="60" height= "40" object-fit= "cover" object-position=" 50% 50%" fetchpriority="high"/>
                            Créer rapport d'analyse
                            </p>
                    </div>
                    
                        <img
                            src={image23}
                            alt="Viticulture de Précision" 
                            width="208"
                            height= "138"
                            object-fit= "cover"
                            object-position=" 50% 50%"
                            fetchpriority="high"
                        />
                         <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "10px" }}>
                            Un rapport d'analyse de données contenant nos recommandations est ensuite réalisé par nos experts
                             </p>
                        </div>                       
                    </Col>

                    <Col>
                    <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "20px" }}>
                                <img src={image25}  width="60" height= "40" object-fit= "cover" object-position=" 50% 50%" fetchpriority="high"/>
                    
                            Visualiser vos résultats
                            </p>
                    </div>
                        <img
                            src={image24}
                            alt="Evènementiel" 
                            width="208"
                            height= "138"
                            object-fit= "cover"
                            object-position=" 50% 50%"
                            fetchpriority="high"
                        />
                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "12px" }}>
                            Les livrables regroupant les analyses vous sont fournis en ligne et restent disponibles et accessibles à votre convenance
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Description de votre projet</Form.Label>
                            <Form.Control type="text" placeholder="Mon projet" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Commentaires</Form.Label>
                            <Form.Control type="text" placeholder="Détails supplémentaires" />
                        </Form.Group>
                            {['choix1', 'choix2'].map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                            <Form.Check 
                                type={type}
                                id={`default-${type}`}
                                label={`default ${type}`}
                            />
                            </div>
                            ))}
                        <Container fluid style={{ paddingLeft: "80%"}}>
                            <Bouton type={"submit"} couleurFond={"#674CC0"} couleurTexte={"white"}><strong>Envoyer</strong></Bouton>
                        </Container>
                    </Stack>
                </Form>
            </div>
        
        </Container>
    );
} 
export default Home;
