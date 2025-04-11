import { NavLink, useLocation } from "react-router-dom";
import styles from "./MobileNavbar.module.css";
import Navlinks from "../../../routes/index";
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

type Props = {
  heightInVh: number;
};

const iconsHeight = "9vh 1vh";

export default function MobileNavbar({ heightInVh }: Props) {
  const { pathname } = useLocation();
  const isSelected = navlinkIsSelected(pathname);
  return (
    <div className={styles.heading} style={{ height: `${heightInVh}vh` }}>
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
          className={getSelectedClassname(isSelected(Navlinks.home))}
        >
          <IoMdPin size={iconsHeight} />
        </NavLink>
        <NavLink to={Navlinks.quienesSomos}>
          <TiInfoLarge size={iconsHeight} />
        </NavLink>
        <NavLink
          to={Navlinks.investigaciones}
          className={getSelectedClassname(isSelected(Navlinks.investigaciones))}
        >
          <LuFileSearch size={iconsHeight} />
        </NavLink>
        <NavLink to={Navlinks.novedades}>
          <HiOutlineBellAlert size={iconsHeight} />
        </NavLink>
        <NavLink
          title="Isotipo de Ra-dar"
          to={Navlinks.redRadar}
          className={`${getSelectedClassname(isSelected(Navlinks.redRadar))} ${styles.isotypeImg}`}
        >
          <IsotipoRadar />
        </NavLink>
      </div>
    </div>
  );
}
