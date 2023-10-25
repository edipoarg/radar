import React from 'react';
import './analisis.css'
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";


export default function analisis() {


  return (


    <div id="analisis">

      <div id='fondoAnalisisImg'> <img src="radarPuntos.png" alt="" /></div>


      <div id="analisisHeader">

        <div id='analisisTituloSec'>
          <h4 id='tituloAnalisisRadar'>REGISTRO DE ATAQUES <br /> DE DERECHAS ARGENTINAS RADICALIZADAS
          </h4>
          <h1 id='tituloAnalisis'>RELEVAMIENTO
            2020 - 2023
          </h1>
          <h4 id='analisisCasos'> 190 CASOS</h4>
          <h4 id='analisisCasosBajada'>organizados por sus narrativas de odio

          </h4>

        </div>

        <div id='analisisImg'>
        </div>

      </div>

      <div id='analisisDatos'>

        <div id='datos1'>
          <h1 id='datoN1'>98</h1>
          <div class='info'>
            <div class='barra'></div>
            <p class='textAnalisis'>contra identidades políticas </p>
          </div>
        </div>
        <div id='datos2'>
          <h1 id='datoN2'>69</h1>
          <div class='info'>
            <div class='barra'></div>
            <p class='textAnalisis'>negacionismo <br /> y apología a la dictadura </p>
          </div>
        </div>
        <div id='datos3'>
          <h1 id='datoN3'>56</h1>
          <div class='info'>
            <div class='barra'></div>
            <p class='textAnalisis'> misoginia, antifeminismo <br /> y antiLGBTINBQ+</p>
          </div>
        </div>
        <div id='datos4'>
          <h1 id='datoN4'>27</h1>
          <div class='info'>
            <div class='barra'></div>
            <p class='textAnalisis'>nazismo, antisemitismo <br /> y supremacismo</p>
          </div>
        </div>
        <div id='datos5'>
          <h1 id='datoN5'>18</h1>
          <div class='info'>
            <div class='barra'></div>
            <p class='textAnalisis'>racismo y xenofobia</p>
          </div>

        </div>




      </div>


<h3 id='enConstruccion'>RADAR es una herramienta dinámica en construcción.</h3>


      <h4 id='analisisTextoFinal'>
        
      En esta primera etapa se visualizan hechos geolocalizables del período 2020-2023 pero se encuentra abierta a recibir reportes fuera de ese marco espacio-temporal.
      </h4>

      <h6 id='aclaracionAnalisis'>        *Las narrativas no son excluyentes. Algunos casos abarcan más de una.
</h6>
      <ScrollLink
        to="App"
        spy={true} // Activa el modo espía
        smooth={true} // Activa el desplazamiento suave
        duration={500} // Duración de la animación (en milisegundos)
        offset={-70} // Ajusta un offset opcional (si tienes un encabezado fijo)
      >
        <button id='subir'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg></button>
      </ScrollLink>






    </div>
  );
}

