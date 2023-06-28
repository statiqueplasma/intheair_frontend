import Footere from "./Footere";
import { Link } from "react-router-dom";
import globe from "./img/globe.webp";
import carte from "./img/carte.jpg";
import "./About.css";

import part1 from "../../images/fonctionnement/img1.png";
import part2 from "../../images/fonctionnement/img2.webp";
import part3 from "../../images/fonctionnement/img3.webp";
import part4 from "../../images/fonctionnement/img4.webp";
import part5 from "../../images/fonctionnement/img5.webp";

import Accordion from "react-bootstrap/Accordion";
import Navbaree from "./Navbaree";

function About() {
    return (
        <>
            <Navbaree />
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
                            Capturing data
                        </p>
                        <img
                            alt="img"
                            src={part1}
                            className="partenaires-images"
                        />
                        <p>
                            The Intheair remote pilot captures thermal data
                            with state-of-the-art equipment to meet your
                            need
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
                            Analyze data
                        </p>
                        <img
                            alt="img"
                            src={part2}
                            className="partenaires-images"
                        />
                        <p>
                            Raw data is processed by our teams
                            Data engineers through algorithms and software
                            Dedicated
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
                            Create an analysis report
                        </p>
                        <img
                            alt="img"
                            src={part3}
                            className="partenaires-images"
                        />
                        <p>
                            A data analysis report containing our
                            recommendations are then made by our experts
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
                            Visualize your results
                        </p>
                        <img
                            alt="img"
                            src={part4}
                            className="partenaires-images"
                        />
                        <p>
                            The deliverables grouping the analyses are yours
                            provided online and remain available and
                            accessible at your convenience
                        </p>
                    </div>
                </ul>
            </div>

            <div className=" missions">
                <div className="sous-titre">
                    <h1>Nos Missions</h1>
                    <p>
                        Intheair revolutionizes aerial imagery by offering a
                        Easy access to <br></br>data capture
                        aerial, their immediate analysis, followed by<br></br>
                        concrete recommendations.
                    </p>
                </div>
                <div className="missions-first-des">
                    <div className="missions-des-text">
                        <h4> Vous êtes Viticulteur?</h4>
                        <p>
                            Optimize your agricultural yields & investments
                            thanks to our mapping tool. Anticipate and
                            Manage water stress, restructure your
                            plot, follow the nutritional needs of your
                            vineyards and opt for an alternative to the work of the
                            ground.
                        </p>

                        <h4>
                            {" "}
                            Vous gérez des infrastructures d'énergies
                            renouvelables?
                        </h4>
                        <p>
                            Reduce your costs and time by five.
                            Preview your future installations in 3D thanks to
                            photogrammetry. Optimize yields by
                            identifying energy losses thanks to
                            thermal drones, and optimize their maintenance
                            and intervention costs.
                        </p>

                        <h4>
                            {" "}
                            You operate in the logistics &
                            Maritime?
                        </h4>
                        <p>
                            Carry out your inventories in warehouses thanks to our
                            Dedicated sensors, inspect your infrastructure with
                            Our digital diagnostic tools and modeling
                            .3D.
                        </p>

                        <h4> Are you a real estate professional?</h4>
                        <p>
                            Simply book a photo or video service
                            carried out by a remote pilot member of our network.
                            Carry out energy balances, visits
                            virtual, or 3D models to be integrated into
                            your BIM strategy.
                        </p>
                    </div>

                    <div className="missions-image">
                        <img alt="img" src={globe} />
                        {/* <img alt="img" src={globe}/> */}
                    </div>
                </div>
            </div>

            <div className="localisation">
                <h1>We operate everywhere in France </h1>

                <div className="first-des">
                    <div className="des-text">
                        <h5>
                            An Intheair remote pilot network with a
                            Thermal expertise using state-of-the-art drones
                            generation<br></br>
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

            <Footere />
        </>
    );
}
export default About;
