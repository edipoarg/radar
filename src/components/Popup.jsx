import "./Popup.css"

const Popup = ({coords, title, date, source, tipo}) => (
  <div className="popup">
    <h3 className='displayTitulo'>{title}</h3>
    <p className='displayTipo'>{tipo.join(' ')}</p>

    <div className='masDatosPopup'> <p id='displayFecha'>Fecha: {date.toLocaleDateString()}</p>

      <a className='displayLink' href={source} target="_blank" rel="noreferrer">enlace</a>
    </div>
  </div>
)

export default Popup;
