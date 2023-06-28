import { React } from "react";
import { Link } from "react-router-dom";
import img4 from "./HomeCodee/img/4.jpg"
import "./HomeCodee/Home.css";

import Hero from "./HomeCodee/Hero";
import Footere from "./HomeCodee/Footere";
import Destination from "./HomeCodee/Destination";
import Partenaires from "./HomeCodee/Partenaires";
import Navbaree from "./HomeCodee/Navbaree";
function Home() {
    
        
    return (
        <>
        <Navbaree/>
            <Hero/>
            <section className="section bg-light border-top" >
                <h1 className="servicesTitres">Our Services</h1>
                <div className="sectionServices">
                
                    <ul className="services">
                        <Link  className="services-links" to="services#d1"> 
                            <div className="case">
                                <h6 className="services-text">Green Energy & Environment</h6>
                                <i className="fa-solid fa-solar-panel icone"></i>
                            </div>                           
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link  className="services-links" to="services#d2"> 
                            <div className="case">
                                <h6 className="services-text">Real Estate & Construction</h6>
                                <i class="fa-solid fa-building"></i>
                            </div>                           
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link  className="services-links" to="services#d3"> 
                            <div className="case">
                                <h6 className="services-text">Precision Viticulture</h6>
                                <i class="fa-solid fa-wine-bottle"></i>
                            </div>                           
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link  className="services-links" to="services#d4"> 
                        <div className="case">
                            <h6 className="services-text">Events</h6>
                            <i class="fa-solid fa-camera"></i>
                        </div>                           
                        </Link>
                    </ul>
                    <ul className="services">
                        <Link  className="services-links" to="services#d5"> 
                            <div className="case">
                                <h6 className="services-text">Logistics & Shipping</h6>
                                <i class="fa-solid fa-truck-fast"></i>
                            </div>                           
                        </Link>
                    </ul>
                </div>
            </section>
            <Destination/>
            <div className="contact-section" >
                
                <div >
                    <img alt="HeroImg" className="contact-image" src={img4} />
                </div>
                <div className="contact-text">
                    <h1>Do you have a project? Let's talk about it!</h1>
                    <p>We would be delighted to discuss your project. Our sales and technical team can also advise you on your project</p>
                    <a href="/login" className="contact-button">
                        Contact-us
                    </a>
                </div>
            </div>
            <Partenaires/>
            <Footere/>
        </>
    );
} 
export default Home;
