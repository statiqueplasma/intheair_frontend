import logo from "../../images/dash.webp";

import "./HeroStyles.css";
function Hero() {
    
        
    return (
        <>
            <div className="hero">
                <img alt="HeroImg" className="hero-image" src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" />
            </div>
            <div className="hero-text">
                <h1>L'imagerie aérienne enfin accessible pour toutes les entreprises.</h1>
                <p>Commandez votre mission en quelques clics et recevez votre rapport d'analyse.</p>
            </div>
        </>
    );
} 
export default Hero;