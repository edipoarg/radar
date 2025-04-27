import { NavLink } from "react-router-dom";
import styles from "./DesktopNavbar.module.css";
import Navlinks from "../../../routes/index";
import { IoMdPin } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { LuFileSearch } from "react-icons/lu";
import LogotipoRadar from "./LogotipoRadar.svg?react";
import ReactPopup from "reactjs-popup";
import { ReportPopupContent } from "../../ReportPopupContent/ReportPopupContent";

const iconsHeight = "9vh 1vh";

export default function DesktopNavbar() {
  return (
    <>
      <LogotipoRadar className={styles.floatingLogo} />
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
      <ReactPopup
        modal
        trigger={
          <button type="button" className={styles.reportButton}>
            Reportá
          </button>
        }
        position="center center"
      >
        <ReportPopupContent />
      </ReactPopup>
    </>
  );
}
