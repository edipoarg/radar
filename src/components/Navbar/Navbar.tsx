import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import Navlinks from "../../routes/index";
import { IoMdPin } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { LuFileSearch } from "react-icons/lu";
import LogotipoRadar from "./LogotipoRadar.svg?react";
import IsotipoRadar from "./IsotipoRadar.svg?react";

const navlinkIsSelected =
  (pathname: string) =>
  (routeOfNavlink: (typeof Navlinks)[keyof typeof Navlinks]): boolean =>
    pathname == routeOfNavlink;

const getSelectedClassname = (isSelected: boolean) =>
  isSelected ? styles.selected : "";

export default function Navbar() {
  const { pathname } = useLocation();
  const isSelected = navlinkIsSelected(pathname);
  const iconsHeight = "9vh 1vh";
  return (
    <div className={styles.heading}>
      <NavLink
        to={Navlinks.home}
        title="Logotipo de Ra-dar"
        className={styles.logoImg}
      >
        <LogotipoRadar />
      </NavLink>
      <div className={styles.pagesNavLinks}>
        <NavLink
          to={Navlinks.home}
          title="Logotipo de Ra-dar"
          className={getSelectedClassname(isSelected(Navlinks.home))}
        >
          <IoMdPin size={iconsHeight} />
        </NavLink>
        <NavLink
          to={Navlinks.notas}
          className={getSelectedClassname(isSelected(Navlinks.notas))}
        >
          <LuFileSearch size={iconsHeight} />
        </NavLink>
        <NavLink to="TODO">
          <HiOutlineBellAlert size={iconsHeight} />
        </NavLink>
        <NavLink to="TODO">
          <TiInfoLarge size={iconsHeight} />
        </NavLink>
        <NavLink
          to={Navlinks.conecta}
          className={`${getSelectedClassname(isSelected(Navlinks.conecta))} ${styles.isotypeImg}`}
        >
          <IsotipoRadar />
        </NavLink>
      </div>
    </div>
  );
}
