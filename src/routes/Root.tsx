import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { NAVBAR_HEIGHT_IN_VH } from "../navbar-absolute-distance-constants";

export default function Root() {
  return (
    <>
      <Navbar heightInVh={NAVBAR_HEIGHT_IN_VH} />
      <Outlet />
    </>
  );
}
