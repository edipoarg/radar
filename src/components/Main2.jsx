import React from 'react';
import './Main2.css'
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";


export default function Main2() {


  return (

    <div id="main2-content">


      <div id="Main2">


        <div id="franja1">

          <div id='reportaMain'>
            <h1 id='tituloReportaMain'>Reportá</h1>

            <h4 className='bajada'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non doloribus odit labore perferendis!</h4>
            <button id="botonReportaMain"><a href="">ingresar</a></button>
          </div>

          <div id='botonMain2'>

            <button id='botonMain2'><a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg><h5>mapa</h5></a></button>

          </div>

        </div>

        <div id='separadorMain'>
          <div id='bloqueI'></div>
          <div id='bloqueD'></div>
        </div>

        <div id='franja2'>

          <div id='notasMain'>

            <h1 id='tituloNotasMain'>Notas</h1>

            <h4 className='bajada'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, distinctio tempora! Esse perspiciatis eius praesentium?</h4>
            <button id="botonNotasMain"><a href="">ver</a></button>

          </div>


          <div id='botoneraMain'>

            <div id='contactoMain'>
              <h2 id='conectaTitle'>Conectá</h2>
              <p id='conectaText'>Conocé más sobre RADAR</p>
              <button id="botonConectaMain" ><a href="">Ir</a></button>
            </div>

            <div id='analisisMain'>
              <h3 id='analisisTextMain'>Analisis y estadisticas</h3>
              <button id="botonAnalisisMain"><a href=""><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg></a></button>
            </div>
          </div>


        </div>




      </div>
     </div> );
}

