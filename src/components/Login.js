import { useState, useEffect } from "react";
import { Form, Nav, Container, Stack } from "react-bootstrap";
import Bouton from "./Bouton";
import { useAuth } from "../contexts/AuthContext";
import image from "../images/loginContact.webp";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

function Client() {
    let navigate = useNavigate();
    const { user, logIn } = useAuth();

    //if the user is already logged in, we send the user to his respective userpage
    useEffect(() => {
        if (user) {
            navigate("/userroute");
        }
    }, []);

    return (
        <Form onSubmit={logIn}>
            <Stack gap={4}>
                <Form.Group id="email">
                    <Form.Control
                        type="email"
                        placeholder="votreemail@email.com"
                        name="email"
                        required
                    />
                </Form.Group>
                <Form.Group id="mdp">
                    <Form.Control
                        type="password"
                        placeholder="mot de passe"
                        name="mdp"
                        required
                    />
                </Form.Group>
                <Container fluid style={{ paddingLeft: "80%" }}>
                    <Bouton
                        type={"submit"}
                        couleurFond={"#674CC0"}
                        couleurTexte={"white"}
                    >
                        <strong>OK</strong>
                    </Bouton>
                </Container>
            </Stack>
        </Form>
    );
}

function NonClient() {
    const schema = yup.object().shape({
        email: yup.string().email().required().max(50),
        prenom: yup.string().required().max(50),
        nom: yup.string().required().max(50),
        description: yup.string().required().max(2000),
        fichier_cdc: yup.object(),
        rendu_autocad: yup.boolean(),
        rendu_sketchup: yup.boolean(),
        rendu_qgis: yup.boolean(),
        rendu_autre: yup.boolean(),
        commentaires: yup.string().max(2000),
    });

    function handleSubmit(contacts) {
        console.log(contacts);
    }

    return (
        <Container className="align-items-center">
            <div className="row">
                <div
                    className="col text-center"
                    style={{ marginRight: "7%", borderRight: "2px solid" }}
                >
                    <h3 className="text-center" style={{ color: "#674CC0" }}>
                        <strong>Contacter notre équipe</strong>
                    </h3>
                    <img alt="" src={image} width="300" height="300" />{" "}
                    <h4>07 09 08 09 08</h4>
                    <h4>contact@intheair.tech</h4>
                </div>
                <div className="col">
                    <h3 className="text-center" style={{ color: "#674CC0" }}>
                        <strong>Obtenir un devis</strong>
                    </h3>

                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{
                            email: "",
                            prenom: "",
                            nom: "",
                            description: "",
                            fichier_cdc: "",
                            rendu_autocad: false,
                            rendu_sketchup: false,
                            rendu_qgis: false,
                            rendu_autre: false,
                            commentaires: "",
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            touched,
                            isValid,
                            errors,
                        }) => (
                            <Form
                                noValidate
                                onSubmit={handleSubmit}
                                style={{ paddingLeft: "0%" }}
                            >
                                <Stack gap={2}>
                                    <Form.Group
                                        className="mb-2"
                                        controlId="validationFormikEmail"
                                    >
                                        <Form.Label>
                                            <strong>Vos coordonnées</strong>
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="votreemail@email.com"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isValid={
                                                touched.email && !errors.email
                                            }
                                            isInvalid={!!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <div className="row">
                                        <div className="col-auto">
                                            <Form.Group className="mb-2">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Prénom"
                                                    name="prenom"
                                                    value={values.prenom}
                                                    onChange={handleChange}
                                                    isValid={
                                                        touched.prenom &&
                                                        !errors.prenom
                                                    }
                                                    isInvalid={!!errors.prenom}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.prenom}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className="col-auto">
                                            <Form.Group className="mb-2">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nom"
                                                    name="nom"
                                                    value={values.nom}
                                                    onChange={handleChange}
                                                    isValid={
                                                        touched.nom &&
                                                        !errors.nom
                                                    }
                                                    isInvalid={!!errors.nom}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.nom}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <Form.Group className="mb-2">
                                        <Form.Label>
                                            <strong>
                                                Description de votre projet
                                            </strong>
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Mon projet"
                                            name="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            isValid={
                                                touched.description &&
                                                !errors.description
                                            }
                                            isInvalid={!!errors.description}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.description}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        controlId="formFile"
                                        className="mb-2"
                                        name="cdc"
                                    >
                                        <Form.Label>
                                            <strong>
                                                Déposer un cahier des charges
                                            </strong>
                                        </Form.Label>
                                        <Form.Control
                                            type="file"
                                            value={values.fichier_cdc}
                                            onChange={handleChange}
                                            isValid={
                                                touched.fichier_cdc &&
                                                !errors.fichier_cdc
                                            }
                                            isInvalid={!!errors.fichier_cdc}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.fichier_cdc}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Label className="mb-1">
                                        <strong>Rendu désiré</strong>
                                    </Form.Label>
                                    <Form.Group>
                                        <Form.Check
                                            label={`Autocad`}
                                            name="rendu_autocad"
                                            value={values.rendu_autocad}
                                            onChange={handleChange}
                                            isValid={
                                                touched.rendu_autocad &&
                                                !errors.rendu_autocad
                                            }
                                            isInvalid={!!errors.rendu_autocad}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.rendu_autocad}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Check
                                            label={`Sketchup`}
                                            name="rendu_sketchup"
                                            value={values.rendu_sketchup}
                                            onChange={handleChange}
                                            isValid={
                                                touched.rendu_sketchup &&
                                                !errors.rendu_sketchup
                                            }
                                            isInvalid={!!errors.rendu_sketchup}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.rendu_sketchup}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Check
                                            label={`Qgis`}
                                            name="rendu_qgis"
                                            value={values.rendu_qgis}
                                            onChange={handleChange}
                                            isValid={
                                                touched.rendu_qgis &&
                                                !errors.rendu_qgis
                                            }
                                            isInvalid={!!errors.rendu_qgis}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.rendu_qgis}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Check
                                            label={"Autre"}
                                            name="rendu_autre"
                                            value={values.rendu_autre}
                                            onChange={handleChange}
                                            isValid={
                                                touched.rendu_autre &&
                                                !errors.rendu_autre
                                            }
                                            isInvalid={!!errors.rendu_autre}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.rendu_autre}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            <strong>Commentaires</strong>
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Détails supplémentaires"
                                            name="commentaires"
                                            value={values.commentaires}
                                            onChange={handleChange}
                                            isValid={
                                                touched.commentaires &&
                                                !errors.commentaires
                                            }
                                            isInvalid={!!errors.commentaires}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.commentaires}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Container
                                        fluid
                                        style={{ paddingLeft: "80%" }}
                                    >
                                        <Bouton
                                            type={"submit"}
                                            couleurFond={"#674CC0"}
                                            couleurTexte={"white"}
                                        >
                                            <strong>Envoyer</strong>
                                        </Bouton>
                                    </Container>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Container>
    );
}

function Login() {
    const [estClient, setEstClient] = useState(true);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    return (
        <Container className="d-flex align-items-center justify-content-center">
            {/* <Bouton onClick={handleShow}>test modal</Bouton>
            <ModalError show={show} setShow={setShow}/> */}

            <Stack gap={5}>
                <Nav fill variant="tabs" defaultActiveKey="#client">
                    <Nav.Item as={"h3"}>
                        <Nav.Link
                            style={{
                                marginLeft: "50%",
                                marginTop: "5%",
                                width: "50%",
                                color: "#5DB2B6",
                            }}
                            href="#client"
                            onClick={() => setEstClient(true)}
                        >
                            Déjà Client
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as={"h3"}>
                        <Nav.Link
                            style={{
                                marginTop: "5%",
                                width: "50%",
                                color: "#5DB2B6",
                            }}
                            href="#nonclient"
                            onClick={() => setEstClient(false)}
                        >
                            Pas encore client
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                {estClient ? (
                    <Container style={{ width: "30%" }}>
                        <Client />
                    </Container>
                ) : (
                    <NonClient />
                )}
            </Stack>
        </Container>
    );
}

export default Login;
