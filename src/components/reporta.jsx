import React from 'react';
import './reporta.css'


export default function reportaForm(){

function Submit(e){
  const formEle = document.querySelector("#formSheet")
  e.preventDefault
  console.log("submitted")
  const formData = new FormData(formEle)
fetch("https://script.google.com/macros/s/AKfycbySxucaKUPO4gM1WPoknylJuhqL4ElNwvgyDUfzVypgXlTX3u3CtrdBAuwSpB2DQ2O8/exec", {method: "POST", body: formData})
}


return(

 
    <div id="reportaForm">
      

      <div id="form">

        <div id='formHeader'>
        <h1 id='tituloForm'>Relevamiento nacional de ataques de derechas radicalizadas
</h1>
        <h4 id='bajadaForm'>*este reporte no implica la realización de ningún tipo de denuncia institucional sino un aporte a un relevamiento colaborativo con fines periodísticos. 
        <br /> **no publicaremos ninguna información sin tu autorización </h4>
        </div>

        <form id='formSheet' onSubmit={(e)=>Submit(e)}>
          <div className='formInputContainer'>
            <label htmlFor="email">

            <h3 className='formQuestion'>Email</h3>

            </label>

            
            <input className="formInput" type="email" name="Mail" id="mail" required placeholder="Escribe tu email" />
          </div>
          <br />

          <div className='formInputContainer'>
           <label  htmlFor="titulo">
              <h3 className='formQuestion'>¿Qué pasó?</h3>
              <p className='bajadaQuestion'>una descripción lo más detallada del hecho</p>
           </label>
            <input
className="formInput" 
              type="text"
              name="Titulo"
              id="titulo"
              required
              placeholder="Escribe tu respuesta"
              maxLength="30"
            />
          </div>
          <br />
          <div className='formInputContainer'>
            <label htmlFor="fecha">
              <h3 className='formQuestion'>¿Cuándo pasó?</h3>
              <p className='bajadaQuestion'>si no es posible indicar fecha exacta, incorporar una referencia de tiempo en la descripción del hecho</p>
            </label>
            <input 
             className="formInput" type="date" name="fechaHecho" id="fecha" required />
          </div>
<br />
<div className='formInputContainer'>
  <label htmlFor="lugar">
    <h3 className='formQuestion'>¿Dónde pasó?</h3>
    <p className='bajadaQuestion'>Si es posible, insertar enlace de googlemaps o referencia geográfica</p>
  </label>
  <input  className="formInput"  type="text" name="Lugar" id="lugar" placeholder="Escribe aquí" />
</div>
<br />
<div className='formInputContainer'>
  <label htmlFor="agresor">
    <h3 className='formQuestion'>¿qué sabes sobre la(s) persona(s) agresora(s)?
</h3>
  </label>
  <input
    className="formInput" 
     type="text"
    name="Agresor"
    id="agresor"
    placeholder="Escribe aquí"
    required
  />
</div>
<br />

<div className='formInputContainer'>
  <label htmlFor="intervencion">
    <h3 className='formQuestion'>¿hubo intervención policial? ¿alguna respuesta estatal o judicial? ¿cuál? 
</h3>
  </label>
  <input
   className="formInput" 
    type="text"
    name="Intervencion"
    id="intervencion"
    placeholder="Escribe aquí"
  />
</div>
<br />

<div className='formInputContainer'>
  <label htmlFor="archivos">
    <h3 className='formQuestion'>Archivos relacionados</h3>
    <p className='bajadaQuestion'>Fotos, videos o documentos relativos al hecho.</p>
  </label>
  <br />
  <input  className="formInput"  type="file" name="Archivos" id="archivos" multiple />
</div>
<br />

<div className='formInputContainer'>
  <label htmlFor="comentarios">
    <h3 className='formQuestion'>Comentarios adicionales
</h3>
  </label>
  <input
   className="formInput" 
    type="text"
    name="Comentarios"
    id="observaciones"
    placeholder="Escribe aquí"
  />
</div>

<br />
<div>
  <input type="submit" value="ENVIAR" />
</div>

        </form>
      </div>
    </div>
);
}

