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

<h2 id='dx'>Desarrollado x</h2>
<h6 id='desarrolladoX'> <a id='LS' href="mailto:lidiadorsinay@gmail.com">Lidiador Sinay <img id='logoLS' src="logoLS.png" alt="" /></a></h6>


</div>
</div>


  );
}
