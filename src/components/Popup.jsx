
const Popup = ({coords, title, date, source, tipo}) => (
  <div className="popup" 
  //style={{ left: coords.lng, top: coords.lat }}
  >
    <div>
      <h3 id='displayTitulo'>{title}</h3>
{ /*     <p id='displayTipo'>{tipo}</p>   */}
      <p id='displayFecha'>Fecha: {date}</p>

      <a id='displayLink' href={source} target="_blank" rel="noreferrer">enlace</a>
    </div>
  </div>
)

export default Popup;
