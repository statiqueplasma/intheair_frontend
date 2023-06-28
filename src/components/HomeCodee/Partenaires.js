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
      
      <div className='logos'>
        
        <div className='logos-slide'>
            <img src={part1} alt='img'/>
            <img src={part2} alt='img'/>
            <img src={part3} alt='img'/>
            <img src={part4} alt='img'/>
            <img src={part5} alt='img'/>
            <img src={part6} alt='img'/>
            <img src={part7} alt='img'/>
            <img src={part8} alt='img'/>
            <img src={part9} alt='img'/>
            <img src={part10} alt='img'/>
            <img src={part11} alt='img'/>
            <img src={part12} alt='img'/>
            <img src={part13} alt='img'/>
            <img src={part14} alt='img'/>
            <img src={part15} alt='img'/>
            <img src={part16} alt='img'/>
            <img src={part17} alt='img'/>
            <img src={part18} alt='img'/>
            <img src={part19} alt='img'/>
            <img src={part20} alt='img'/>
            <img src={part21} alt='img'/>
            <img src={part22} alt='img'/>
            <img src={part23} alt='img'/>
            <img src={part24} alt='img'/>
            <img src={part25} alt='img'/>
            <img src={part26} alt='img'/>
            <img src={part27} alt='img'/>
        </div>
        <div className='logos-slide'>
            <img src={part1} alt='img'/>
            <img src={part2} alt='img'/>
            <img src={part3} alt='img'/>
            <img src={part4} alt='img'/>
            <img src={part5} alt='img'/>
            <img src={part6} alt='img'/>
            <img src={part7} alt='img'/>
            <img src={part8} alt='img'/>
            <img src={part9} alt='img'/>
            <img src={part10} alt='img'/>
            <img src={part11} alt='img'/>
            <img src={part12} alt='img'/>
            <img src={part13} alt='img'/>
            <img src={part14} alt='img'/>
            <img src={part15} alt='img'/>
            <img src={part16} alt='img'/>
            <img src={part17} alt='img'/>
            <img src={part18} alt='img'/>
            <img src={part19} alt='img'/>
            <img src={part20} alt='img'/>
            <img src={part21} alt='img'/>
            <img src={part22} alt='img'/>
            <img src={part23} alt='img'/>
            <img src={part24} alt='img'/>
            <img src={part25} alt='img'/>
            <img src={part26} alt='img'/>
            <img src={part27} alt='img'/>
            
        </div>
      </div>
      
    );
  }
  
  export default Partenaires;