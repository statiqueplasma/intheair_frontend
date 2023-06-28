import Navbaree from "./Navbaree";
import { Link, useLocation } from "react-router-dom";
import React, {useEffect} from "react";
import "./Services.css";
import Destination1 from "./Destination1";
import Destination2 from "./Destination2";
import Destination3 from "./Destination3";
import Destination4 from "./Destination4";
import Destination5 from "./Destination5";
import Footer from "./Footere";
import img4 from "./img/4.jpg";

function Services() {
    
    const location = useLocation();
  
  useEffect(() => {
    scrollToSection();
  }, [location]);
  
  function scrollToSection() {
    const hash = location.hash;
    
    if (hash) {
      const section = document.querySelector(hash);
        
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            const offset = 200; // Ajustez la valeur selon vos besoins
            const top = section.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: top - offset,
              behavior: 'smooth',
            });
      }
    }
  }
    return (
        <>
            <Navbaree />

            <section className="section bg-light border-top1">
                <div className="sectionServices">
                    <ul className="services">
                        <Link className="services-links" to="#d1">
                            <div className="case">
                                <h6 className="services-text">
                                    Green Energy & Environment
                                </h6>
                                <i className="fa-solid fa-solar-panel icone"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="#d2">
                            <div className="case">
                                <h6 className="services-text">
                                    Real Estate & Construction
                                </h6>
                                <i class="fa-solid fa-building"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="#d3">
                            <div className="case">
                                <h6 className="services-text">
                                    Precision Viticulture
                                </h6>
                                <i class="fa-solid fa-wine-bottle"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="#d4">
                            <div className="case">
                                <h6 className="services-text">Events</h6>
                                <i class="fa-solid fa-camera"></i>
                            </div>
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link className="services-links" to="#d5">
                            <div className="case">
                                <h6 className="services-text">
                                    Logistics & Shipping
                                </h6>
                                <i class="fa-solid fa-truck-fast"></i>
                            </div>
                        </Link>
                    </ul>
                </div>
            </section>
            <div id="d1">
                <Destination1 />
            </div>
            <p id="d2">
                <Destination4 />
            </p>
            <div id="d3">
                <Destination2 />
            </div>
            <div id="d4">
                <Destination5 />
            </div>
            <div id="d5">
                <Destination3 />
            </div>
            <Footer />
        </>
    );
}
export default Services;
