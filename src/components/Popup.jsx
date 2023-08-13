
const Popup = ({coords, title, date, source}) => (
  <div className="popup" style={{ left: coords.lng, top: coords.lat }}>
    <div>
      <h3>{title}</h3>
      <p>Fecha: {date}</p>
      <p>Fuente: <a href={source} target="_blank" rel="noreferrer">{source}</a></p>
    </div>
  </div>
)

export default Popup;
