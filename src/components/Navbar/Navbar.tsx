import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Navlinks from "../../routes/index";

export default function Navbar() {
  return (
    <div className={styles.heading}>
      <NavLink to={Navlinks.home}>
        <img
          className={styles.logoImg}
          src="LogotipoRadar.svg"
          alt="Logotipo de Ra-dar"
        />
      </NavLink>
      <div className={styles.pagesNavLinks}>
        <NavLink to={Navlinks.notas}>INVESTIGACIONES</NavLink>
        <NavLink to={Navlinks.conecta}>NOSOTRXS</NavLink>
      </div>
      <img className={styles.menuImg} src="menu.png" alt="Isotipo de Ra-dar" />
    </div>
  );
}
