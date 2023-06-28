import React from 'react'
import CountUp from 'react-countup'
import "./Chiffres.css";
import { Row } from 'react-bootstrap';
import Video from "../../images/video.mp4";

function Chiffres() {
  return (
    <div >
        <section className="background-section">
  <video className="background-video" autoPlay loop muted>
    <source src={Video} type="video/mp4" />
    Votre navigateur ne prend pas en charge la lecture de vidéos.
  </video>
  <h1 className='title'>Intheair en Quelques Chiffres</h1>
        <div className='chiffresSection1'>
            <div className='flexCenter stats'>
                <div className='flexColCenter stat'>
                    <span>
                        <CountUp start={0} end={3} duration={4}/>
                        <span>+</span>
                    </span>
                    <br/>
                    <span className='secondarytext'>Prix Start-Up Innovante</span>
                </div>
            </div>
            
            <div className='flexCenter stats'>
                <div className='flexColCenter stat'>
                    <span>
                        <CountUp start={20} end={50} duration={4}/>
                        <span>+</span>
                    </span>
                    <br/>
                    <span className='secondarytext'>Clients</span>
                </div>
            </div>
            <div className='flexCenter stats'>
                <div className='flexColCenter stat'>
                    <span>
                        <CountUp start={25} end={60} duration={4}/>
                        <span>+</span>
                    </span>
                    <br/>
                    <span className='secondarytext'>Missions</span>
                </div>
            </div>
            <div className='flexCenter stats'>
                <div className='flexColCenter stat'>
                    <span>
                        <CountUp start={150} end={200} duration={4}/>
                        <span>+</span>
                    </span>
                    <br/>
                    <span className='secondarytext'>Télépilotes Partenaires</span>
                </div>
            </div>
        </div>

        <br/><br/>
        
        <div className='chiffresSection2'>
            <div className='flexCenter stats'>
                <div className='flexColCenter stat'>
                    {/* <span>
                        <CountUp start={150} end={200} duration={4}/>
                        <span>+</span>
                    </span>
                    <br/>
                    <span className='secondarytext'>Télépilotes Partenaires</span> */}
                </div>
            </div>
            <div className='flexCenter stats'>
                <div className='flexColCenter stat'>
                    <span>
                        <CountUp start={150} end={200} duration={4}/>
                        <span>+</span>
                    </span>
                    <br/>
                    <span className='secondarytext'>Télépilotes Partenaires</span>
                </div>
            </div>
            
            <div className='flexCenter stats'>
                <div className='flexColCenter stat'>
                    <span>
                        <CountUp start={890} end={1000} duration={4}/>
                        <span>+</span>
                    </span>
                    <br/>
                    <span className='secondarytext'>Hectars Couverts</span>
                </div>
            </div>
            <div className='flexCenter stats'>
                <div className='flexColCenter stat'>
                    <span>
                        <CountUp start={75800} end={80000} duration={4}/>
                        <span>+</span>
                    </span>
                    <br/>
                    <span className='secondarytext'>Montant bourse frenchtech immergeance</span>
                </div>
            </div>
            
        </div>
    
</section>
</div>        
  )
}

export default Chiffres
