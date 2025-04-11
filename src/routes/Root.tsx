import { Outlet } from "react-router-dom";
import MobileNavbar from "../components/Navbar/MobileNavbar/MobileNavbar";
import { MOBILE_NAVBAR_CONSTANTS } from "../navbar-absolute-distance-constants";
import DesktopNavbar from "../components/Navbar/DesktopNavbar/DesktopNavbar";

export default function Root() {
  return (
    <>
      <MobileNavbar heightInVh={MOBILE_NAVBAR_CONSTANTS.NAVBAR_HEIGHT_IN_VH} />
      <DesktopNavbar />
      <Outlet />
    </>
  );
}
