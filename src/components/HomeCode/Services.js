import Navbare from "./Navbare";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import "./Services.css";
import Destination1 from "./Destination1";
import Destination2 from "./Destination2";
import Destination3 from "./Destination3";
import Destination4 from "./Destination4";
import Destination5 from "./Destination5";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import img4 from "./img/4.jpg";

function Services() {
    const location = useLocation();

    useEffect(() => {
        scrollToSection();
        AOS.init();
    }, [location]);

    function scrollToSection() {
        const hash = location.hash;

        if (hash) {
            const section = document.querySelector(hash);

            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
                const offset = 200; // Ajustez la valeur selon vos besoins
                const top =
                    section.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: top - offset,
                    behavior: "smooth",
                });
            }
        }
    }
    return (
        <>
            <Navbare />

            <section className="section bg-light border-top1">
                <div className="sectionServices">
                    <ul className="services">
                        <Link className="services-links" to="#d1">
                            <div className="case">
                                <h6 className="services-text">
                                    Energies Vertes & Environnement
                                </h6>
                                <i className="fa-solid fa-solar-panel icone"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="#d2">
                            <div className="case">
                                <h6 className="services-text">
                                    Immobilier & BTP
                                </h6>
                                <i class="fa-solid fa-building"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="#d3">
                            <div className="case">
                                <h6 className="services-text">
                                    Viticulture de Précision
                                </h6>
                                <i class="fa-solid fa-wine-bottle"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="#d4">
                            <div className="case">
                                <h6 className="services-text">Evènementiel</h6>
                                <i class="fa-solid fa-camera"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="#d5">
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

            <section
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-duration="1000"
            >
                <div id="d1">
                    <Destination1 />
                </div>
            </section>

            <section
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-duration="1000"
            >
                <div id="d2">
                    <Destination4 />
                </div>
            </section>
            <section
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-duration="1000"
            >
                <div id="d3">
                    <Destination2 />
                </div>
            </section>
            <section
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-duration="1000"
            >
                <div id="d4">
                    <Destination5 />
                </div>
            </section>
            <section
                data-aos="fade-up"
                data-aos-offset="200"
                data-aos-duration="1000"
            >
                <div id="d5">
                    <Destination3 />
                </div>
            </section>
            <Footer />
        </>
    );
}
export default Services;
