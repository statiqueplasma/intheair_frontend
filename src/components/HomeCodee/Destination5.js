import img1 from "./img/1.jpg"
import img2 from "./img/2.jpg"
import img3 from "./img/3.jpg"
import "./DestinationStyles.css"

const Destination = () =>{
    return(
        <div className="destination">
            <h1 >Events</h1>

            <div className="first-des">
                <div className="des-text">
                    <p> <h4>Virtual and immersive tours</h4><p>The virtual tour allows you to visit places dedicated to culture, tourism or trade quickly and from home, to make them more accessible.</p>
                        <h4>Shooting and video clips</h4><p>Photo and video shots to cover an event perfectly<br></br><br></br>Perfect visuals for your communication and for highlighting sports, cultural, festive and other events.</p>
                        <h4>Enhancement of the heritage</h4><p>The 3D modeling of buildings allows to print them as a large format model<br></br><br></br>The development by drone makes it possible to carry out visuals favourable with the tourist communication of the captured places or monuments</p>
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