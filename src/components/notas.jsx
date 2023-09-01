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
            <h2 className='tituloNota'>La violencia avanza
            </h2>
            <h4 className='bajadaNota'>Informe a un año del atentado a CFK
            </h4>
            <h4 className='autorNota'>Por el Equipo de Investigación Política (EdIPo)
            </h4>
            <Button variant="outline-primary" >ir a la nota
            </Button>{' '}
          </div>
        </Carousel.Item >
        <Carousel.Item>
          <div class='notasItemContainer'>

            <h2 className='tituloNota'>el atentado a cfk y la guerra que ya llegó
            </h2>

            <button className='notaBotonCrisis'>ir a la nota</button>

          </div>

        </Carousel.Item>


      </Carousel>
    </div>
  );
}