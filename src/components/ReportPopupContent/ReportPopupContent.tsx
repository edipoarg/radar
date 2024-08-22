import { NavLink } from "react-router-dom";
import Navlinks from "../../routes";
import styles from "./ReportPopupContent.module.css";

type Props = {
  className?: string;
};

export const ReportPopupContent = ({ className }: Props) => {
  return (
    <article className={`${styles.popupBody} ${className ?? ""}`}>
      <p>Esta es una explicación de qué tipos de ataques hay o algo así</p>
      <p>Acá sigo explicando</p>
      <h4>Este es un call to action:</h4>
      <div>
        <NavLink
          to={Navlinks.reportaForm}
          target="_blank"
          rel="noopener noreferrer"
        >
          Reportá
        </NavLink>
        ------
        <NavLink to="link a doxxeos" target="_blank" rel="noopener noreferrer">
          Reportá un doxxeo
        </NavLink>
      </div>
    </article>
  );
};
