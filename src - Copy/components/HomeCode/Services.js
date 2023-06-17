import Navbare from "./Navbare";
import { Link } from "react-router-dom";
import "./Services.css";
import Destination from "./Destination";
import Destination2 from "./Destination2";
import Destination3 from "./Destination3";
import Destination4 from "./Destination4";
import Destination5 from "./Destination5";
import Footer from "./Footer";
import img4 from "./img/4.jpg";

function Services() {
    return (
        <>
            <Navbare />

            <section className="section bg-light border-top1">
                <div className="sectionServices">
                    <ul className="services">
                        <Link className="services-links" to="/#d2">
                            <div className="case">
                                <h6 className="services-text">
                                    Energies Vertes & Environnement
                                </h6>
                                <i className="fa-solid fa-solar-panel icone"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="/">
                            <div className="case">
                                <h6 className="services-text">
                                    Immobilier & BTP
                                </h6>
                                <i class="fa-solid fa-building"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="/">
                            <div className="case">
                                <h6 className="services-text">
                                    Viticulture de Précision
                                </h6>
                                <i class="fa-solid fa-wine-bottle"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="/">
                            <div className="case">
                                <h6 className="services-text">Evènementiel</h6>
                                <i class="fa-solid fa-camera"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="/">
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
            <div id="d1">
                <Destination />
            </div>
            <p id="d2">
                <Destination2 />
            </p>
            <div id="d3">
                <Destination3 />
            </div>
            <div id="d4">
                <Destination4 />
            </div>
            <div id="d5">
                <Destination5 />
            </div>
            <Footer />
        </>
    );
}
export default Services;
