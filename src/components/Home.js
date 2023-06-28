import { React } from "react";
import { Link } from "react-router-dom";
import img4 from "./HomeCode/img/4.jpg";
import "./HomeCode/Home.css";

import Hero from "./HomeCode/Hero";
import Footer from "./HomeCode/Footer";
import Destination from "./HomeCode/Destination";
import Partenaires from "./HomeCode/Partenaires";
import Navbare from "./HomeCode/Navbare";
import Chiffres from "./HomeCode/Chiffres";
function Home() {
    return (
        <div className="backgnd">
            <Navbare />
            <Hero />
            <Chiffres />
            <section className="section bg-light border-top">
                <h1 className="servicesTitres">Nos Services</h1>
                <div className="sectionServices">
                    <ul className="services">
                        <Link className="services-links" to="services#d1">
                            <div className="case">
                                <h6 className="services-text">
                                    Energies Vertes & Environnement
                                </h6>
                                <i className="fa-solid fa-solar-panel icone"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="services#d2">
                            <div className="case">
                                <h6 className="services-text">
                                    Immobilier & BTP
                                </h6>
                                <i class="fa-solid fa-building"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="services#d3">
                            <div className="case">
                                <h6 className="services-text">
                                    Viticulture de Précision
                                </h6>
                                <i class="fa-solid fa-wine-bottle"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="services#d4">
                            <div className="case">
                                <h6 className="services-text">Evènementiel</h6>
                                <i class="fa-solid fa-camera"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="services#d5">
                            <div className="case">
                                <h6 className="services-text">
                                    Logistique & Shipping
                                </h6>
                                <i class="fa-solid fa-truck-fast"></i>
                            </div>
                        </Link>
                    </ul>
                </div>
            </section>
            <Destination />
            <div className="contact-section">
                <div>
                    <img alt="HeroImg" className="contact-image" src={img4} />
                </div>
                <div className="contact-text">
                    <h1>Vous avez un projet ? Parlons-en !</h1>
                    <p>
                        Nous serions ravi d’échanger sur votre projet. Notre
                        équipe commerciale et technique peut également vous
                        conseiller sur votre projet
                    </p>
                    <a href="/login" className="contact-button">
                        Contactez-nous
                    </a>
                </div>
            </div>
            <Partenaires />

            <Footer />
        </div>
    );
}

export default Home;
