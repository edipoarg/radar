import { NavLink } from "react-router-dom";
import styles from "./DesktopNavbar.module.css";
import Navlinks from "../../../routes/index";
import { TiInfoLarge } from "react-icons/ti";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { LuFileSearch } from "react-icons/lu";
import ReactPopup from "reactjs-popup";
import { ReportPopupContent } from "../../ReportPopupContent/ReportPopupContent";
import LogotipoRadar from "./LogotipoRadar.svg?react";
import IsotipoRadar from "./IsotipoRadar.svg?react";

const iconsHeight = "9vh 1vh";

export default function DesktopNavbar() {
  return (
    <>
      <NavLink to={Navlinks.home}>
        <LogotipoRadar className={styles.floatingLogo} />
      </NavLink>
      <div className={styles.heading}>
        <NavLink to={Navlinks.queHacemos}>
          <TiInfoLarge size={iconsHeight} />
          ¿Qué hacemos?
        </NavLink>
        <NavLink to={Navlinks.investigaciones}>
          <LuFileSearch size={iconsHeight} />
          Investigaciones
        </NavLink>
        <NavLink to={Navlinks.novedades}>
          <HiOutlineBellAlert size={iconsHeight} />
          Novedades
        </NavLink>
        <NavLink
          title="Isotipo de Ra-dar"
          to={Navlinks.redRadar}
          className={`${styles.isotypeImg}`}
        >
          <IsotipoRadar />
          Red
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
