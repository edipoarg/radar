import { Outlet } from "react-router-dom";
import NavbarBootstrap from "../components/Navbar/Navbar";
import Marquee from "../components/Marquee/Marquee";

export default function Root() {
  return (
    <>
      <NavbarBootstrap /> {/* Navbar siempre se muestra */}
      <Marquee />
      <Outlet />
    </>
  );
}
