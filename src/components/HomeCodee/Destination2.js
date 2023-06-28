import img1 from "./img/1.jpg"
import img2 from "./img/2.jpg"
import img3 from "./img/3.jpg"
import "./DestinationStyles.css"

const Destination = () =>{
    return(
        <div className="destination">
            <h1>Precision Viticulture</h1>
            
            <div className="first-des">
                <div className="image">
                    <img alt="img" src="https://www.lemanbleu.ch/Htdocs/Files/Videos/Pictures/11894.jpg?CacheBusterGUID=d88b132e-3801-4026-b10b-3e843308af8e"/>
                    <img alt="img" src="https://images.unsplash.com/photo-1602170284347-f9c28856f149?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHZpZ25vYmxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=700&q=60"/>   
                </div>
                <div className="des-text">
                    {/* <h2> Tall Volcano Batangas</h2> */}
                    <h5>Our expertise to accompany the fields</h5>
                        <p>-The data collected by drone and satellite allow us to establish:<br></br>
                            -Counting the missing<br></br>
                            -Assessment of water stress<br></br>
                            -Disease detection<br></br>
                            -Creation of a thematic map<br></br>
                            -Elaboration of technical reports<br></br>
                        </p>
                    <h5>Notre expertise pour accompagner les vignobles</h5>
                        <p> Thanks to its technical expertise in the field of the development of spatial information, intheair takes care of structuring and integrating cartographic data into a mobile application.<br></br>
                            It is a decision-making tool that can be used as close to the field as possible.<br></br>
                        </p>
                </div>
                
            </div>
        </div>
    )
}
export default Destination