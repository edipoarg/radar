import React from 'react';
import './analisis.css'
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

export default function analisis() {


  return (


    <div id="analisis">


      <div id="analisisHeader">

        <div id='analisisTitulo'>
          <h4>Registro de Ataques de Derechas Argentinas Radicalizadas
          </h4>
          <h1 id='tituloAnalisis'>RELEVAMIENTO
            2020 - 2023
          </h1>
          <h4 id='analisisCasos'>149 CASOS</h4>
          <h4 id='analisisCasosBajada'>agrupados por sus narrativas*

          </h4>

        </div>

        <div id='analisisImg'>
        </div>

      </div>

      <div id='analisisDatos'>

        <div id='datos1'>
          <h1 id='datoN1'>58</h1>
          <div class='info'>
            <div class='barra'></div>
            <p class='textAnalisis'>negacionismo y apología a la dictadura</p>
          </div>
        </div>
        <div id='datos2'>
          <h1 id='datoN2'>80</h1>
          <div class='info'>
            <div class='barra'></div>
            <p class='textAnalisis'>contra identidades políticas </p>
          </div>
        </div>
        <div id='datos3'>
          <h1 id='datoN3'>21</h1>
          <div class='info'>
            <div class='barra'></div>
            <p class='textAnalisis'>nazismo, antisemitismo y supremacismo</p>
          </div>
        </div>
        <div id='datos4'>
          <h1 id='datoN4'>29</h1>
          <div class='info'>
            <div class='barra'></div>
            <p class='textAnalisis'>misoginia, antifeminismo y antiLGBTINBQ+</p>
          </div>
        </div>
        <div id='datos5'>
          <h1 id='datoN5'>11</h1>
          <div class='info'>
            <div class='barra'></div>
            <p class='textAnalisis'>racismo y xenofobia</p>
          </div>

        </div>




      </div>

      <h4 id='analisisTextoFinal'>RADAR es una herramienta dinámica en construcción.
        <br />
        <br />
        En esta primera etapa se visualizan hechos del período 2020-2023 que puedan ser geolocalizados pero se encuentra abierta a recibir reportes fuera de ese marco espacio-temporal.
        <br />
        <br />
        *Las narrativas no son excluyentes: algunos casos abarcan más de una.

      </h4>
      <ScrollLink
        to="App"
        spy={true} // Activa el modo espía
        smooth={true} // Activa el desplazamiento suave
        duration={500} // Duración de la animación (en milisegundos)
        offset={-70} // Ajusta un offset opcional (si tienes un encabezado fijo)
      >
        <button id='subir'><a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
          <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
        </svg></a></button>
      </ScrollLink>






    </div>
  );
}

