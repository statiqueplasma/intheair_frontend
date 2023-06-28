import major from "../../images/Major.jpg";

import "./HeroStyles.css";
function Hero() {
    return (
        <div className="herosec">
            <div className="hero">
                <img alt="HeroImg" className="hero-image" src={major} />
            </div>
            <div className="hero-text">
                <h1>
                    L'imagerie aérienne enfin accessible pour toutes les
                    entreprises.
                </h1>
                <p>
                    Commandez votre mission en quelques clics et recevez votre
                    rapport d'analyse.
                </p>
            </div>
        </div>
    );
}
export default Hero;
