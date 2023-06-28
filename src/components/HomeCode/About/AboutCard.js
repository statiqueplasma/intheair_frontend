import React from "react"
import Heading from "./common/heading/Heading"
import "./About.css"
import { homeAbout } from "./dummydata"
import Awrapper from "./Awrapper"
import image1 from '../../../images/about.webp'

const AboutCard = () => {
  return (
    <>
      <section className='aboutHome'>
        <div className='container flexSB'>
          {/* <div className='left row'>
            <img src={image1} alt='' />
          </div> */}
          <div className='right row'>
            <Heading title='NOS MISSION' />
            {/* <h5>Intheair révolutionne l’imagerie aérienne en offrant un
                        accès facile à la captation de données
                        aériennes, leur analyse immediate, suivies de
                        recommandations concrètes.
            </h5> */}
            <div className='items'>
              {homeAbout.map((val) => {
                return (
                  <div className='item flexSB'>
                    <div className='img'>
                      {/* <img src={val.cover} alt='' /> */}
                    </div>
                    <div className='text'>
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      {/* <Awrapper /> */}
    </>
  )
}

export default AboutCard