
import ordi from "./img/ordi.png"
import "./DestinationStyles.css"

const Destination = () =>{
    return(
        <div className="destination">
            <h1>Photovoltaïque & Energies Vertes</h1>

            <div className="first-des">
                <div className="des-text">
                    <h2> Tall Volcano Batangas</h2>
                    <p>Lorem Ipsum ist ein einfacher Demo-Text für die Print- und Schriftindustrie. Lorem Ipsum ist in der Industrie bereits der Standard Demo-Text seit 1500, als ein unbekannter Schriftsteller eine Hand voll Wörter nahm und diese durcheinander warf um ein Musterbuch zu erstellen. Es hat nicht nur 5 Jahrhunderte überlebt, sondern auch in Spruch in die elektronische Schriftbearbeitung geschafft (bemerke, nahezu unverändert). Bekannt wurde es 1960, mit dem erscheinen von "Letraset", welches Passagen von Lorem Ipsum enhielt, so wie Desktop Software wie "Aldus PageMaker" - ebenfalls mit Lorem Ipsum</p>
                </div>
                <div className="image">
                    <img alt="img" src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"/>
                    <img alt="img" src="https://images.unsplash.com/photo-1562519990-50eb51e282b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZW9saWVubmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60"/>
                    
                </div>
            </div>
        </div>
    )
}
export default Destination