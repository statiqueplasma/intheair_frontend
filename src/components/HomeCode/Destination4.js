import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img6 from "./img/6.png";
import ordi from "./img/ordi.png";
import "./DestinationStyles.css";

const Destination = () => {
    return (
        <div className="destination">
            <h1>Immobilier</h1>

            <div className="first-des">
                <div className="image">
                    <img
                        alt="img"
                        src="https://images.unsplash.com/photo-1588557132645-ff567110cafd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFpc29uJTIwZHJvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=700&q=60"
                    />
                    <img alt="img" src={img6} />
                </div>
                <div className="des-text">
                    <h2> Dynamisez vos visites et annonces</h2>
                    <h5>Par l'ajout d'images aériennes</h5>
                    <p>
                        Les prise de vues aériennes permettent de:<br></br>-Lier
                        l'aérien au terrestre<br></br>-Valoriser l'environnement
                        autour de vos biens et lieux d'exception
                    </p>
                    <img
                        alt="img"
                        src={ordi}
                        height="150px"
                        style={{ marginLeft: "25%" }}
                    />
                    <h5>Par l'ajout d'images 360°</h5>
                    <p>
                        Les prises de vues 360° permettent de:<br></br>-Realiser
                        des visites virtuelles immergeant vos futurs clients
                        dans les biens immobiliers que vous proposez<br></br>
                        -Naviguer rapidement entre les pièces<br></br>-Se
                        délacer virtuellementà l'aide de sa souris
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Destination;
