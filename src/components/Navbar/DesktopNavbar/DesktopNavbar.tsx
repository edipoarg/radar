import { NavLink } from "react-router-dom";
import styles from "./DesktopNavbar.module.css";
import Navlinks from "../../../routes/index";
import { IoMdPin } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { LuFileSearch } from "react-icons/lu";

const iconsHeight = "9vh 1vh";

export default function DesktopNavbar() {
  return (
    <div className={styles.heading}>
      <NavLink to={Navlinks.home}>
        <IoMdPin size={iconsHeight} />
        Casos
      </NavLink>
      <NavLink to={Navlinks.quienesSomos}>
        <TiInfoLarge size={iconsHeight} />
        ¿Quiénes somos?
      </NavLink>
      <NavLink to={Navlinks.investigaciones}>
        <LuFileSearch size={iconsHeight} />
        Investigaciones
      </NavLink>
      <NavLink to={Navlinks.novedades}>
        <HiOutlineBellAlert size={iconsHeight} />
        Novedades
      </NavLink>
    </div>
  );
}
