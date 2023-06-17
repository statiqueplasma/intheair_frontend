import "./FooterStyles.css"
import logo from "../../images/logoBlanc.webp";
import { Link } from "react-router-dom";

function Footer() {
    
        
    return (
        <div className="footer">
            <div className="top">
                <div>
                <img className="logo" src={logo}/>
                    {/* <p>Coose Your Favourite Destination</p> */}
                </div>
            <div>
                <Link to="/">
                                        
                </Link>
                <a href="/">
                    <i className="fa-brands fa-facebook-square"></i>
                </a>
                <a href="/">
                    <i className="fa-brands fa-instagram-square"></i>
                </a>
                <a href="/">
                    <i className="fa-brands fa-twitter-square"></i>
                </a>
                <a href="/">
                    <i className="fa-brands fa-linkedin"></i>
                </a>
            </div>
            </div>
            <div className="bottom">
                <div>
                    <h3>Contact</h3>
                    <a href="/"><i class="fa-solid fa-phone"></i> 06 99 16 39 91</a>
                    <a href="/"><i class="fa-solid fa-envelope"></i> mail@intheair.tech</a>
                    <a href="/"><i class="fa-solid fa-location-dot"></i> 6 rue de marseille</a>
                </div>

                <div>
                    <h3>Aide</h3>
                    <Link to="/faq">FAQ</Link>
                    {/* <a href="/faq"></a> */}
                    <a href="/">Status</a>
                    <a href="/">License</a>
                    <a href="/">All Versions</a>
                </div>

                <div>
                    <h3>Help</h3>
                    <a href="/">Changelog</a>
                    <a href="/">Status</a>
                    <a href="/">License</a>
                    <a href="/">All Versions</a>
                </div>

                <div>
                    <h3></h3>
                    <a href="/">Politique de confidentialité</a>
                    <br></br>
                    <a href="/">Mentions Légales</a>
                    <br></br>
                    <a href="/">Gestion des cookies</a>
                    
                </div>
            </div>
        </div>
    );
} 
export default Footer;