import { NavLink } from "react-router-dom";
import styles from "./MobileNavbar.module.css";
import Navlinks from "../../../routes/index";
import { IoMdPin } from "react-icons/io";
import { TiInfoLarge } from "react-icons/ti";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { LuFileSearch } from "react-icons/lu";
import LogotipoRadar from "./LogotipoRadar.svg?react";
import IsotipoRadar from "./IsotipoRadar.svg?react";

type Props = {
  heightInVh: number;
};

const iconsHeight = "9vh 1vh";

export default function MobileNavbar({ heightInVh }: Props) {
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
        <NavLink to={Navlinks.home}>
          <IoMdPin size={iconsHeight} />
        </NavLink>
        <NavLink to={Navlinks.quienesSomos}>
          <TiInfoLarge size={iconsHeight} />
        </NavLink>
        <NavLink to={Navlinks.investigaciones}>
          <LuFileSearch size={iconsHeight} />
        </NavLink>
        <NavLink to={Navlinks.novedades}>
          <HiOutlineBellAlert size={iconsHeight} />
        </NavLink>
        <NavLink
          title="Isotipo de Ra-dar"
          to={Navlinks.redRadar}
          className={`${styles.isotypeImg}`}
        >
          <IsotipoRadar />
        </NavLink>
      </div>
    </div>
  );
}
