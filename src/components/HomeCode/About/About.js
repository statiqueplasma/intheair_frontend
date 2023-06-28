import React from "react"
import "./About.css"
import Back from "./common/back/Back"
import AboutCard from "./AboutCard"
// import TeamCard from "./TeamCard"
// import "./team.css"
import Navbare from "../Navbare";
import Footer from "../Footer";

import part1 from "../../../images/fonctionnement/img1.png";
import part2 from "../../../images/fonctionnement/img2.webp";
import part3 from "../../../images/fonctionnement/img3.webp";
import part4 from "../../../images/fonctionnement/img4.webp";
import part5 from "../../../images/fonctionnement/img5.webp";

const About = () => {
  return (
    <>
      <Navbare/>
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
      {/* <Back title='About Us' /> */}
      <AboutCard />
      <Footer/>
    </>
  )
}

export default About