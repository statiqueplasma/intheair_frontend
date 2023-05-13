import Footer from "./Footer";
import { Link } from "react-router-dom";
import globe from "./img/globe.webp";
import carte from "./img/carte.png";
import "./About.css";

import part1 from "../../images/fonctionnement/img1.png";
import part2 from "../../images/fonctionnement/img2.webp";
import part3 from "../../images/fonctionnement/img3.webp";
import part4 from "../../images/fonctionnement/img4.webp";
import part5 from "../../images/fonctionnement/img5.webp";

import Accordion from "react-bootstrap/Accordion";
import Navbare from "./Navbare";

function About() {
    return (
        <>
            <Navbare />
            <h1 className="titre1">
                Comment fonctionne{" "}
                <span style={{ color: "#674CC0" }}>Intheair</span> ?
            </h1>
            <div className="fonctionnement">
                <ul className="partenaires">
                    <div className="partenaires-case1">
                        <p>
                            <img
                                src={part5}
                                width="80"
                                height="60"
                                object-fit="cover"
                                object-position=" 50% 50%"
                            />
                            Capter les données
                        </p>
                        <img
                            alt="img"
                            src={part1}
                            className="partenaires-images"
                        />
                        <p>
                            Le télépilote Intheair capte les données thermiques
                            avec du matériel de pointe pour répondre à votre
                            besoin
                        </p>
                    </div>
                </ul>

                <ul className="partenaires">
                    <div className="partenaires-case2">
                        <i className="fa-solid fa-angles-right"></i>
                    </div>
                </ul>

                <ul className="partenaires1">
                    <div className="partenaires-case1">
                        <p className="oiseau">
                            <img
                                src={part5}
                                width="80"
                                height="60"
                                object-fit="cover"
                                object-position=" 50% 50%"
                            />
                            Analyser les données
                        </p>
                        <img
                            alt="img"
                            src={part2}
                            className="partenaires-images"
                        />
                        <p>
                            Les données brutes sont traitées par nos équipes
                            ingénieurs Data grâce à des algorithmes et logiciels
                            dédiés
                        </p>
                    </div>
                </ul>
                <ul className="partenaires2">
                    <div className="partenaires-case2">
                        <i className="fa-solid fa-angles-right"></i>
                    </div>
                </ul>

                <ul className="partenaires1">
                    <div className="partenaires-case1">
                        <p className="oiseau">
                            <img
                                src={part5}
                                width="80"
                                height="60"
                                object-fit="cover"
                                object-position=" 50% 50%"
                            />
                            Créer un rapport d'analyse
                        </p>
                        <img
                            alt="img"
                            src={part3}
                            className="partenaires-images"
                        />
                        <p>
                            Un rapport d'analyse de données contenant nos
                            recommandations est ensuite réalisé par nos experts
                        </p>
                    </div>
                </ul>

                <ul className="partenaires2">
                    <div className="partenaires-case2">
                        <i className="fa-solid fa-angles-right"></i>
                    </div>
                </ul>

                <ul className="partenaires">
                    <div className="partenaires-case1">
                        <p className="oiseau">
                            <img
                                src={part5}
                                width="80"
                                height="60"
                                object-fit="cover"
                                object-position=" 50% 50%"
                            />
                            Visualiser vos résultats
                        </p>
                        <img
                            alt="img"
                            src={part4}
                            className="partenaires-images"
                        />
                        <p>
                            Les livrables regroupant les analyses vous sont
                            fournis en ligne et restent disponibles et
                            accessibles à votre convenance
                        </p>
                    </div>
                </ul>
            </div>

            <div className=" missions">
                <div className="sous-titre">
                    <h1>Nos Missions</h1>
                    <p>
                        Intheair révolutionne l’imagerie aérienne en offrant un
                        accès facile à <br></br>la captation de données
                        aériennes, leur analyse immediate, suivies<br></br> de
                        recommandations concrètes.
                    </p>
                </div>
                <div className="missions-first-des">
                    <div className="missions-des-text">
                        <h4> Vous êtes Viticulteur?</h4>
                        <p>
                            Optimisez vos rendements & investissements agricoles
                            grâce à notre outil cartographique. Anticipez et
                            gérez le stress hydrique, restructurez votre
                            parcelle, suivez les besoins nutritionnels de vos
                            vignes et optez pour une alternative au travail du
                            sol.
                        </p>

                        <h4>
                            {" "}
                            Vous gérez des infrastructures d'énergies
                            renouvelables?
                        </h4>
                        <p>
                            Réduisez vos coûts et le temps nécessaire par cinq.
                            Pré-visualisez vos futures installations en 3D grâce
                            à la photogramétrie. Optimisez les rendements en
                            identifiant les déperditions de énergétiques grâce
                            aux drones thermiques, et optimisez leur maintenance
                            ainsi que les coûts d'intervention.
                        </p>

                        <h4>
                            {" "}
                            Vous opérez dans les secteurs logistiques &
                            maritimes?
                        </h4>
                        <p>
                            Réalisez vos inventaires en entrepôts grâce à nos
                            capteurs dédiés, inspectez vos infrastructures avec
                            nos outils de diagnostics digitaux et modélisations
                            3D.
                        </p>

                        <h4> Vous êtes professionnel de l'immobilier?</h4>
                        <p>
                            Réservez simplement une prestation photo ou vidéo
                            effectuée par un télépilote membre de notre réseau.
                            Réaliser des bilans énergétiques, des visites
                            virtuelles, ou des modélisations 3D à intégrer dans
                            votre stratégie BIM.
                        </p>
                    </div>

                    <div className="missions-image">
                        <img alt="img" src={globe} />
                        {/* <img alt="img" src={globe}/> */}
                    </div>
                </div>
            </div>

            <div className="localisation">
                <h1>Nous intervenons partout en France </h1>

                <div className="first-des">
                    <div className="des-text">
                        <h5>
                            Un réseau de télépilotes Intheair doté d'une
                            expertise thermique utilisant des drones de dernière
                            génération<br></br>
                            <br></br>
                        </h5>
                        <img
                            className="imgdrone"
                            alt="img"
                            src="https://www5.djicdn.com/assets/images/products/neutron/s3/re-s3-3-9fb2cf408e2a437162e7e17d34df1561.jpg?from=cdnMap"
                        />
                        <p>
                            <br></br>DJI Mavic 2 Entreprise advanced 2022
                            <br></br>
                        </p>
                        <h6>
                            Double camera thermique et optique<br></br>
                            Capteur Radiometrique 640*512 px<br></br>
                            Capteur CMOS 1/2 pouces
                        </h6>
                    </div>
                    <div className="loc-image">
                        <img alt="img" src={carte} />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
export default About;
