import { useState } from 'react';
import {Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PartenairesStyles.css"

import part1 from "../../images/Partenaires/part1.webp";
import part2 from "../../images/Partenaires/part2.webp";
import part3 from "../../images/Partenaires/part3.webp";
import part4 from "../../images/Partenaires/part4.webp";
import part5 from "../../images/Partenaires/part5.webp";
import part6 from "../../images/Partenaires/part6.webp";
import part7 from "../../images/Partenaires/part7.webp";
import part8 from "../../images/Partenaires/part8.webp";
import part9 from "../../images/Partenaires/part9.webp";
import part10 from "../../images/Partenaires/part10.webp";
import part11 from "../../images/Partenaires/part11.webp";
import part12 from "../../images/Partenaires/part12.webp";
import part13 from "../../images/Partenaires/part13.webp";
import part14 from "../../images/Partenaires/part14.webp";
import part15 from "../../images/Partenaires/part15.webp";
import part16 from "../../images/Partenaires/part16.png";
import part17 from "../../images/Partenaires/part17.png";
import part18 from "../../images/Partenaires/part18.png";
import part19 from "../../images/Partenaires/part19.webp";
import part20 from "../../images/Partenaires/part20.png";
import part21 from "../../images/Partenaires/part21.png";
import part22 from "../../images/Partenaires/part22.jpg";
import part23 from "../../images/Partenaires/part23.png";
import part24 from "../../images/Partenaires/part24.png";
import part25 from "../../images/Partenaires/part25.png";
import part26 from "../../images/Partenaires/part26.png";
import part27 from "../../images/Partenaires/part27.png";

import img1 from "../../images/acc1/img1.webp";
import img2 from "../../images/acc1/img2.webp";
import img3 from "../../images/acc1/img3.webp";
function Partenaires() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
            <>
                
                <div className="sectionPartenaires">
                
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part1} className="partenaires-images" />                          
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part2} className="partenaires-images" />                        
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part3} className="partenaires-images" />                           
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part4} className="partenaires-images" />                           
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part6} className="partenaires-images" />                           
                        </div>
                    </ul>
                </div>
            </>
        </Carousel.Item>
        
        
        <Carousel.Item>
        <>
                
                <div className="sectionPartenaires">
                
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part7} className="partenaires-images" />                          
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part8} className="partenaires-images" />                        
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part9} className="partenaires-images" />                           
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part10} className="partenaires-images" />                           
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part11} className="partenaires-images" />                           
                        </div>
                    </ul>
                </div>
            </>
        </Carousel.Item>

        <Carousel.Item>
        <>
                
                <div className="sectionPartenaires">
                
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part12} className="partenaires-images" />                          
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part13} className="partenaires-images" />                        
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part14} className="partenaires-images" />                           
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part15} className="partenaires-images" />                           
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part7} className="partenaires-images" />                           
                        </div>
                    </ul>
                </div>
            </>
        </Carousel.Item>

        {/* <Carousel.Item>
            <>
                
                <div className="sectionPartenaires">
                
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part26} className="partenaires-images" />                          
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part17} className="partenaires-images" />                        
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part18} className="partenaires-images" />                           
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part19} className="partenaires-images" />                           
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part20} className="partenaires-images" />                           
                        </div>
                    </ul>
                </div>
            </>
        </Carousel.Item>

        <Carousel.Item>
            <>
                
                <div className="sectionPartenaires">
                
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part21} className="partenaires-images" />                          
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part22} className="partenaires-images" />                        
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part23} className="partenaires-images" />                           
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part24} className="partenaires-images" />                           
                        </div>
                    </ul>
                    <ul className="partenaires">
                        <div  className="partenaires-case"> 
                            <img alt="img" src={part25} className="partenaires-images" />                           
                        </div>
                    </ul>
                </div>
            </>
        </Carousel.Item> */}
      </Carousel>
    );
  }
  
  export default Partenaires;