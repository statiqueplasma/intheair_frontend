import img1 from "./img/1.jpg"
import img2 from "./img/2.jpg"
import img6 from "./img/6.png"
import ordi from "./img/ordi.png"
import "./DestinationStyles.css"

const Destination = () =>{
    return(
        <div className="destination">
            <h1 >Real estate</h1>
            
            <div className="first-des">
                <div className="image">
                    <img alt="img" src="https://images.unsplash.com/photo-1588557132645-ff567110cafd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFpc29uJTIwZHJvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60"/>
                    <img alt="img" src={img6}/>   
                </div>
                <div className="des-text">
                    <h2> Boost your visits and ads</h2>
                    <h5>By adding aerial images</h5><p>The aerial shots allow to:<br></br>-Linking the air to the ground<br></br>-Enhance the environment around your properties and exceptional places</p>
                    <img alt="img" src={ordi} height="150px" style={{ marginLeft: "25%" }}/>  
                    <h5>By adding 360° images</h5><p>The 360° shots allow to:<br></br>-Realize virtual visits immersing your future customers in the real estate you offer<br></br>-Navigate quickly between rooms<br></br>-Virtually move with your mouse</p>
                </div>
                
            </div>
        </div>
    )
}
export default Destination