import React from 'react';
import './conecta.css'
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useEffect } from 'react';







export default function reportaForm() {

    useEffect(() => {
        window.scrollTo(0, 0); // Desplázate automáticamente hacia arriba cuando se carga la página
      }, []);

    return (


        <><div id="conecta">

<div id='radarDeco'><img id='radarDecoImg' src="imgRadar.png" alt="" /></div>               
            <div id='contectaTituloContainter'>
            <div><img id='logoImgNos' src="logoRadar.png" alt="" /></div>

             
                <h1 id='conectaTitulo'>Registro de Ataques de Derechas Argentinas Radicalizadas</h1>

            </div>
            <div id='contectaTextContainter'>
                <h6 id='conectaTextRadar'>RADAR es un proyecto periodístico colaborativo impulsado por el Equipo de Investigación Política (EdIPo) de la Revista Crisis con apoyo del Centro de Estudios Legales y Sociales (CELS) con el objetivo de fortalecer la democracia y la defensa de los derechos humanos.
                    Presentamos un mapeo colaborativo de hechos de violencia política protagonizados por derechas radicalizadas con el fin de contribuir al diagnóstico colectivo y la elaboración de estrategias de autocuidado. 
                </h6>

            </div>








        </div>
        
        <div id='conecta2'>

            <h6 id='textConecta2'>Dentro del amplio espectro que componen las derechas llamamos radicalizadas a los sectores que apelan directa o indirectamente a la violencia como método de intervención política. Entendemos por ataques de derecha radicalizada aquellas acciones que expresan un deseo de aniquilación del otro con el objeto de silenciar, amedrentar, disciplinar o eliminar identidades políticas como forma de influir en la discusión pública e inhibir su participación.

Por el momento solo incluimos en la plataforma aquellos casos geolocalizables que den cuenta de un movimiento más allá del odio agitado en redes, caldo de cultivo necesario del pasaje a la acción. No se trata de desestimar el ecosistema violento que allana el terreno, sino de poner el foco en los actos concretos que hacen carne el discurso disponible.
            <br />
<br />
 </h6>

            <h6 id='siTeInteresa'>si querés comunicarte con nosotrxs podés escribirnos a
            
            <br />
            <br />
             <a href="mailto:radar.edipo@gmail.com">radar.edipo@gmail.com</a></h6>
            
            
        </div></>


        
    
        
    );
}

