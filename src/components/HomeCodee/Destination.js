import img1 from "./img/1.jpg"
import img5 from "./img/5.jpg"
import img3 from "./img/3.jpg"
import "./DestinationStyles1.css"

const Destination = () =>{
    return(
        <div className="destination">
            <h1>Our customers talk about it best </h1>
            

            <div className="first-des">
                <div className="des-text1">
                    
                    <p>Beyond the professionalism of the intheair team, they have been able to bring added value to our photovoltaic power plant operation through personalized and above all proactive support.</p>
                    <br></br>
                    <h5>Abderrhamane Belouard, CEO DAISUN</h5>
                    <img alt="img" src="https://static.wixstatic.com/media/38f406_23bfe8a607b5418f8a34afc1d952f50a~mv2.jpeg/v1/fill/w_157,h_73,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Daisun.jpeg"/>
                </div>
                <div className="image1">
                    <img alt="img" src="https://media.licdn.com/dms/image/C4E03AQFaGCzllaBgmg/profile-displayphoto-shrink_800_800/0/1659373148361?e=1689811200&v=beta&t=2hAZMZ0Clxfg2xvgKMJMRbBB6vAhVLvmCzlZRdFDDmw"/>
                    {/* <img alt="img" src="https://images.unsplash.com/photo-1562519990-50eb51e282b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZW9saWVubmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60"/> */}
                    
                </div>
            </div>
        </div>
    )
}
export default Destination