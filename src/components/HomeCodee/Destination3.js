import img1 from "./img/1.jpg"
import img2 from "./img/2.jpg"
import img3 from "./img/3.jpg"
import "./DestinationStyles.css"

const Destination = () =>{
    return(
        <div className="destination">
            <h1 >Construction & Careers</h1>
            
            <div className="first-des">
                <div className="des-text">
                    {/* <h2> Tall Volcano Batangas</h2> */}
                    <h5>Our expertise in the construction sector</h5>
                    <p>-3D integration / 3D models by photogrammetry<br></br>
                        -Follow-up of the construction site<br></br>
                        -Georeferenced orthophoto mapping<br></br>
                        -Thermal diagnosis of buildings<br></br>
                        -Inspection of high voltage pylons<br></br>
                    </p>
                    <h5>Our expertise in supporting careers</h5>
                    <p> The data collected allows us to establish:<br></br>
                        -Topographical mapping of the terrain<br></br>
                        -The calculation of the cubatures from the digital terrain model<br></br>
                        -Inspection of material stocks on a 3-dimensional plan<br></br>
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