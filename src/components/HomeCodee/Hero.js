import logo from "../../images/dash.webp";

import "./HeroStyles.css";
function Hero() {
    
        
    return (
        <>
            <div className="hero">
                <img alt="HeroImg" className="hero-image" src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" />
            </div>
            <div className="hero-text">
                <h1>Aerial imagery finally accessible for all businesses.</h1>
                <p>Order your mission in a few clicks and receive your analysis report.</p>
            </div>
        </>
    );
} 
export default Hero;