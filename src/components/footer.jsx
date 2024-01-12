import * as React from "react";
import { Link } from "react-router-dom";
import './footer.css';
import { motion } from "framer-motion"
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

export default function footer() {
  return (

<div id='footer'>

<div id='espacioVacioFooter'></div>

<div id='Desarrollo'>

<h6 id='desarrolladoX'> Desarrollado x <a id='edipo' href="http://investigacionpolitica.com"> [ EdIPo ] </a></h6>


</div>
</div>


  );
}
