
const Popup = ({coords, title, date, source}) => (
  <div className="popup" 
  //style={{ left: coords.lng, top: coords.lat }}
  >
    <div>
      <h3>{title}</h3>
      <p>Fecha: {date}</p>
      <a href={source} target="_blank" rel="noreferrer">enlace</a>
    </div>
  </div>
)

export default Popup;
