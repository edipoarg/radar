import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './notas.css';
import { Carousel } from 'react-bootstrap';
import RadarMotion from './radarMotion';
import Button from 'react-bootstrap/Button';

export default function Notas() {
  return (

    <div id='notas'>

      <Carousel id='notasContainer'>
        <Carousel.Item>
          <div class='notasItemContainer'>
            <h2 className='tituloNota'>Informe a un año del atentado a CFK
            </h2>
            <h4 className='bajadaNota'>Por el Equipo de Investigación Política (EdIPo)
            </h4>
            <h4 className='autorNota'>
            </h4>
            <button className="botonNotas" ><a href="http://informes.revistacrisis.com.ar/la-violencia-avanza-1s/" target="_blank" rel="noopener noreferrer">Ir</a></button>

          </div>
        </Carousel.Item >
        <Carousel.Item>
          <div class='notasItemContainer'>

            <h2 className='tituloNota'>Otras Investigaciones
            </h2>

            <button className="botonNotas" ><a href="http://revistacrisis.com.ar/autores/equipo-de-investigacion-politica-edipo" target="_blank" rel="noopener noreferrer">Ir</a></button>

          </div>

        </Carousel.Item>


      </Carousel>
    </div>
  );
}