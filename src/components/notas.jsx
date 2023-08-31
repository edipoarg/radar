import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './notas.css';
import { Carousel } from 'react-bootstrap';
import RadarMotion from './radarMotion';

export default function Notas() {
   return (
      
     <div id='notas'>
      
       <Carousel id='notasContainer'>
         <Carousel.Item>
           <h2 className='tituloNota'>Titulo del informe</h2>
           <h4 className='bajadaNota'>bajada de la nota</h4>
           {/* Rest of the content */}
         </Carousel.Item>
         <Carousel.Item>
         <h2 className='tituloNota'>Titulo del informe</h2>
           <h4 className='bajadaNota'>bajada de la nota</h4>
           </Carousel.Item>
        
           
       </Carousel>
     </div>
   );
 }