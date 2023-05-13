import img1 from "./img/1.jpg"
import img2 from "./img/2.jpg"
import img3 from "./img/3.jpg"
import "./DestinationStyles.css"

const Destination = () =>{
    return(
        <div className="destination">
            <h1>Viticulture de Précision</h1>
            
            <div className="first-des">
                <div className="image">
                    <img alt="img" src="https://www.lemanbleu.ch/Htdocs/Files/Videos/Pictures/11894.jpg?CacheBusterGUID=d88b132e-3801-4026-b10b-3e843308af8e"/>
                    <img alt="img" src="https://images.unsplash.com/photo-1602170284347-f9c28856f149?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHZpZ25vYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60"/>   
                </div>
                <div className="des-text">
                    {/* <h2> Tall Volcano Batangas</h2> */}
                    <h5>Notre expertise pour accompagner les domaines</h5>
                        <p>-Les données récoltées par drone et sattelite permettent d'établir:<br></br>
                            -Comptage des manquants<br></br>
                            -Evaluation du stress hydrique<br></br>
                            -Detection des maladies<br></br>
                            -Création de carte thématique<br></br>
                            -Elaboration de rapports techniques<br></br>
                        </p>
                    <h5>Notre expertise pour accompagner les vignobles</h5>
                        <p> Grace à son expertise technique dans le domaine de la mise en valeur de l'information spatiale , intheair s'occupe de structurer, et d'itégrer les données cartographique dans une application mobile.<br></br>
                            C'est un outil de décision utilisale au plus près du terrain.<br></br>
                        </p>
                </div>
                
            </div>
        </div>
    )
}
export default Destination