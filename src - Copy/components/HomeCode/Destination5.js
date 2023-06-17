import img1 from "./img/1.jpg"
import img2 from "./img/2.jpg"
import img3 from "./img/3.jpg"
import "./DestinationStyles.css"

const Destination = () =>{
    return(
        <div className="destination">
            <h1>Evènementiel</h1>
            <p>Tours Gives You The Oportunity</p>

            <div className="first-des">
                <div className="des-text">
                    <p> <h4>Visites Virtuelles et immersives</h4><p>La visite virtuelle permet de visiter des lieux dédiés à la culture aux tourisme ou au commerce rapidement et depuis chez soi, afin de les rendre plus accessibles.</p>
                        <h4>Prise de vues et vidéoclips</h4><p>Ds prises de vues photo et vidéo pour couvrir parfaitement un évènement<br></br><br></br>Des visuels parfait pour votre communicationet pour la mise en valeur d'évènements sportifs, culturels, festifs et autres.</p>
                        <h4>Mise en valeur du patrimoine</h4><p>La modélisation 3D de batiments permet de les imprimer sous forme de maquette grand format<br></br><br></br>La mise en valeur par drone permet de réaliser des visuels propices à la communication touristiques des lieux ou des monuments capturés</p>
                    </p>
                </div>
                <div className="image">
                    <img alt="img" src={img2}/>
                    <img alt="img" src={img1}/>
                    
                </div>
            </div>
        </div>
    )
}
export default Destination