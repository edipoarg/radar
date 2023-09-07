import * as React from "react";
import { Link } from "react-router-dom";
import './footer.css';
import { motion } from "framer-motion"
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

export default function NavbarBootstrap() {
  return (
    <div className="footerContainer">
     

<div id='logosFooter'>
    <h6>RADAR ES UN PROYECTO DE</h6>

<div id='logosContainer'></div>
<div  id='edipo'> <img id='edipoLogo'
src="" alt="" /></div>

<div  id='cisis'> <img id='crisisLogo'
src="" alt="" /></div>

<div  id='cels'> <img id='celsLogo'
src="" alt="" /></div>


</div>

<div id='Desarrollo'>

<h6>DESARROLLADO X <a href="">Lidiador Sinay</a></h6>


</div>



   
    </div>


  );
}
