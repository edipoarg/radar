import React from 'react';
import './Main2.css'
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { Link } from 'react-router-dom';


export default function Main2() {


  return (



      <div id="Main2">

<div id="franja1">
<div id='reportaMain'>
<h4 id='bajadaPrincipal'> <span id='negritaTitulo'> RADAR (Registro de Ataques de Derechas Argentinas Radicalizadas)</span>  es un proyecto periodístico colaborativo impulsado por el Equipo de Investigación Política (EdIPo) de la Revista Crisis, con apoyo del Centro de Estudios Legales y Sociales (CELS), cuyo objetivo es fortalecer la democracia y la defensa de los derechos humanos.
Presentamos un mapeo de ataques políticos protagonizados por derechas radicalizadas con el fin de contribuir al diagnóstico colectivo y la elaboración de estrategias de autocuidado.</h4>
  <Link to= "/conecta"> <button id="botonReportaMain">NOSOTRXS</button></Link>



</div>


<ScrollLink
    to="App"
    spy={true} // Activa el modo espía
    smooth={true} // Activa el desplazamiento suave
    duration={500} // Duración de la animación (en milisegundos)
    offset={-70} // Ajusta un offset opcional (si tienes un encabezado fijo)
  >
    <button id='botonMain2'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
    </svg><h5 id='botonMapaText'>mapa</h5></button>
  </ScrollLink></div>

 

 

<div id='separadorMain'>
          <div id='bloqueI'></div>
          <div id='bloqueD'></div>
        </div>

        <div id='franja2'>

          <div id='notasMain'>

            <h1 id='tituloNotasMain'>Informe a un año del atentado a CFK</h1>
            <h4 className='autorNotaMain'>Por el Equipo de Investigación Política (EdIPo)
            </h4>
            <button id="botonNotasMain"><a href="https://informes.revistacrisis.com.ar/la-violencia-avanza-1s/" target="_blank">ver</a></button>

          </div>


          <div id='botoneraMain'>

            <div id='contactoMain'>
              <h2 id='conectaTextMain'>Colaborá en la construcción de una fuente de información pública sobre agresiones de derechas argentinas radicalizadas.</h2>
              <button id="botonConectaMain" ><a href="https://docs.google.com/forms/d/e/1FAIpQLSe5pKXuvkvSUiwI_YEq5OZrfXCmpcsDuz_6co_iS2Qags80_A/viewform" target="_blank" rel="noopener noreferrer"><h2 id='reportaBotonText'>REPORTÁ UN HECHO</h2></a></button>
            </div>

            <div id='analisisMain'>
              <div id='analisisTextComp'><h3 id='analisisTextMain'>Relevamiento</h3> <h6 id='analisisAnios'> 2020 - 2023</h6></div>
              <ScrollLink
                to="analisis"
                spy={true} // Activa el modo espía
                smooth={true} // Activa el desplazamiento suave
                duration={500} // Duración de la animación (en milisegundos)
                offset={-70} // Ajusta un offset opcional (si tienes un encabezado fijo)
              >
                <button id="botonAnalisisMain"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg></button>
              </ScrollLink>
            </div>
          </div>


        </div>
      



    </div>);
}

