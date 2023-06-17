import img1 from "./img/1.jpg"
import img2 from "./img/2.jpg"
import img3 from "./img/3.jpg"
import "./DestinationStyles.css"

const Destination = () =>{
    return(
        <div className="destination">
            <h1>BTP & Carrières</h1>
            
            <div className="first-des">
                <div className="des-text">
                    {/* <h2> Tall Volcano Batangas</h2> */}
                    <h5>Notre expertise dans le secteur du BTP</h5>
                    <p>-Intégration 3D/modèles 3D par photogrammétrie<br></br>
                        -Suivi de chantier<br></br>
                        -La cartographie par orthophotos géoréferencées<br></br>
                        -Diagnostique thermique des bâtiments<br></br>
                        -Inspection des pilones haute tension<br></br>
                    </p>
                    <h5>Notre expertise pour accompagner les carrières</h5>
                    <p> Les données récoltées permettent d'établir:<br></br>
                        -La cartographie topographie du terrain<br></br>
                        -Le calcul des cubatures à partir du modèle numérique du terrain<br></br>
                        -L'inspection des stocks de matériaux sur un plan en 3 dimensions<br></br>
                    </p>
                </div>
                <div className="image">
                    <img alt="img" src="https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"/>
                    <img alt="img" src="https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"/>
                    
                </div>
            </div>
        </div>
    )
}
export default Destination