import React from 'react';
import './analisis.css'
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";


export default function Analisis({min, max, total, tipos, componentes}) {
  return (
    <div id="analisis">

    <div id='fondoAnalisisImg'> <img src="radarPuntos.png" alt="" /></div>


    <div id="analisisHeader">

    <div id='analisisTituloSec'>
    <h4 id='tituloAnalisisRadar'>REGISTRO DE ATAQUES <br /> DE DERECHAS ARGENTINAS RADICALIZADAS
    </h4>
    <h1 id='tituloAnalisis'>RELEVAMIENTO
    {min.getFullYear()} - {max.getFullYear()}
    </h1>
    <h4 id='analisisCasos'> {total} CASOS</h4>
    <h4 id='analisisCasosBajada'>organizados por sus narrativas de odio

    </h4>

    </div>

    <div id='analisisImg'>
    </div>

    </div>

    <div id='analisisDatos'>
    {Object.keys(tipos.byName).map((t, i) => (
      <div id='datos1'>
        <h1 id='datoN1'>{tipos.byName[t].length}</h1>
        <div className='info'>
          <div className='barra'></div>
          <p className='textAnalisis'>{t}</p>
        </div>
      </div>
    ))}
    {Object.keys(componentes.byName).map(t => (
      <div id='datos2'>
        <h1 id='datoN2'>{componentes.byName[t].length}</h1>
        <div className='info'>
          <div className='barra'></div>
          <p className='textAnalisis'>{t}</p>
        </div>
      </div>
    ))}
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
      <button id='subir'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
      </svg></button>
    </ScrollLink>
    </div>
  );
}

